/**
 * Simulador de Entrevista — Persistencia y desbloqueo
 */

import { getProgress } from './utils';
import { DSA_MODULES, FLUTTER_MODULES, FS_MODULES, NEXTJS_MODULES, DB_MODULES, ENGLISH_MODULES, JOB_MODULES } from './data';

const MIN_MODULES_TO_UNLOCK = 4;
const STORAGE_KEY = 'studyhub-interview-history';

export interface InterviewRecord {
  id: string;
  date: string; // ISO
  company: string;
  difficulty: string;
  problemTitle: string;
  problemId: string;
  durationMinutes: number;
  timeUsedSeconds: number;
  surrendered: boolean;
  basicTestsPassed: number;
  basicTestsTotal: number;
  hiddenTestsPassed: number;
  hiddenTestsTotal: number;
  userCode: string;
  suggestedModule?: string;
}

export function getCompletedModulesCount(): number {
  if (typeof window === 'undefined') return 0;
  const dsa = getProgress('dsa');
  const flutter = getProgress('flutter');
  const fullstack = getProgress('fullstack');
  const nextjs = getProgress('nextjs');
  const database = getProgress('database');
  const english = getProgress('english');
  const jobhunting = getProgress('jobhunting');
  const dsaCount = DSA_MODULES.filter((m) => dsa[m.id]).length;
  const flutterCount = FLUTTER_MODULES.filter((m) => flutter[m.id]).length;
  const fsCount = FS_MODULES.filter((m) => fullstack[m.id]).length;
  const nextjsCount = NEXTJS_MODULES.filter((m) => nextjs[m.id]).length;
  const dbCount = DB_MODULES.filter((m) => database[m.id]).length;
  const englishCount = ENGLISH_MODULES.filter((m) => english[m.id]).length;
  const jobCount = JOB_MODULES.filter((m) => jobhunting[m.id]).length;
  return dsaCount + flutterCount + fsCount + nextjsCount + dbCount + englishCount + jobCount;
}

export function isSimulatorUnlocked(): boolean {
  return getCompletedModulesCount() >= MIN_MODULES_TO_UNLOCK;
}

export function getUnlockMessage(): string {
  const count = getCompletedModulesCount();
  const needed = MIN_MODULES_TO_UNLOCK - count;
  return `Para simular una entrevista real primero necesitás tener la base teórica. Completá al menos ${MIN_MODULES_TO_UNLOCK} módulos de cualquier track para desbloquear el simulador.${count > 0 ? ` (Te faltan ${needed})` : ''}`;
}

export function getInterviewHistory(): InterviewRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveInterviewRecord(record: InterviewRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getInterviewHistory();
    history.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function getHistoryStats(): {
  total: number;
  successRate: number;
  avgTimeUsed: number;
  avgDuration: number;
} {
  const history = getInterviewHistory();
  if (history.length === 0) {
    return { total: 0, successRate: 0, avgTimeUsed: 0, avgDuration: 0 };
  }
  const allPassed = history.filter(
    (h) => h.basicTestsPassed === h.basicTestsTotal && h.hiddenTestsPassed === h.hiddenTestsTotal
  ).length;
  const totalSeconds = history.reduce((a, h) => a + h.timeUsedSeconds, 0);
  const totalDuration = history.reduce((a, h) => a + h.durationMinutes * 60, 0);
  return {
    total: history.length,
    successRate: Math.round((allPassed / history.length) * 100),
    avgTimeUsed: Math.round(totalSeconds / history.length),
    avgDuration: Math.round(totalDuration / history.length),
  };
}

export function getAreasToImprove(): { type: string; text: string }[] {
  const history = getInterviewHistory();
  if (history.length === 0) return [];

  const areas: { type: string; text: string }[] = [];

  // Success rate by difficulty
  const byDiff = { easy: [] as InterviewRecord[], medium: [] as InterviewRecord[], hard: [] as InterviewRecord[] };
  history.forEach((h) => {
    const d = h.difficulty as 'easy' | 'medium' | 'hard';
    if (byDiff[d]) byDiff[d].push(h);
  });

  for (const [diff, records] of Object.entries(byDiff)) {
    if (records.length < 2) continue;
    const passed = records.filter((r) => r.basicTestsPassed === r.basicTestsTotal && r.hiddenTestsPassed === r.hiddenTestsTotal).length;
    const rate = Math.round((passed / records.length) * 100);
    const label = diff === 'easy' ? 'Easy' : diff === 'medium' ? 'Medium' : 'Hard';
    if (rate < 70) {
      areas.push({ type: 'difficulty', text: `${label} problems: ${rate}% tasa de éxito` });
    }
  }

  // Average time for medium (meta 25 min)
  const mediumRecords = history.filter((h) => h.difficulty === 'medium');
  if (mediumRecords.length >= 2) {
    const avgSec = mediumRecords.reduce((a, h) => a + h.timeUsedSeconds, 0) / mediumRecords.length;
    const avgMin = Math.round(avgSec / 60);
    if (avgMin > 25) {
      areas.push({ type: 'time', text: `Tiempo en Medium: promedio ${avgMin} min (meta 25)` });
    }
  }

  // Suggested modules from failed interviews
  const failedWithSuggestion = history.filter(
    (h) =>
      (h.basicTestsPassed !== h.basicTestsTotal || h.hiddenTestsPassed !== h.hiddenTestsTotal) &&
      h.suggestedModule
  );
  const moduleCounts: Record<string, number> = {};
  failedWithSuggestion.forEach((h) => {
    const m = h.suggestedModule!;
    moduleCounts[m] = (moduleCounts[m] || 0) + 1;
  });
  const topModule = Object.entries(moduleCounts).sort((a, b) => b[1] - a[1])[0];
  if (topModule) {
    areas.push({ type: 'module', text: `Módulo sugerido: ${topModule[0]}` });
  }

  return areas;
}
