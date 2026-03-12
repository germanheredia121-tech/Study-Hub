'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  getUserName,
  setUserName,
  getCompletedModulesCount,
  getTotalModulesCount,
  getLeetCodeCompletedCount,
  getStreakData,
  getActivityForLast7Days,
  getQuizzesPerfectCount,
  getUnlockedAchievements,
  type AchievementId,
} from '@/lib/dashboard-utils';
import { getProgress } from '@/lib/utils';
import { DSA_MODULES, FLUTTER_MODULES, FS_MODULES } from '@/lib/data';
import { isSimulatorUnlocked } from '@/lib/interview-simulator-utils';

const ACHIEVEMENTS: { id: AchievementId; icon: string; title: string }[] = [
  { id: 'streak_7', icon: 'local_fire_department', title: 'Racha de 7 días' },
  { id: 'first_module', icon: 'bolt', title: 'Primer módulo' },
  { id: 'perfectionist', icon: 'verified', title: 'Perfeccionista' },
  { id: 'easy_complete', icon: 'psychology', title: 'Easy Complete' },
  { id: 'interviewed', icon: 'record_voice_over', title: 'Entrevistado' },
  { id: 'fullstack_done', icon: 'emoji_events', title: 'Full Stack Listo' },
];

const ACHIEVEMENT_DESCS: Record<AchievementId, string> = {
  streak_7: 'Estudiastes 7 días seguidos',
  first_module: 'Completaste tu primer módulo',
  perfectionist: '100% en un quiz a la primera',
  easy_complete: 'Completaste los 15 LeetCode Easy',
  interviewed: 'Completaste tu primera entrevista simulada',
  fullstack_done: 'Completaste el track Full Stack Web',
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    setMounted(true);
    const n = getUserName();
    setName(n);
    setShowOnboarding(!n);
  }, []);

  const handleSaveName = () => {
    const trimmed = name.trim();
    if (trimmed) {
      setUserName(trimmed);
      setShowOnboarding(false);
    }
  };

  if (!mounted) return null;

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center p-6">
        <Navbar activeLink="dashboard" />
        <div className="max-w-md w-full mt-24">
          <h1 className="text-2xl font-bold mb-2">¿Cómo te llamás?</h1>
          <p className="text-[var(--text-2)] text-sm mb-6">(para personalizar tu dashboard)</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-3)] mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <button
            onClick={handleSaveName}
            className="w-full py-3 rounded-full bg-[var(--accent)] hover:opacity-90 text-[#0F0F0F] font-semibold transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    );
  }

  const displayName = getUserName() || 'Estudiante';
  const streak = getStreakData();
  const activity = getActivityForLast7Days();
  const maxActivity = Math.max(...activity, 1);
  const unlocked = getUnlockedAchievements();

  const getLastVisitedModule = (path: 'dsa' | 'flutter' | 'fullstack') => {
    const modules = path === 'dsa' ? DSA_MODULES : path === 'flutter' ? FLUTTER_MODULES : FS_MODULES;
    const progress = getProgress(path);
    for (let i = 0; i < modules.length; i++) {
      if (!progress[modules[i].id] && i > 0) {
        return modules[i - 1];
      }
      if (!progress[modules[i].id]) return modules[0];
    }
    return modules[modules.length - 1];
  };

  const trackProgress = [
    { path: 'dsa', name: 'DSA & LeetCode', modules: DSA_MODULES, badge: 'bg-green-500/20 text-green-400' },
    { path: 'flutter', name: 'Flutter Expert', modules: FLUTTER_MODULES, badge: 'bg-violet-500/20 text-violet-400' },
    { path: 'fullstack', name: 'Full Stack Web', modules: FS_MODULES, badge: 'bg-blue-500/20 text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar activeLink="dashboard" />

      <main className="pt-24 pb-20 max-w-6xl mx-auto px-4 md:px-6">
        <header className="mb-12">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            Bienvenido, {displayName}
            <span className="material-icons text-2xl text-[var(--accent)]">waving_hand</span>
          </h1>
          <p className="text-[var(--text-2)] mt-1">Hoy es un buen día para estudiar.</p>
          {streak.current > 0 && (
            <p className="text-amber-400 text-sm mt-2 flex items-center gap-1">
              <span className="material-icons text-base">local_fire_department</span>
              Racha de {streak.current} días consecutivos
            </p>
          )}
        </header>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)]">
            <span className="material-icons text-blue-400 bg-blue-500/20 p-2 rounded-lg text-2xl mb-2 block w-fit">menu_book</span>
            <p className="text-xs text-[var(--text-2)] mb-1">Módulos completados</p>
            <p className="text-2xl font-bold text-[var(--text)]">
              {getCompletedModulesCount()} de {getTotalModulesCount()}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)]">
            <span className="material-icons text-green-400 bg-green-500/20 p-2 rounded-lg text-2xl mb-2 block w-fit">integration_instructions</span>
            <p className="text-xs text-[var(--text-2)] mb-1">Ejercicios LeetCode</p>
            <p className="text-2xl font-bold text-[var(--text)]">{getLeetCodeCompletedCount()} de 35</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)]">
            <span className="material-icons text-orange-400 bg-orange-500/20 p-2 rounded-lg text-2xl mb-2 block w-fit">local_fire_department</span>
            <p className="text-xs text-[var(--text-2)] mb-1">Racha actual</p>
            <p className="text-2xl font-bold text-[var(--text)]">{streak.current} días</p>
            <p className="text-xs text-[var(--text-3)]">Récord: {streak.record} días</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)]">
            <span className="material-icons text-yellow-400 bg-yellow-500/20 p-2 rounded-lg text-2xl mb-2 block w-fit">emoji_events</span>
            <p className="text-xs text-[var(--text-2)] mb-1">Quizzes perfectos</p>
            <p className="text-2xl font-bold text-[var(--text)]">{getQuizzesPerfectCount()}</p>
          </div>
        </div>

        {/* Activity chart */}
        <div className="mb-12 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
          <h2 className="font-semibold text-lg mb-4">Actividad semanal</h2>
          {activity.every((a) => a === 0) ? (
            <p className="text-[var(--text-3)] text-sm">Estudiá hoy para ver tu actividad acá</p>
          ) : (
            <div className="flex items-end gap-2 h-24">
              {activity.map((val, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                const label = d.toLocaleDateString('es-AR', { weekday: 'short' });
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-[var(--accent)] min-h-[4px] transition-all"
                      style={{ height: `${(val / maxActivity) * 80}px` }}
                    />
                    <span className="text-xs text-[var(--text-3)]">{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Progress by track */}
        <div className="mb-12 space-y-4">
          <h2 className="font-semibold text-lg">Progreso por track</h2>
          {trackProgress.map((t) => {
            const progress = getProgress(t.path as 'dsa' | 'flutter' | 'fullstack');
            const done = t.modules.filter((m) => progress[m.id]).length;
            const lastMod = getLastVisitedModule(t.path as 'dsa' | 'flutter' | 'fullstack');
            return (
              <div key={t.path} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${t.badge}`}>{t.path.toUpperCase()}</span>
                  <span className="text-sm text-[var(--text-2)]">{done} de {t.modules.length} módulos</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-[var(--accent)] transition-all"
                    style={{ width: `${(done / t.modules.length) * 100}%` }}
                  />
                </div>
                <Link
                  href={`/${t.path}/${lastMod.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:bg-[var(--accent-dim)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
                >
                  Continuar desde: {lastMod.title}
                  <span className="material-icons text-sm">arrow_forward</span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="font-semibold text-lg mb-4">Logros</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a) => {
              const isUnlocked = unlocked.includes(a.id);
              return (
                <div
                  key={a.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isUnlocked
                      ? 'bg-[var(--surface)] border-[var(--border)]'
                      : 'bg-[var(--surface)] border-[var(--border)] opacity-50'
                  }`}
                >
                  <span className="text-2xl mb-2 block">
                    {isUnlocked ? (
                      <span className="material-icons text-[var(--accent)]">{a.icon}</span>
                    ) : (
                      <span className="material-icons text-[var(--text-3)]">lock</span>
                    )}
                  </span>
                  <p className="font-medium text-[var(--text)] text-sm">{a.title}</p>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">{ACHIEVEMENT_DESCS[a.id]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Próximo paso */}
        <div className="p-6 rounded-2xl border-2 border-[var(--accent-border)] bg-[var(--accent-dim)]">
          <h3 className="font-semibold text-lg mb-2">Tu próximo paso recomendado</h3>
          {(() => {
            const next = trackProgress
              .map((t) => {
                const progress = getProgress(t.path as 'dsa' | 'flutter' | 'fullstack');
                const idx = t.modules.findIndex((m) => !progress[m.id]);
                return idx >= 0 ? { path: t.path, mod: t.modules[idx] } : null;
              })
              .find(Boolean);
            const nextMod = next ? { path: next!.path, mod: next!.mod } : null;
            const msg =
              getCompletedModulesCount() === 0
                ? 'Empezá con el primer módulo de DSA para construir tu base.'
                : !isSimulatorUnlocked() && getCompletedModulesCount() < 4
                  ? `Completá ${4 - getCompletedModulesCount()} módulos más para desbloquear el Simulador de Entrevista.`
                  : nextMod
                    ? `Continuá con: ${nextMod.mod.title}`
                    : 'Seguí practicando en el Simulador de Entrevista.';
            const href = nextMod ? `/${nextMod.path}/${nextMod.mod.slug}` : getCompletedModulesCount() === 0 ? '/dsa/big-o' : '/simulador';
            return (
              <>
                <p className="text-[var(--text-2)] text-sm mb-4">{msg}</p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] hover:opacity-90 text-[#0F0F0F] font-medium transition-colors"
                >
                  Continuar
                  <span className="material-icons text-lg">arrow_forward</span>
                </Link>
              </>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
