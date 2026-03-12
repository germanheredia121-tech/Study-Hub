/**
 * Simulador de Entrevista — Persistencia y desbloqueo
 */

import { getProgress } from './utils';
import { DSA_MODULES, FLUTTER_MODULES, FS_MODULES } from './data';

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
}

export function getCompletedModulesCount(): number {
  if (typeof window === 'undefined') return 0;
  const dsa = getProgress('dsa');
  const flutter = getProgress('flutter');
  const fullstack = getProgress('fullstack');
  const dsaCount = DSA_MODULES.filter((m) => dsa[m.id]).length;
  const flutterCount = FLUTTER_MODULES.filter((m) => flutter[m.id]).length;
  const fsCount = FS_MODULES.filter((m) => fullstack[m.id]).length;
  return dsaCount + flutterCount + fsCount;
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
