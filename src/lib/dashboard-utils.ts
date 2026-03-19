/**
 * Dashboard — localStorage keys según prompt2.txt
 * Lee del progreso existente (study_progress_*) y agrega keys propias
 */

import { getProgress } from './utils';
import { getLeetCodeProgress, getLeetCodeCounts } from './leetcode-utils';
import { getInterviewHistory } from './interview-simulator-utils';
import { DSA_MODULES, FLUTTER_MODULES, FS_MODULES, NEXTJS_MODULES, DB_MODULES, ENGLISH_MODULES, JOB_MODULES } from './data';

const NAME_KEY = 'studyhub_name';
const STREAK_KEY = 'studyhub_streak';
const ACTIVITY_PREFIX = 'studyhub_activity_';

export function getUserName(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(NAME_KEY) ?? '';
}

export function setUserName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NAME_KEY, name.trim());
}

export function getTotalModulesCount(): number {
  return DSA_MODULES.length + FLUTTER_MODULES.length + FS_MODULES.length + NEXTJS_MODULES.length
    + DB_MODULES.length + ENGLISH_MODULES.length + JOB_MODULES.length;
}

export function getCompletedModulesCount(): number {
  if (typeof window === 'undefined') return 0;
  const dsa = getProgress('dsa');
  const flutter = getProgress('flutter');
  const fs = getProgress('fullstack');
  const nextjs = getProgress('nextjs');
  const db = getProgress('database');
  const english = getProgress('english');
  const job = getProgress('jobhunting');
  const dsaCount = DSA_MODULES.filter((m) => dsa[m.id]).length;
  const flutterCount = FLUTTER_MODULES.filter((m) => flutter[m.id]).length;
  const fsCount = FS_MODULES.filter((m) => fs[m.id]).length;
  const nextjsCount = NEXTJS_MODULES.filter((m) => nextjs[m.id]).length;
  const dbCount = DB_MODULES.filter((m) => db[m.id]).length;
  const englishCount = ENGLISH_MODULES.filter((m) => english[m.id]).length;
  const jobCount = JOB_MODULES.filter((m) => job[m.id]).length;
  return dsaCount + flutterCount + fsCount + nextjsCount + dbCount + englishCount + jobCount;
}

export function getLeetCodeCompletedCount(): number {
  if (typeof window === 'undefined') return 0;
  const progress = getLeetCodeProgress();
  return getLeetCodeCounts(progress).total;
}

export function getStreakData(): { current: number; record: number; lastDate: string } {
  if (typeof window === 'undefined') return { current: 0, record: 0, lastDate: '' };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { current: 0, record: 0, lastDate: '' };
    return JSON.parse(raw);
  } catch {
    return { current: 0, record: 0, lastDate: '' };
  }
}

export function updateStreak(): void {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().slice(0, 10);
  const data = getStreakData();
  const last = data.lastDate;
  let { current, record } = data;
  if (last === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  if (last === yesterdayStr) {
    current += 1;
  } else if (last !== today) {
    current = 1;
  }
  if (current > record) record = current;
  localStorage.setItem(STREAK_KEY, JSON.stringify({ current, record, lastDate: today }));
}

export function setStreakData(data: { current: number; record: number; lastDate: string }): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

export function getActivityForLast7Days(): number[] {
  if (typeof window === 'undefined') return [0, 0, 0, 0, 0, 0, 0];
  const result: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = ACTIVITY_PREFIX + d.toISOString().slice(0, 10);
    const raw = localStorage.getItem(key);
    result.push(raw ? parseInt(raw, 10) : 0);
  }
  return result;
}

export function recordActivity(): void {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().slice(0, 10);
  const key = ACTIVITY_PREFIX + today;
  const current = parseInt(localStorage.getItem(key) ?? '0', 10);
  localStorage.setItem(key, String(current + 1));
  updateStreak();
}

export function getQuizzesPerfectCount(): number {
  return getCompletedModulesCount();
}

export function getInterviewCompletedCount(): number {
  if (typeof window === 'undefined') return 0;
  return getInterviewHistory().length;
}

// Achievements
export type AchievementId = 'streak_7' | 'first_module' | 'perfectionist' | 'easy_complete' | 'interviewed' | 'fullstack_done';

export function getUnlockedAchievements(): AchievementId[] {
  const unlocked: AchievementId[] = [];
  const { current } = getStreakData();
  const modulesDone = getCompletedModulesCount();
  const leetcodeCounts = getLeetCodeCounts(getLeetCodeProgress());
  const interviewsDone = getInterviewCompletedCount();
  const fsProgress = getProgress('fullstack');
  const fsTotal = FS_MODULES.length;
  const fsDone = FS_MODULES.filter((m) => fsProgress[m.id]).length;

  if (current >= 7) unlocked.push('streak_7');
  if (modulesDone >= 1) unlocked.push('first_module');
  if (modulesDone >= 1) unlocked.push('perfectionist');
  if (leetcodeCounts.easyDone >= 15) unlocked.push('easy_complete');
  if (interviewsDone >= 1) unlocked.push('interviewed');
  if (fsDone >= fsTotal) unlocked.push('fullstack_done');

  return unlocked;
}
