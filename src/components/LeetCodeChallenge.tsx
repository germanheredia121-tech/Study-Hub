'use client';

import { useState, useEffect } from 'react';
import {
  LEETCODE_EXERCISES,
  getExercisesByLevel,
  LEETCODE_PATTERNS,
} from '@/lib/leetcode-exercises';
import {
  getLeetCodeProgress,
  markLeetCodeComplete,
  getLeetCodeCounts,
  isLeetCodeLevelUnlocked,
  isLeetCodeChallengeComplete,
  getLeetCodeHintLevel,
  setLeetCodeHintLevel,
  getLeetCodeHonesty,
  setLeetCodeHonesty,
  type LeetCodeCompletionStatus,
} from '@/lib/leetcode-utils';
import { getProgress } from '@/lib/utils';
import { LEETCODE_LAST_THEORETICAL_MODULE } from '@/lib/leetcode-exercises';
import { DSA_MODULES } from '@/lib/data';
import LeetCodeExerciseDetail from './LeetCodeExerciseDetail';

const FIVE_STEPS = [
  { id: 1, title: 'Entendé el problema (2 min)', desc: 'Leé dos veces. Identificá: ¿qué recibís? ¿qué devolvés? ¿hay constraints? Buscá palabras clave: "sorted" → binary search, "substring" → sliding window, "tree" → DFS/BFS, "k elements" → heap.' },
  { id: 2, title: 'Ejemplos propios (2 min)', desc: 'No uses los ejemplos del enunciado. Creá el tuyo más simple posible. Después creá el edge case: array vacío, un solo elemento, todos iguales.' },
  { id: 3, title: 'Fuerza bruta primero (1 min)', desc: 'Siempre podés resolver con O(n²) o O(n³). Decilo en voz alta. "La solución obvia es..." — esto desbloquea el cerebro y muestra al entrevistador que entendés el problema.' },
  { id: 4, title: 'Optimizá identificando el cuello de botella (3 min)', desc: '¿Qué parte se repite? ¿Qué información ya calculaste que volvés a calcular? ¿Qué patrón de los 8 aplica acá?' },
  { id: 5, title: 'Codificá con comentarios primero', desc: 'Escribí los comentarios del algoritmo antes del código. // 1. inicializar dos punteros // 2. mientras left < right // 3. si suma == target, retornar. Luego completá el código debajo de cada comentario.' },
];

export default function LeetCodeChallenge() {
  const [progress, setProgress] = useState<Record<number, LeetCodeCompletionStatus>>({});
  const [mounted, setMounted] = useState(false);
  const [patternsOpen, setPatternsOpen] = useState(false);
  const [stepsSeen, setStepsSeen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<typeof LEETCODE_EXERCISES[0] | null>(null);
  const [honestyModal, setHonestyModal] = useState<{ exercise: typeof LEETCODE_EXERCISES[0]; resolve: (data: { solvedAlone: boolean; complexity: string; pattern: string }) => void } | null>(null);

  const isChallengeUnlocked = () => {
    const dsaProgress = getProgress('dsa');
    return !!dsaProgress[LEETCODE_LAST_THEORETICAL_MODULE];
  };

  useEffect(() => {
    setMounted(true);
    const update = () => setProgress(getLeetCodeProgress());
    update();
    window.addEventListener('leetcode_progress_updated', update);
    return () => window.removeEventListener('leetcode_progress_updated', update);
  }, []);

  useEffect(() => {
    if (mounted && !stepsSeen) setStepsSeen(true);
  }, [mounted, stepsSeen]);

  const { easyDone, mediumDone, hardDone, total } = getLeetCodeCounts(progress);
  const unlocked = mounted && isChallengeUnlocked();
  const completed = isLeetCodeChallengeComplete(progress);
  const { easy, medium, hard } = getExercisesByLevel();

  const handleMarkComplete = (exercise: typeof LEETCODE_EXERCISES[0]) => {
    setHonestyModal({
      exercise,
      resolve: (data) => {
        setLeetCodeHonesty(exercise.id, data);
        markLeetCodeComplete(exercise.id, data.solvedAlone ? 'completed' : 'reviewed');
        setHonestyModal(null);
        setSelectedExercise(null);
      },
    });
  };

  if (!mounted) return null;

  if (!unlocked) {
    return (
      <div className="px-3 pt-16 md:p-8 pb-32 max-w-5xl mx-auto">
        <div className="bg-[var(--surface)] border border-amber-500/30 rounded-xl p-8 md:p-12 text-center">
          <div className="mb-4">
            <span className="material-icons text-5xl text-[var(--text-3)]">lock</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">LeetCode Challenge — Bloqueado</h2>
          <p className="text-[#888888] mb-6">
            Completá el quiz del último módulo teórico (Problemas Hard Completos) con al menos 90% para desbloquear esta sección.
          </p>
          <p className="text-sm text-[#666]">Esta validación práctica demuestra que realmente entendiste cada módulo.</p>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="px-3 pt-16 md:p-8 pb-32 max-w-5xl mx-auto">
        <div className="bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-xl p-8 md:p-12 text-center">
          <div className="mb-6">
            <span className="material-icons text-6xl text-emerald-400">check_circle</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-emerald-400">Track DSA & LeetCode — COMPLETADO</h2>
          <p className="text-[#888888] mb-6">
            Lo que demostraste:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 mb-8 text-[#ccc]">
            <li>→ Reconocés patrones algorítmicos en problemas nuevos</li>
            <li>→ Resolvés bajo presión sin necesitar ver la solución</li>
            <li>→ Tu complejidad temporal es conscientemente elegida, no accidental</li>
          </ul>
          <p className="text-[#888888] mb-4">
            El 90% de las entrevistas técnicas en empresas como Naranja X, Globant y Mercado Libre usan problemas de este nivel o más fáciles. Estás listo.
          </p>
          <p className="text-sm text-[#666]">
            Próximo paso: Mock interviews — resolvé 5 problemas Medium con un timer de 25 minutos cada uno sin ayuda externa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 pt-16 md:p-8 pb-32 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">LeetCode Challenge — Validación Final</h1>
        <p className="text-[#888888] text-lg">
          Leer teoría no es suficiente. Estos ejercicios demuestran que realmente entendiste cada módulo. Completalos todos para certificar el track DSA.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[var(--text-2)] text-sm font-mono">Progreso</span>
          <span className="text-[var(--text)] font-bold">{total}/35 completados</span>
        </div>
        <div className="h-3 bg-[var(--surface-2)] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(total / 35) * 100}%` }}
          />
        </div>
        <div className="flex gap-4 text-sm">
          <span className={`inline-flex items-center gap-1 ${easyDone >= 15 ? 'text-emerald-400' : 'text-[var(--text-2)]'}`}>Easy: {easyDone}/15 {easyDone >= 15 && <span className="material-icons text-sm">check_circle</span>}</span>
          <span className={`inline-flex items-center gap-1 ${mediumDone >= 15 ? 'text-emerald-400' : 'text-[var(--text-2)]'}`}>Medium: {mediumDone}/15 {mediumDone >= 15 && <span className="material-icons text-sm">check_circle</span>}</span>
          <span className={`inline-flex items-center gap-1 ${hardDone >= 5 ? 'text-emerald-400' : 'text-[var(--text-2)]'}`}>Hard: {hardDone}/5 {hardDone >= 5 && <span className="material-icons text-sm">check_circle</span>}</span>
        </div>
      </div>

      {/* 5 steps - always visible first time */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Los 5 pasos antes de escribir una línea de código</h2>
        <div className="space-y-4">
          {FIVE_STEPS.map((step) => (
            <div key={step.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
              <div className="font-semibold text-emerald-400/80 mb-2">Paso {step.id} — {step.title}</div>
              <p className="text-[var(--text-2)] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8 patterns - collapsible */}
      <div className="mb-8">
        <button
          onClick={() => setPatternsOpen(!patternsOpen)}
          className="w-full flex items-center justify-between bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--surface-2)] transition-colors"
        >
          <span className="font-bold">Los 8 patrones que resuelven el 90% de LeetCode</span>
          <span className="text-2xl">{patternsOpen ? '−' : '+'}</span>
        </button>
        {patternsOpen && (
          <div className="mt-4 space-y-4 border border-[var(--border)] rounded-xl p-6 bg-[var(--surface)]">
            {LEETCODE_PATTERNS.map((p) => (
              <div key={p.id} className="border-b border-[var(--border)] pb-4 last:border-0">
                <div className="font-semibold text-emerald-400/80 mb-2">{p.id}. {p.name}</div>
                <p className="text-[var(--text-2)] text-sm mb-2">Cuándo: {p.when}</p>
                <p className="text-[var(--text-3)] text-xs mb-2">Problemas: {p.problems}</p>
                <pre className="text-xs bg-black/50 p-3 rounded overflow-x-auto text-[#aaa] font-mono">{p.template}</pre>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exercise list */}
      <div className="space-y-8">
        {['easy', 'medium', 'hard'].map((level) => {
          const exercises = level === 'easy' ? easy : level === 'medium' ? medium : hard;
          const levelUnlocked = isLeetCodeLevelUnlocked(level as 'easy' | 'medium' | 'hard', progress);
          const doneCount = level === 'easy' ? easyDone : level === 'medium' ? mediumDone : hardDone;
          const totalCount = level === 'easy' ? 15 : level === 'medium' ? 15 : 5;

          return (
            <div key={level} className="border border-[var(--border)] rounded-xl overflow-hidden">
              <div className={`px-6 py-4 flex items-center justify-between ${levelUnlocked ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface-2)] opacity-60'}`}>
                <h3 className="font-bold capitalize flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${level === 'easy' ? 'bg-emerald-500' : level === 'medium' ? 'bg-amber-500' : 'bg-red-500'}`} />
                  {level} — {doneCount}/{totalCount}
                </h3>
                {!levelUnlocked && (
                  <span className="text-xs text-amber-400">Desbloquea con {level === 'medium' ? '12/15 Easy' : '12/15 Medium'}</span>
                )}
              </div>
              <div className="divide-y divide-white/5">
                {exercises.map((ex) => {
                  const isDone = !!progress[ex.id];
                  const status = progress[ex.id];
                  return (
                    <div
                      key={ex.id}
                      className={`flex items-center gap-4 p-4 hover:bg-[var(--surface-2)] transition-colors cursor-pointer ${isDone ? 'opacity-80' : ''} ${!levelUnlocked ? 'pointer-events-none' : ''}`}
                      onClick={() => levelUnlocked && setSelectedExercise(ex)}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        readOnly
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (levelUnlocked && !isDone) handleMarkComplete(ex);
                        }}
                        className="w-5 h-5 rounded border-white/20 accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm text-[#666]">#{ex.number}</span>
                          <span className={`font-semibold ${isDone ? 'line-through text-[#666]' : ''}`}>{ex.name}</span>
                          {status === 'reviewed' && <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Revisado</span>}
                          {status === 'completed' && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Completado</span>}
                        </div>
                        <p className="text-xs text-[#666] mt-1">{ex.module} · {ex.tip}</p>
                      </div>
                      <a
                        href={`https://leetcode.com/problems/${ex.leetcodeSlug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-[var(--accent)] hover:underline shrink-0 inline-flex items-center gap-1"
                      >
                        Abrir
                        <span className="material-icons text-sm">open_in_new</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Exercise detail panel */}
      {selectedExercise && (
        <LeetCodeExerciseDetail
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onMarkComplete={() => handleMarkComplete(selectedExercise)}
          isCompleted={!!progress[selectedExercise.id]}
        />
      )}

      {/* Honesty modal */}
      {honestyModal && (
        <HonestyModal
          exercise={honestyModal.exercise}
          onResolve={honestyModal.resolve}
          onCancel={() => setHonestyModal(null)}
        />
      )}
    </div>
  );
}

function HonestyModal({
  exercise,
  onResolve,
  onCancel,
}: {
  exercise: typeof LEETCODE_EXERCISES[0];
  onResolve: (data: { solvedAlone: boolean; complexity: string; pattern: string }) => void;
  onCancel: () => void;
}) {
  const [solvedAlone, setSolvedAlone] = useState<boolean | null>(null);
  const [complexity, setComplexity] = useState('');
  const [pattern, setPattern] = useState('');

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4 text-[var(--text)]">Validación de honestidad — #{exercise.number} {exercise.name}</h3>
        <p className="text-[var(--text-2)] text-sm mb-6">Antes de marcar como completado:</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">¿Lo resolviste sin ver la solución?</label>
            <div className="flex gap-4">
              <button
                onClick={() => setSolvedAlone(true)}
                className={`px-4 py-2 rounded ${solvedAlone === true ? 'bg-emerald-500 text-white' : 'bg-[var(--surface-2)] text-[var(--text)]'}`}
              >
                Sí
              </button>
              <button
                onClick={() => setSolvedAlone(false)}
                className={`px-4 py-2 rounded ${solvedAlone === false ? 'bg-amber-500/30 text-amber-400' : 'bg-[var(--surface-2)] text-[var(--text)]'}`}
              >
                No
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Cuál fue tu complejidad temporal?</label>
            <input
              type="text"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              placeholder="Ej: O(n), O(n log n)"
              className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded px-4 py-2 text-sm text-[var(--text)] placeholder-[var(--text-3)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Qué patrón usaste?</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Ej: Two Pointers, Sliding Window"
              className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded px-4 py-2 text-sm text-[var(--text)] placeholder-[var(--text-3)]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onCancel} className="flex-1 py-2 border border-[var(--border)] rounded hover:bg-[var(--surface-2)] text-[var(--text)]">
            Cancelar
          </button>
          <button
            onClick={() => onResolve({ solvedAlone: solvedAlone ?? false, complexity, pattern })}
            className="flex-1 py-2 bg-emerald-500 rounded hover:bg-emerald-600 font-medium"
          >
            Marcar completado
          </button>
        </div>
      </div>
    </div>
  );
}
