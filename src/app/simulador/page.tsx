'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  isSimulatorUnlocked,
  getUnlockMessage,
  getCompletedModulesCount,
} from '@/lib/interview-simulator-utils';
import {
  INTERVIEW_DURATIONS,
  COMPANIES,
  getProblemsByCompany,
  type InterviewType,
  type Company,
  type Difficulty,
} from '@/lib/interview-simulator';

export default function SimuladorHome() {
  const [mounted, setMounted] = useState(false);
  const [interviewType, setInterviewType] = useState<InterviewType>('junior');
  const [company, setCompany] = useState<Company>('naranja-x');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  useEffect(() => setMounted(true), []);

  const unlocked = mounted && isSimulatorUnlocked();
  const completedCount = mounted ? getCompletedModulesCount() : 0;

  const buildStartUrl = () => {
    const params = new URLSearchParams({
      type: interviewType,
      company,
      difficulty,
    });
    return `/simulador/entrevista?${params}`;
  };

  if (!mounted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-6">
        <div className="animate-pulse text-[var(--text-2)]">Cargando…</div>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-6 max-w-xl mx-auto text-center">
        <div className="mb-6">
          <span className="material-icons text-5xl text-[var(--accent)]">gps_fixed</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Simulador de Entrevista</h1>
        <p className="text-[var(--text-2)] leading-relaxed mb-6">{getUnlockMessage()}</p>
        <p className="text-sm text-[var(--text-2)]">
          Módulos completados: {completedCount} / 4
        </p>
        <Link
          href="/"
          className="mt-8 text-[var(--accent)] hover:underline text-sm font-medium"
        >
          <span className="material-icons text-sm mr-1">arrow_back</span>
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-6">
      <div className="max-w-lg w-full space-y-8 animate-in fade-in duration-500">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
            <span className="material-icons text-3xl text-[var(--accent)]">gps_fixed</span>
            Simulador de Entrevista
          </h1>
          <p className="text-[var(--text-2)] text-sm leading-relaxed">
            Replicá las condiciones reales de una entrevista técnica en empresas como Naranja X, Globant y Mercado Libre.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-[var(--text-2)]">ELEGÍ EL TIPO DE ENTREVISTA</label>
          <div className="flex gap-3">
            <button
              onClick={() => setInterviewType('junior')}
              className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                interviewType === 'junior'
                  ? 'bg-[var(--accent-dim)] border-[var(--accent-border)] text-[var(--text)]'
                  : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--accent-border)]'
              }`}
            >
              Junior — {INTERVIEW_DURATIONS.junior} min
            </button>
            <button
              onClick={() => setInterviewType('semi-senior')}
              className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                interviewType === 'semi-senior'
                  ? 'bg-[var(--accent-dim)] border-[var(--accent-border)] text-[var(--text)]'
                  : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--accent-border)]'
              }`}
            >
              Semi Senior — {INTERVIEW_DURATIONS['semi-senior']} min
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-[var(--text-2)]">ELEGÍ LA EMPRESA</label>
          <div className="grid grid-cols-2 gap-2">
            {COMPANIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCompany(c.id)}
                className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                  company === c.id
                    ? 'bg-[var(--accent-dim)] border-[var(--accent-border)] text-[var(--text)]'
                    : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--accent-border)]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-[var(--text-2)]">ELEGÍ LA DIFICULTAD</label>
          <div className="flex gap-2">
            {(['easy', 'medium', 'mixed'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors capitalize ${
                  difficulty === d
                    ? 'bg-[var(--accent-dim)] border-[var(--accent-border)] text-[var(--text)]'
                    : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--accent-border)]'
                }`}
              >
                {d === 'mixed' ? 'Mixed' : d}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <p className="font-semibold mb-2 text-[var(--text)] flex items-center gap-2">
            <span className="material-icons text-lg">warning</span>
            Reglas:
          </p>
          <ul className="space-y-1 text-[var(--text-2)]">
            <li>• Sin pistas durante la entrevista</li>
            <li>• Sin ver soluciones de otros problemas</li>
            <li>• El timer no se puede pausar</li>
            <li>• Podés rendirte, pero queda registrado</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={buildStartUrl()}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)] text-[#0F0F0F] font-semibold transition-colors"
          >
            <span className="material-icons text-lg">gps_fixed</span>
            Comenzar Entrevista
          </Link>
          <Link
            href="/simulador/historial"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] text-[var(--text)] font-medium transition-colors"
          >
            <span className="material-icons text-lg">bar_chart</span>
            Ver historial
          </Link>
        </div>
      </div>
    </main>
  );
}
