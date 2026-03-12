'use client';

import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import {
  InteractiveExercise as ExerciseType,
  runExerciseTests,
  saveExerciseCompleted,
  getCompletedExercises,
} from '@/lib/interactive-exercises';

interface InteractiveExerciseProps {
  exercise: ExerciseType;
  moduleId: string;
  onComplete?: () => void;
}

export default function InteractiveExercise({
  exercise,
  moduleId,
  onComplete,
}: InteractiveExerciseProps) {
  const [code, setCode] = useState(exercise.initialCode);
  const [hintOpen, setHintOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{
    passed: number;
    total: number;
    results: { description: string; passed: boolean; expected?: unknown; got?: unknown; error?: string }[];
  } | null>(null);
  const [completed, setCompleted] = useState(() =>
    getCompletedExercises(moduleId).includes(exercise.id)
  );

  const handleRun = useCallback(async () => {
    setRunning(true);
    setResults(null);
    try {
      const r = await runExerciseTests(code, exercise);
      setResults(r);
      if (r.passed === r.total) {
        saveExerciseCompleted(moduleId, exercise.id);
        setCompleted(true);
        window.dispatchEvent(new CustomEvent('interactive_exercises_updated'));
        onComplete?.();
      }
    } finally {
      setRunning(false);
    }
  }, [code, exercise, moduleId, onComplete]);

  const formatValue = (v: unknown): string => {
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    if (typeof v === 'object') return JSON.stringify(v, null, 2);
    return String(v);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#16161d] overflow-hidden my-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-[320px]">
        {/* PANEL IZQUIERDO — Consigna */}
        <div className="p-4 lg:p-5 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] mb-2">
            ✏️ TU TURNO
          </div>
          <h3 className="font-semibold text-[#0F0F0F] text-base mb-2">{exercise.title}</h3>
          <p className="text-[#9898b0] text-sm leading-relaxed mb-4">{exercise.description}</p>
          <div className="text-xs text-[#5c5c78] space-y-1 mb-4">
            <div>
              <span className="text-[#888]">Ejemplo:</span>
              <div className="mt-1 font-mono text-[#c3e88d]">
                Input: <span className="text-[#e8e8f0]">{exercise.exampleInput}</span>
              </div>
              <div className="font-mono text-[#c3e88d]">
                Output: <span className="text-[#e8e8f0]">{exercise.exampleOutput}</span>
              </div>
            </div>
          </div>
          <details
            className="mt-auto"
            open={hintOpen}
            onToggle={(e) => setHintOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary className="cursor-pointer text-sm text-[#f7c06a] hover:text-[#f7c06a]/90">
              💡 Pista
            </summary>
            <p className="mt-2 text-xs text-[#9898b0] leading-relaxed">{exercise.hint}</p>
          </details>
        </div>

        {/* PANEL CENTRAL — Monaco Editor */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex-1 min-h-[200px]">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(v) => setCode(v ?? '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                padding: { top: 12 },
              }}
            />
          </div>
          <div className="p-3 border-t border-white/10 flex justify-end">
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent)] disabled:opacity-50 text-[#0F0F0F] font-medium px-4 py-2 rounded-md text-sm transition-colors"
            >
              {running ? (
                <>Ejecutando…</>
              ) : (
                <>
                  <span>▶</span> Ejecutar
                </>
              )}
            </button>
          </div>
        </div>

        {/* PANEL DERECHO — Resultados */}
        <div className="p-4 lg:p-5 flex flex-col min-h-[180px]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#5c5c78] mb-3">
            Tests
          </div>
          {!results ? (
            <p className="text-[#5c5c78] text-sm">Ejecutá el código para ver los resultados.</p>
          ) : (
            <div className="space-y-2 flex-1">
              {results.results.map((r, i) => (
                <div key={i} className="text-sm">
                  {r.passed ? (
                    <span className="text-emerald-400 inline-flex items-center gap-1"><span className="material-icons text-sm">check_circle</span> {r.description}</span>
                  ) : (
                    <div>
                      <span className="text-red-400 inline-flex items-center gap-1"><span className="material-icons text-sm">cancel</span> {r.description}</span>
                      {r.expected !== undefined && (
                        <div className="mt-1 text-xs text-[#9898b0]">
                          Expected: <code className="text-[#c3e88d]">{formatValue(r.expected)}</code>
                        </div>
                      )}
                      {r.got !== undefined && (
                        <div className="text-xs text-[#9898b0]">
                          Got: <code className="text-[#f96b6b]">{formatValue(r.got)}</code>
                        </div>
                      )}
                      {r.error && (
                        <div className="text-xs text-[#f96b6b] mt-1">{r.error}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 mt-3 border-t border-white/10 text-sm">
                {results.passed}/{results.total} tests pasando
              </div>
              {results.passed === results.total && (
                <div className="mt-3 p-3 rounded-lg bg-[#06d6a0]/10 border border-[#06d6a0]/30">
                  <p className="text-emerald-400 font-medium inline-flex items-center gap-2"><span className="material-icons text-sm">check_circle</span> {exercise.successMessage}</p>
                  <p className="text-xs text-[#9898b0] mt-1">{exercise.complexityNote}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
