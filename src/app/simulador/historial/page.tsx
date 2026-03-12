'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getInterviewHistory,
  getHistoryStats,
  type InterviewRecord,
} from '@/lib/interview-simulator-utils';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function HistorialPage() {
  const [history, setHistory] = useState<InterviewRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, successRate: 0, avgTimeUsed: 0, avgDuration: 0 });

  useEffect(() => {
    setHistory(getInterviewHistory());
    setStats(getHistoryStats());
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6 pb-20 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="material-icons text-2xl text-[var(--accent)]">bar_chart</span>
        Tu historial
      </h1>

      {stats.total > 0 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 mb-8 space-y-2">
          <p><span className="text-[var(--text-2)]">Entrevistas completadas:</span> {stats.total}</p>
          <p><span className="text-[var(--text-2)]">Tasa de éxito (todos tests):</span> {stats.successRate}%</p>
          <p>
            <span className="text-[var(--text-2)]">Tiempo promedio:</span>{' '}
            {formatTime(stats.avgTimeUsed)} / {formatTime(stats.avgDuration)}
          </p>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4">Últimas entrevistas</h2>

      {history.length === 0 ? (
        <p className="text-[var(--text-2)] mb-6">Aún no completaste ninguna entrevista simulada.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-[var(--text)]">
                    {formatDate(r.date)} · {r.company} · {r.difficulty}
                  </p>
                  <p className="text-sm text-[var(--text-2)] mt-1">
                    {r.problemTitle} · {formatTime(r.timeUsedSeconds)} · {r.basicTestsPassed + r.hiddenTestsPassed}/{r.basicTestsTotal + r.hiddenTestsTotal} tests
                  </p>
                </div>
                <span
                  className={`text-xs font-medium shrink-0 inline-flex items-center gap-1 ${
                    r.basicTestsPassed === r.basicTestsTotal && r.hiddenTestsPassed === r.hiddenTestsTotal
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {r.basicTestsPassed === r.basicTestsTotal && r.hiddenTestsPassed === r.hiddenTestsTotal ? (
                    <>
                      <span className="material-icons text-sm">check_circle</span>
                      Completado
                    </>
                  ) : (
                    <>
                      <span className="material-icons text-sm">warning</span>
                      Parcial
                    </>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <Link
          href="/simulador"
          className="text-[var(--accent)] hover:underline text-sm font-medium inline-flex items-center gap-1"
        >
          <span className="material-icons text-sm mr-1">arrow_back</span>
          Volver al simulador
        </Link>
      </div>
    </main>
  );
}
