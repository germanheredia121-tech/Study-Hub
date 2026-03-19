'use client';

import { useCallback, useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import {
  getRandomProblem,
  runInterviewTests,
  INTERVIEW_DURATIONS,
  COMPANIES,
  type InterviewProblem,
  type InterviewType,
} from '@/lib/interview-simulator';
import { saveInterviewRecord } from '@/lib/interview-simulator-utils';
import { isSimulatorUnlocked } from '@/lib/interview-simulator-utils';

function EntrevistaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get('type') as InterviewType) || 'junior';
  const company = searchParams.get('company') || 'naranja-x';
  const difficulty = searchParams.get('difficulty') || 'medium';

  const [problem, setProblem] = useState<InterviewProblem | null>(null);
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [testResult, setTestResult] = useState<{ passed: number; total: number } | null>(null);
  const [surrendered, setSurrendered] = useState(false);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const codeRef = useRef(code);
  const problemRef = useRef(problem);
  codeRef.current = code;
  problemRef.current = problem;

  const durationSec = INTERVIEW_DURATIONS[type as InterviewType] * 60;

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const finishInterview = useCallback(
    (surrenderedByUser: boolean) => {
      stopTimer();
      const p = problemRef.current;
      const c = codeRef.current;
      if (!p) return;
      const timeUsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      const basic = runInterviewTests(c, p, true);
      const full = runInterviewTests(c, p, false);
      const record = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        company: COMPANIES.find((co) => co.id === company)?.name ?? company,
        difficulty,
        problemTitle: p.title,
        problemId: p.id,
        durationMinutes: INTERVIEW_DURATIONS[type as InterviewType],
        timeUsedSeconds: timeUsed,
        surrendered: surrenderedByUser,
        basicTestsPassed: basic.passed,
        basicTestsTotal: basic.total,
        hiddenTestsPassed: full.passed - basic.passed,
        hiddenTestsTotal: full.total - basic.total,
        userCode: c,
        suggestedModule: p.suggestedModule,
      };
      saveInterviewRecord(record);
      sessionStorage.setItem('interview-result', JSON.stringify({ record, problem: p, full }));
      router.push('/simulador/resultado');
    },
    [company, difficulty, type, stopTimer, router]
  );

  useEffect(() => {
    if (!isSimulatorUnlocked()) {
      router.replace('/simulador');
      return;
    }
    const p = getRandomProblem(company as 'naranja-x' | 'globant' | 'mercadolibre' | 'generica', difficulty as 'easy' | 'medium' | 'hard' | 'mixed');
    if (!p) {
      router.replace('/simulador');
      return;
    }
    setProblem(p);
    setCode(p.initialCode ?? `function ${p.functionName}(input) {\n  // tu código acá\n  return null;\n}`);
    setTimeLeft(durationSec);
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          finishInterview(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => stopTimer();
  }, [company, difficulty, durationSec]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTest = () => {
    if (!problem) return;
    const r = runInterviewTests(code, problem, true);
    setTestResult({ passed: r.passed, total: r.total });
  };

  const handleSubmit = () => finishInterview(false);
  const handleSurrender = () => {
    setSurrendered(true);
    finishInterview(true);
  };

  if (!problem) {
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <div className="animate-pulse text-[#666]">Cargando problema…</div>
      </main>
    );
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = ((durationSec - timeLeft) / durationSec) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      <div className="grid grid-cols-1 lg:grid-cols-5 flex-1 min-h-0">
        {/* COLUMNA IZQUIERDA — Problema */}
        <div className="lg:col-span-2 flex flex-col border-r border-[var(--border)] overflow-hidden">
          <div className="p-4 border-b border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-[var(--accent)] flex items-center gap-1">
                <span className="material-icons text-sm">timer</span>
                {mins}:{secs.toString().padStart(2, '0')} restantes
              </span>
            </div>
            <div className="h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">PROBLEMA</h2>
            <h3 className="text-base font-medium text-[var(--text)]">{problem.title}</h3>
            <p className="text-sm text-[var(--text-2)] leading-relaxed whitespace-pre-wrap">{problem.description}</p>
            <div className="space-y-2">
              <p className="text-xs font-mono text-[var(--text-2)]">Ejemplos:</p>
              {problem.examples.map((ex, i) => (
                <div key={i} className="text-sm text-[var(--text-2)]">
                  <span className="text-[var(--text-3)]">Input: </span>{ex.input}
                  <br />
                  <span className="text-[var(--text-3)]">Output: </span>{ex.output}
                </div>
              ))}
            </div>
            {problem.constraints.length > 0 && (
              <div>
                <p className="text-xs font-mono text-[var(--text-2)] mb-1">Constraints:</p>
                <ul className="text-sm text-[var(--text-2)] list-disc list-inside">
                  {problem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-[var(--border)]">
            <button
              onClick={handleSurrender}
              disabled={surrendered}
              className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span className="material-icons text-sm mr-1">flag</span>
              Rendirse
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA — Editor */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <div className="flex-1 min-h-[200px]">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(v) => setCode(v ?? '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                suggest: { showKeywords: false, showSnippets: false },
              }}
            />
          </div>
          <div className="p-4 border-t border-[var(--border)] flex items-center justify-between gap-4">
            <div>
              {testResult !== null && (
                <span className={`text-sm font-mono inline-flex items-center gap-1 ${testResult.passed === testResult.total ? 'text-emerald-400' : 'text-red-400'}`}>
                  {testResult.passed === testResult.total ? (
                    <span className="material-icons text-sm">check_circle</span>
                  ) : (
                    <span className="material-icons text-sm">cancel</span>
                  )}
                  {testResult.passed}/{testResult.total} ejemplos pasan
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTest}
                className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] text-[var(--text)] text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                <span className="material-icons text-sm mr-1">play_arrow</span>
                Testear
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)] text-sm font-semibold transition-colors inline-flex items-center gap-1"
              >
                <span className="material-icons text-sm mr-1">check_circle</span>
                Entregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EntrevistaPage() {
  return (
    <Suspense fallback={
      <main className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <div className="animate-pulse text-[#666]">Cargando…</div>
      </main>
    }>
      <EntrevistaContent />
    </Suspense>
  );
}
