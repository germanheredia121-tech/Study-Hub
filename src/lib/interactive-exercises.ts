/**
 * Ejercicios interactivos in-browser
 * Según ejerciciosinteractivos.txt
 */

export interface ExerciseTest {
  description: string;
  getInput: () => unknown;
  getExpected: () => unknown;
  run: (fn: (...args: unknown[]) => unknown) => unknown;
}

export interface InteractiveExercise {
  id: string;
  concept: string;
  title: string;
  description: string;
  exampleInput: string;
  exampleOutput: string;
  initialCode: string;
  functionName: string;
  hint: string;
  tests: ExerciseTest[];
  successMessage: string;
  complexityNote: string;
  /** Si existe, usa este wrapper en vez de retornar functionName. Para ejercicios que exportan múltiples cosas. */
  customWrap?: (code: string) => string;
}

// Helper para comparar resultados (incluyendo objetos/arrays)
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    if (keysA.length !== keysB.length) return false;
    for (const k of keysA) {
      if (!keysB.includes(k)) return false;
      if (!deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k])) return false;
    }
    return true;
  }
  return false;
}

export const INTERACTIVE_EXERCISES: InteractiveExercise[] = [
  {
    id: 'scope-bug',
    concept: 'var vs let vs const',
    title: 'Arreglá el scope bug',
    description: 'Este código debería imprimir 0, 1, 2 pero imprime 3, 3, 3. Cambiá UNA sola palabra para que funcione correctamente.',
    exampleInput: 'arreglarScope()',
    exampleOutput: '[0, 1, 2]',
    initialCode: `function arreglarScope() {
  const result = []
  for (var i = 0; i < 3; i++) {
    result.push(() => i)
  }
  return result.map(fn => fn())
}`,
    functionName: 'arreglarScope',
    hint: '¿Qué diferencia de scope tiene var vs let?',
    tests: [
      {
        description: 'Retorna [0, 1, 2]',
        getInput: () => [],
        getExpected: () => [0, 1, 2],
        run: (fn) => (fn as () => number[])(),
      },
    ],
    successMessage: '¡Correcto!',
    complexityNote: 'O(n) tiempo, O(n) espacio. Cada closure captura su propio i gracias al scope de bloque de let.',
  },
  {
    id: 'map-filter-reduce',
    concept: 'map, filter, reduce',
    title: 'Reemplazá el for loop',
    description: 'Reescribí esta función usando SOLO métodos de array (map, filter, reduce). Sin for loops, sin forEach. Debe devolver la suma de los cuadrados de los números pares.',
    exampleInput: 'sumaParesAlCuadrado([1,2,3,4,5])',
    exampleOutput: '20',
    initialCode: `function sumaParesAlCuadrado(arr) {
  // hint: filter → map → reduce
}`,
    functionName: 'sumaParesAlCuadrado',
    hint: 'Encadenás los tres métodos uno tras otro. filter primero, después map, después reduce.',
    tests: [
      { description: 'Caso básico [1,2,3,4,5] → 20', getInput: () => [1, 2, 3, 4, 5], getExpected: () => 20, run: (fn) => (fn as (a: number[]) => number)([1, 2, 3, 4, 5]) },
      { description: 'Solo impares [1,3,5] → 0', getInput: () => [1, 3, 5], getExpected: () => 0, run: (fn) => (fn as (a: number[]) => number)([1, 3, 5]) },
      { description: 'Un solo par [2] → 4', getInput: () => [2], getExpected: () => 4, run: (fn) => (fn as (a: number[]) => number)([2]) },
      { description: 'Array vacío [] → 0', getInput: () => [], getExpected: () => 0, run: (fn) => (fn as (a: number[]) => number)([]) },
    ],
    successMessage: '¡Correcto!',
    complexityNote: 'O(n) tiempo, O(n) espacio. Tres pasadas sobre el array (filter, map, reduce) pero cada elemento se procesa una vez por pasada.',
  },
  {
    id: 'async-await',
    concept: 'async/await',
    title: 'Convertí callbacks a async/await',
    description: 'Esta función usa callbacks anidados (callback hell). Reescribila usando async/await. La lógica debe ser idéntica: fetch user → fetch posts del user → retornar { user, posts }',
    exampleInput: 'getUserWithPosts(1)',
    exampleOutput: '{ user: {id:1, name:\'Juan\'}, posts: [...] }',
    initialCode: `const fetchUser = (id) => Promise.resolve({ id, name: 'Juan' })
const fetchPosts = (userId) => Promise.resolve([{ id: 1, userId, title: 'Post 1' }])

async function getUserWithPosts(userId) {
  // 1. obtener el usuario
  // 2. obtener sus posts
  // 3. retornar { user, posts }
}`,
    functionName: 'getUserWithPosts',
    hint: 'await pausa la ejecución hasta que la Promise se resuelve. Guardás el resultado en una variable.',
    tests: [
      {
        description: 'Retorna user y posts correctos',
        getInput: () => 1,
        getExpected: () => ({ user: { id: 1, name: 'Juan' }, posts: [{ id: 1, userId: 1, title: 'Post 1' }] }),
        run: async (fn) => await (fn as (id: number) => Promise<unknown>)(1),
      },
    ],
    successMessage: '¡Correcto!',
    complexityNote: 'O(1) en tiempo (dos awaits secuenciales). El código es lineal y legible vs callbacks anidados.',
  },
  {
    id: 'closures-counter',
    concept: 'Closures',
    title: 'Creá un contador con closure',
    description: 'Implementá makeCounter() que retorna un objeto con tres métodos: increment(), decrement() y getCount(). Cada instancia debe tener su propio estado independiente.',
    exampleInput: 'makeCounter(), c.increment(), c.getCount()',
    exampleOutput: '2 (después de dos increment)',
    initialCode: `function makeCounter(initialValue = 0) {
  // el estado vive acá adentro (closure)
  
  return {
    increment() {
      // tu código
    },
    decrement() {
      // tu código  
    },
    getCount() {
      // tu código
    }
  }
}`,
    functionName: 'makeCounter',
    hint: 'La variable de estado se declara en makeCounter, no en los métodos. Los métodos la "cierran" (close over).',
    tests: [
      {
        description: 'increment x2, getCount → 2',
        getInput: () => null,
        getExpected: () => 2,
        run: (fn) => {
          const c = (fn as (v?: number) => { increment: () => void; getCount: () => number })(0);
          c.increment();
          c.increment();
          return c.getCount();
        },
      },
      {
        description: 'decrement, getCount → 1',
        getInput: () => null,
        getExpected: () => 1,
        run: (fn) => {
          const c = (fn as (v?: number) => { increment: () => void; decrement: () => void; getCount: () => number })(0);
          c.increment();
          c.increment();
          c.decrement();
          return c.getCount();
        },
      },
      {
        description: 'makeCounter(10), getCount → 10',
        getInput: () => null,
        getExpected: () => 10,
        run: (fn) => {
          const c2 = (fn as (v?: number) => { getCount: () => number })(10);
          return c2.getCount();
        },
      },
      {
        description: 'Instancias independientes',
        getInput: () => null,
        getExpected: () => 1,
        run: (fn) => {
          const c = (fn as (v?: number) => { increment: () => void; decrement: () => void; getCount: () => number })(0);
          c.increment();
          c.increment();
          c.decrement();
          const c2 = (fn as (v?: number) => { increment: () => void; getCount: () => number })(10);
          c2.increment();
          return c.getCount();
        },
      },
    ],
    successMessage: '¡Correcto!',
    complexityNote: 'O(1) por operación. Cada instancia tiene su propio closure con su variable count.',
  },
  {
    id: 'types-object',
    concept: 'Interfaces vs Types',
    title: 'Completá la estructura del objeto',
    description: 'Completá el objeto user para que tenga la estructura correcta: id (number), name (string), email (string), role (\'admin\' | \'user\' | \'guest\'), address con street, city, country (opcional).',
    exampleInput: 'greet(user)',
    exampleOutput: '"Hola Germán, sos admin"',
    initialCode: `const user = {
  id: 1,
  name: 'Germán',
  email: 'german@test.com',
  role: 'user',  // completá: debe ser 'admin' | 'user' | 'guest'
  address: {
    street: 'Av. Córdoba 1234',
    city: 'Córdoba',
    country: 'Argentina'
  }
}

function greet(user) {
  return \`Hola \${user.name}, sos \${user.role}\`
}`,
    functionName: 'greet',
    hint: 'Role debe ser \'admin\' | \'user\' | \'guest\'. Address es un objeto con street, city, country.',
    customWrap: (code) => `${code}; return typeof greet === 'function' && typeof user !== 'undefined' ? greet(user) : null;`,
    tests: [
      {
        description: 'greet(user) retorna "Hola Germán, sos admin"',
        getInput: () => null,
        getExpected: () => 'Hola Germán, sos admin',
        run: (fn) => (typeof fn === 'function' ? fn() : fn) as string,
      },
    ],
    successMessage: '¡Correcto!',
    complexityNote: 'La estructura de datos bien definida evita bugs en runtime.',
  },
  {
    id: 'generics-getfirst',
    concept: 'Generics',
    title: 'Implementá una función genérica',
    description: 'Implementá la función getFirst que recibe un array de cualquier tipo y retorna el primer elemento, o undefined si está vacío.',
    exampleInput: 'getFirst([1, 2, 3])',
    exampleOutput: '1',
    initialCode: `function getFirst(arr) {
  // tu código
}`,
    functionName: 'getFirst',
    hint: 'La firma es getFirst(arr). Retorná arr[0] o undefined si arr está vacío.',
    tests: [
      { description: 'getFirst([1,2,3]) → 1', getInput: () => [1, 2, 3], getExpected: () => 1, run: (fn) => (fn as (a: number[]) => number)([1, 2, 3]) },
      { description: 'getFirst([\'a\',\'b\']) → \'a\'', getInput: () => ['a', 'b'], getExpected: () => 'a', run: (fn) => (fn as (a: string[]) => string)(['a', 'b']) },
      { description: 'getFirst([]) → undefined', getInput: () => [], getExpected: () => undefined, run: (fn) => (fn as (a: unknown[]) => unknown)([]) },
      { description: 'getFirst([true, false]) → true', getInput: () => [true, false], getExpected: () => true, run: (fn) => (fn as (a: boolean[]) => boolean)([true, false]) },
    ],
    successMessage: '¡Correcto!',
    complexityNote: 'O(1) tiempo y espacio. Acceso directo al primer elemento.',
  },
];

// Módulos que tienen ejercicios interactivos
export const MODULE_EXERCISES: Record<string, string[]> = {
  fs1: ['scope-bug', 'map-filter-reduce', 'async-await', 'closures-counter'],
  fs2: ['types-object', 'generics-getfirst'],
};

export function getExercisesForModule(moduleId: string): InteractiveExercise[] {
  const ids = MODULE_EXERCISES[moduleId];
  if (!ids) return [];
  return ids
    .map((id) => INTERACTIVE_EXERCISES.find((e) => e.id === id))
    .filter((e): e is InteractiveExercise => !!e);
}

const STORAGE_KEY = 'studyhub-interactive-exercises';

export function getCompletedExercises(moduleId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
    return data[moduleId] ?? [];
  } catch {
    return [];
  }
}

export function saveExerciseCompleted(moduleId: string, exerciseId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
    const list = data[moduleId] ?? [];
    if (!list.includes(exerciseId)) {
      list.push(exerciseId);
      data[moduleId] = list;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch {
    // ignore
  }
}

export async function runExerciseTests(
  code: string,
  exercise: InteractiveExercise
): Promise<{ passed: number; total: number; results: { description: string; passed: boolean; expected?: unknown; got?: unknown; error?: string }[] }> {
  const results: { description: string; passed: boolean; expected?: unknown; got?: unknown; error?: string }[] = [];
  let fn: (...args: unknown[]) => unknown;

  try {
    const wrappedCode = exercise.customWrap
      ? exercise.customWrap(code)
      : `
      ${code}
      if (typeof ${exercise.functionName} !== 'undefined') {
        return ${exercise.functionName};
      }
      throw new Error('La función ${exercise.functionName} no está definida');
    `;
    const result = new Function(wrappedCode)();
    fn = typeof result === 'function' ? result : () => result;
  } catch (err) {
    return {
      passed: 0,
      total: exercise.tests.length,
      results: exercise.tests.map((t) => ({
        description: t.description,
        passed: false,
        error: err instanceof Error ? err.message : String(err),
      })),
    };
  }

  let passed = 0;
  for (const test of exercise.tests) {
    try {
      const result = await Promise.resolve(test.run(fn));
      const expected = test.getExpected();
      const isPass = deepEqual(result, expected);
      if (isPass) passed++;
      results.push({
        description: test.description,
        passed: isPass,
        expected: isPass ? undefined : expected,
        got: isPass ? undefined : result,
      });
    } catch (err) {
      results.push({
        description: test.description,
        passed: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return { passed, total: exercise.tests.length, results };
}
