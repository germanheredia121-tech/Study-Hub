/**
 * Utilidades para el LeetCode Challenge
 * Persistencia en localStorage según promptejercicios.txt
 */

const LEETCODE_STORAGE_PREFIX = 'studyhub_leetcode_';
const LEETCODE_HONESTY_PREFIX = 'studyhub_leetcode_honesty_';
const LEETCODE_HINTS_PREFIX = 'studyhub_leetcode_hints_';

export type LeetCodeCompletionStatus = 'completed' | 'reviewed'; // reviewed = marcó "No" en honestidad

export const getLeetCodeProgress = (): Record<number, LeetCodeCompletionStatus> => {
  if (typeof window === 'undefined') return {};
  const result: Record<number, LeetCodeCompletionStatus> = {};
  for (let i = 1; i <= 35; i++) {
    const stored = localStorage.getItem(`${LEETCODE_STORAGE_PREFIX}${i}`);
    if (stored === 'completed' || stored === 'reviewed') result[i] = stored;
  }
  return result;
};

export const markLeetCodeComplete = (problemNumber: number, status: LeetCodeCompletionStatus) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${LEETCODE_STORAGE_PREFIX}${problemNumber}`, status);
  window.dispatchEvent(new Event('leetcode_progress_updated'));
};

export const getLeetCodeHintLevel = (problemNumber: number): number => {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(`${LEETCODE_HINTS_PREFIX}${problemNumber}`);
  return stored ? parseInt(stored, 10) : 0;
};

export const setLeetCodeHintLevel = (problemNumber: number, level: number) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${LEETCODE_HINTS_PREFIX}${problemNumber}`, String(level));
};

export const getLeetCodeHonesty = (problemNumber: number): { solvedAlone: boolean; complexity: string; pattern: string } | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`${LEETCODE_HONESTY_PREFIX}${problemNumber}`);
  return stored ? JSON.parse(stored) : null;
};

export const setLeetCodeHonesty = (problemNumber: number, data: { solvedAlone: boolean; complexity: string; pattern: string }) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${LEETCODE_HONESTY_PREFIX}${problemNumber}`, JSON.stringify(data));
};

// Desbloqueo por niveles: Medium cuando 12/15 Easy, Hard cuando 12/15 Medium
export const EASY_COUNT = 15;
export const MEDIUM_COUNT = 15;
export const HARD_COUNT = 5;
export const EASY_UNLOCK_MEDIUM = 12;
export const MEDIUM_UNLOCK_HARD = 12;

export const getLeetCodeCounts = (progress: Record<number, LeetCodeCompletionStatus>) => {
  let easyDone = 0, mediumDone = 0, hardDone = 0;
  const exercises = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 31,32,33,34,35];
  const easyNums = exercises.slice(0, 15);
  const mediumNums = exercises.slice(15, 30);
  const hardNums = exercises.slice(30, 35);
  easyNums.forEach(n => { if (progress[n]) easyDone++; });
  mediumNums.forEach(n => { if (progress[n]) mediumDone++; });
  hardNums.forEach(n => { if (progress[n]) hardDone++; });
  return { easyDone, mediumDone, hardDone, total: easyDone + mediumDone + hardDone };
};

export const isLeetCodeLevelUnlocked = (
  level: 'easy' | 'medium' | 'hard',
  progress: Record<number, LeetCodeCompletionStatus>
) => {
  const { easyDone, mediumDone } = getLeetCodeCounts(progress);
  if (level === 'easy') return true;
  if (level === 'medium') return easyDone >= EASY_UNLOCK_MEDIUM;
  if (level === 'hard') return mediumDone >= MEDIUM_UNLOCK_HARD;
  return false;
};

export const isLeetCodeChallengeComplete = (progress: Record<number, LeetCodeCompletionStatus>) => {
  const { easyDone, mediumDone, hardDone } = getLeetCodeCounts(progress);
  return easyDone === EASY_COUNT && mediumDone === MEDIUM_COUNT && hardDone === HARD_COUNT;
};
