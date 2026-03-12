'use client';

import { useState, useEffect } from 'react';
import type { LeetCodeExercise } from '@/lib/leetcode-exercises';
import { getLeetCodeHintLevel, setLeetCodeHintLevel } from '@/lib/leetcode-utils';

interface LeetCodeExerciseDetailProps {
  exercise: LeetCodeExercise;
  onClose: () => void;
  onMarkComplete: () => void;
  isCompleted: boolean;
}

export default function LeetCodeExerciseDetail({ exercise, onClose, onMarkComplete, isCompleted }: LeetCodeExerciseDetailProps) {
  const [hintLevel, setHintLevelState] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setHintLevelState(getLeetCodeHintLevel(exercise.id));
    setShowSolution(false);
  }, [exercise.id]);

  const revealHint = () => {
    if (hintLevel < 4) {
      const next = hintLevel + 1;
      setHintLevelState(next);
      setLeetCodeHintLevel(exercise.id, next);
    }
  };

  const canShowSolution = hintLevel >= 1 || isCompleted;

  const diffColor = exercise.difficulty === 'easy' ? 'text-emerald-400' : exercise.difficulty === 'medium' ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-[var(--surface)] border-l border-[var(--border)] z-40 overflow-y-auto shadow-2xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <button onClick={onClose} className="text-[var(--text-2)] hover:text-[var(--text)] text-sm mb-4 flex items-center gap-2">
              <span className="material-icons text-sm">arrow_back</span>
              Cerrar
            </button>
            <h2 className="text-xl font-bold mb-2 text-[var(--text)]">#{exercise.number} — {exercise.name}</h2>
            <span className={`text-sm font-mono ${diffColor}`}>
              {exercise.difficulty.toUpperCase()} | {exercise.pattern} | {exercise.module}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href={`https://leetcode.com/problems/${exercise.leetcodeSlug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg hover:bg-[var(--accent)]/30 text-sm font-medium inline-flex items-center gap-1"
          >
            Abrir en LeetCode
            <span className="material-icons text-sm">open_in_new</span>
          </a>
          <button
            onClick={revealHint}
            disabled={hintLevel >= 4}
            className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 text-sm font-medium disabled:opacity-50 inline-flex items-center gap-1"
          >
            <span className="material-icons text-sm">lightbulb</span>
            {hintLevel >= 4 ? 'Pistas completadas' : `Ver pista ${hintLevel + 1} de 4`}
            {hintLevel < 4 && <span className="material-icons text-sm">arrow_forward</span>}
          </button>
          {canShowSolution && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 text-sm font-medium inline-flex items-center gap-1"
            >
              <span className="material-icons text-sm">check_circle</span>
              {showSolution ? 'Ocultar solución' : 'Mostrar solución'}
            </button>
          )}
          {!isCompleted && (
            <button
              onClick={onMarkComplete}
              className="px-4 py-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text)]"
            >
              Marcar como completado
            </button>
          )}
        </div>

        {/* Pattern reminder - always visible */}
        <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4 mb-6">
          <div className="text-xs font-mono text-emerald-400/80 mb-2 flex items-center gap-1"><span className="material-icons text-xs">menu_book</span> Recordá lo que estudiaste en {exercise.patternReminder.module}</div>
          <div className="font-semibold mb-2">{exercise.patternReminder.name} — cuándo usarlo:</div>
          <p className="text-[#888888] text-sm mb-2">{exercise.patternReminder.whenToUse}</p>
          <p className="text-[#666] text-xs mb-2">Palabras clave: {exercise.patternReminder.keywords}</p>
          <pre className="text-xs bg-black/50 p-3 rounded overflow-x-auto text-[#aaa] font-mono">{exercise.patternReminder.template}</pre>
        </div>

        {/* Hints - shown progressively */}
        {hintLevel >= 1 && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-6">
            <div className="text-xs font-mono text-amber-400 mb-2 flex items-center gap-1"><span className="material-icons text-xs">lightbulb</span> PISTA {hintLevel}/4</div>
            <p className="text-[#ccc] text-sm whitespace-pre-line">{exercise.hints[hintLevel - 1]}</p>
          </div>
        )}

        {/* Solution - shown when requested */}
        {showSolution && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-4">
            <div className="font-bold text-emerald-400 flex items-center gap-2"><span className="material-icons text-lg">check_circle</span> SOLUCIÓN — {exercise.name}</div>

            <div>
              <div className="text-sm font-semibold mb-3">COMPLEJIDAD</div>
              <p className="text-[#888888] text-sm">Temporal: {exercise.solution.timeComplexity}</p>
              <p className="text-[#888888] text-sm">Espacial: {exercise.solution.spaceComplexity}</p>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">PATRÓN USADO: {exercise.solution.patternUsed}</div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">CÓDIGO COMPLETO (TypeScript)</div>
              <pre className="text-xs bg-black/50 p-4 rounded overflow-x-auto text-[#aaa] font-mono whitespace-pre-wrap">{exercise.solution.code}</pre>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3 flex items-center gap-2"><span className="material-icons text-base">warning</span> ERRORES MÁS COMUNES EN ESTE EJERCICIO</div>
              <ol className="list-decimal list-inside space-y-2 text-[#888888] text-sm">
                {exercise.solution.commonErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ol>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3 flex items-center gap-2"><span className="material-icons text-base">link</span> PROBLEMAS RELACIONADOS</div>
              <p className="text-[#888888] text-sm">{exercise.solution.relatedProblems.join(' · ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
