'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { DSA_MODULES, FLUTTER_MODULES, FS_MODULES } from '@/lib/data';
import { getProgress } from '@/lib/utils';
import { isSimulatorUnlocked } from '@/lib/interview-simulator-utils';
import { getTotalModulesCount, getCompletedModulesCount } from '@/lib/dashboard-utils';

type TrackFilter = 'all' | 'dsa' | 'flutter' | 'fullstack';

export default function CatalogPage() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<TrackFilter>('all');
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const totalModules = getTotalModulesCount();
  const completedCount = mounted ? getCompletedModulesCount() : 0;
  const progressPct = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;
  const simulatorUnlocked = mounted && isSimulatorUnlocked();

  const tracks = [
    { id: 'dsa', name: 'DSA & LeetCode', modules: DSA_MODULES, slug: 'dsa', badge: 'DSA', badgeColor: 'bg-green-500/20 text-green-400' },
    { id: 'flutter', name: 'Flutter Expert', modules: FLUTTER_MODULES, slug: 'flutter', badge: 'FL', badgeColor: 'bg-violet-500/20 text-violet-400' },
    { id: 'fullstack', name: 'Full Stack Web', modules: FS_MODULES, slug: 'fullstack', badge: 'FS', badgeColor: 'bg-blue-500/20 text-blue-400' },
  ];

  const filteredTracks = filter === 'all' ? tracks : tracks.filter((t) => t.id === filter);

  const getModuleStatus = (trackId: string, moduleIndex: number) => {
    if (!mounted) return 'locked';
    const path = trackId as 'dsa' | 'flutter' | 'fullstack';
    const modules = trackId === 'dsa' ? DSA_MODULES : trackId === 'flutter' ? FLUTTER_MODULES : FS_MODULES;
    const progress = getProgress(path);
    const mod = modules[moduleIndex];
    if (!mod) return 'locked';
    const completed = !!progress[mod.id];
    if (completed) return 'completed';
    if (moduleIndex === 0) return 'in_progress';
    const prevCompleted = !!progress[modules[moduleIndex - 1]?.id];
    return prevCompleted ? 'in_progress' : 'locked';
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar activeLink="tracks" />

      <main className="pt-24 pb-20 max-w-6xl mx-auto px-4 md:px-6">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Tracks de estudio</h1>
          <p className="text-[var(--text-2)] text-lg">
            3 rutas de aprendizaje estructuradas para conseguir tu primer empleo en tech
          </p>
          {mounted && (
            <div className="mt-6">
              <p className="text-sm text-[var(--text-2)] mb-2">
                Tu progreso general: {completedCount} de {totalModules} módulos completados
              </p>
              <div className="h-2 bg-[var(--accent-dim)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {(['all', 'dsa', 'flutter', 'fullstack'] as TrackFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[var(--accent)] text-[#0F0F0F]'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'dsa' ? 'DSA & LeetCode' : f === 'flutter' ? 'Flutter' : 'Full Stack Web'}
            </button>
          ))}
        </div>

        {/* Track cards */}
        <div className="space-y-6">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:shadow-lg hover:border-[var(--accent-border)] transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full ${track.badgeColor} text-xs font-bold mb-2`}>
                    {track.badge}
                  </span>
                  <h2 className="text-xl font-bold text-[var(--text)]">{track.name}</h2>
                  <p className="text-[var(--text-2)] text-sm mt-1">
                    {track.modules.length} módulos
                  </p>
                </div>
                <Link
                  href={`/${track.slug}/${track.modules[0]?.slug ?? ''}`}
                  className="shrink-0 px-4 py-2 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] font-medium hover:bg-[var(--accent)] hover:text-[#0F0F0F] transition-all"
                >
                  Comenzar
                  <span className="material-icons text-sm ml-1">arrow_forward</span>
                </Link>
              </div>

              <button
                onClick={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
                className="mt-4 text-sm text-[var(--text-2)] hover:text-[var(--text)] flex items-center gap-1"
              >
                Ver módulos {expandedTrack === track.id ? '↑' : '↓'}
              </button>

              {expandedTrack === track.id && (
                <ul className="mt-4 space-y-2 border-t border-[var(--border)] pt-4">
                  {track.modules.map((mod, idx) => {
                    const status = getModuleStatus(track.id, idx);
                    const progress = mounted ? getProgress(track.id as 'dsa' | 'flutter' | 'fullstack') : {};
                    const completed = !!progress[mod.id];
                    const content = (
                      <div className="flex items-center justify-between p-3 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-[var(--text-3)]">
                            MÓDULO {String(idx + 1).padStart(2, '0')}
                          </span>
                          {status === 'completed' && (
                            <span className="text-xs font-bold text-green-400 inline-flex items-center gap-1"><span className="material-icons text-xs">check_circle</span> COMPLETADO</span>
                          )}
                          {status === 'in_progress' && (
                            <span className="text-xs font-medium text-[var(--accent)] inline-flex items-center gap-1"><span className="material-icons text-xs">arrow_forward</span> EN PROGRESO</span>
                          )}
                          {status === 'locked' && (
                            <span className="text-xs text-[var(--text-3)] inline-flex items-center gap-1"><span className="material-icons text-xs">lock</span> BLOQUEADO</span>
                          )}
                          <span className="text-[var(--text)]">{mod.title}</span>
                        </div>
                        {status === 'in_progress' && !completed && (
                          <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--accent)] w-[60%]" />
                          </div>
                        )}
                      </div>
                    );
                    return (
                      <li key={mod.id}>
                        {status !== 'locked' ? (
                          <Link href={`/${track.slug}/${mod.slug}`} className="block hover:bg-[var(--surface)] rounded-lg" title={undefined}>
                            {content}
                          </Link>
                        ) : (
                          <div className="opacity-50 cursor-not-allowed rounded-lg" title="Completá el módulo anterior con 100%">
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Simulador card */}
        <div className="mt-12 p-6 rounded-2xl border-2 border-[var(--accent-border)] bg-[var(--accent-dim)]">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-2">
            <span className="material-icons text-sm">gps_fixed</span>
            NUEVO
          </span>
          <h3 className="text-xl font-bold text-[var(--text)] mb-2">Simulador de Entrevista Técnica</h3>
          <p className="text-[var(--text-2)] text-sm mb-2">
            Practicá con problemas reales de Naranja X, Globant y Mercado Libre. Timer, sin pistas, feedback real.
          </p>
          <p className="text-xs text-[var(--text-3)] mb-4">
            Se desbloquea completando 4 módulos de cualquier track
          </p>
          <Link
            href="/simulador"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              simulatorUnlocked
                ? 'bg-[var(--accent-dim)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0F0F0F]'
                : 'bg-[var(--surface)] text-[var(--text-3)] cursor-not-allowed pointer-events-none'
            }`}
          >
            Ir al simulador
            <span className="material-icons text-sm ml-1">arrow_forward</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
