'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { InterviewProblem } from '@/lib/interview-simulator';
import type { InterviewRecord } from '@/lib/interview-simulator-utils';

interface StoredResult {
  record: InterviewRecord;
  problem: InterviewProblem;
  full: { passed: number; total: number };
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ResultadoPage() {
  const [data, setData] = useState<StoredResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('interview-result');
    if (raw) {
      try {
        setData(JSON.parse(raw));
        sessionStorage.removeItem('interview-result');
      } catch {
        // ignore
      }
    }
  }, []);

  if (!data) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-6">
        <p className="text-[var(--text-2)] mb-4">No hay resultado de entrevista reciente.</p>
        <Link href="/simulador" className="text-[var(--accent)] hover:underline">
          Volver al simulador
        </Link>
      </main>
    );
  }

  const { record, problem, full } = data;
  const basicOk = record.basicTestsPassed === record.basicTestsTotal;
  const hiddenOk = record.hiddenTestsPassed === record.hiddenTestsTotal;
  const allOk = basicOk && hiddenOk;

  return (
    <main className="max-w-3xl mx-auto p-6 pb-20 space-y-8 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold">Resultado de tu entrevista simulada</h1>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2">
        <p><span className="text-[var(--text-2)]">Problema:</span> {record.problemTitle}</p>
        <p><span className="text-[var(--text-2)]">Tiempo usado:</span> {formatTime(record.timeUsedSeconds)} / {record.durationMinutes}:00</p>
        <p>
          <span className="text-[var(--text-2)]">Tests básicos:</span>{' '}
          <span className={basicOk ? 'text-[#06d6a0]' : 'text-[#f96b6b]'}>
            {basicOk ? <span className="material-icons text-sm align-middle mr-0.5">check_circle</span> : <span className="material-icons text-sm align-middle mr-0.5">cancel</span>} {record.basicTestsPassed}/{record.basicTestsTotal}
          </span>
        </p>
        <p>
          <span className="text-[var(--text-2)]">Tests ocultos:</span>{' '}
          <span className={hiddenOk ? 'text-[#06d6a0]' : 'text-[#f96b6b]'}>
            {hiddenOk ? <span className="material-icons text-sm align-middle mr-0.5">check_circle</span> : <span className="material-icons text-sm align-middle mr-0.5">cancel</span>} {record.hiddenTestsPassed}/{record.hiddenTestsTotal}
          </span>
        </p>
        {record.surrendered && (
          <p className="text-amber-400 text-sm flex items-center gap-2">
            <span className="material-icons text-base">warning</span>
            Te rendiste durante la entrevista.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">TU SOLUCIÓN</h2>
        <pre className="p-4 rounded-lg bg-[#1E1E1E] border border-[var(--border)] text-sm overflow-x-auto whitespace-pre-wrap font-mono text-[#ccc]">
          {record.userCode}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">SOLUCIÓN ÓPTIMA</h2>
        <pre className="p-4 rounded-lg bg-[#1E1E1E] border border-[var(--border)] text-sm overflow-x-auto whitespace-pre-wrap font-mono text-[#ccc]">
          {problem.optimalSolution}
        </pre>
        <p className="text-sm text-[var(--text-2)]">Complejidad: {problem.optimalComplexity}</p>
      </div>

      {problem.feedbackPoints.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">¿QUÉ HUBIERA DICHO EL ENTREVISTADOR?</h2>
          <ul className="space-y-2">
            {problem.feedbackPoints.map((fp, i) => (
              <li
                key={i}
                className={`text-sm ${
                  fp.type === 'positive' ? 'text-[#06d6a0]' : fp.type === 'warning' ? 'text-amber-400' : 'text-[#f96b6b]'
                }`}
              >
                {fp.type === 'positive' ? <span className="material-icons text-sm align-middle mr-1">check_circle</span> : fp.type === 'warning' ? <span className="material-icons text-sm align-middle mr-1">warning</span> : <span className="material-icons text-sm align-middle mr-1">cancel</span>} {fp.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {problem.suggestedModule && (
        <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4">
          <h3 className="font-semibold text-[var(--accent)] mb-2">PRÓXIMO PASO SUGERIDO</h3>
          <p className="text-sm text-[var(--text-2)]">
            Antes de tu próxima entrevista, repasá: → Módulo {problem.suggestedModule} (el patrón que hubiera bajado esto a la complejidad óptima)
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-4">
        <Link
          href="/simulador"
          className="px-6 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)] font-medium transition-colors inline-flex items-center gap-2"
        >
          <span className="material-icons">refresh</span>
          Otra entrevista
        </Link>
        <Link
          href="/simulador/historial"
          className="px-6 py-3 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] text-[var(--text)] font-medium transition-colors inline-flex items-center gap-2"
        >
          <span className="material-icons">bar_chart</span>
          Ver historial
        </Link>
      </div>
    </main>
  );
}
