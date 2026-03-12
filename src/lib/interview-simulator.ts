/**
 * Simulador de Entrevista — Banco de problemas por empresa
 * Según simularentrevista.txt
 */

export type InterviewType = 'junior' | 'semi-senior';
export type Company = 'naranja-x' | 'globant' | 'mercadolibre' | 'generica';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export interface InterviewProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  description: string;
  examples: { input: string; output: string }[];
  constraints: string[];
  functionName: string;
  initialCode?: string;
  /** Tests básicos (ejemplos del enunciado) — se muestran al testear */
  basicTests: { input: unknown[]; expected: unknown }[];
  /** Tests ocultos (edge cases) — solo al entregar */
  hiddenTests: { input: unknown[]; expected: unknown }[];
  optimalSolution: string;
  optimalComplexity: string;
  feedbackPoints: { type: 'positive' | 'warning' | 'negative'; text: string }[];
  suggestedModule?: string;
}

export const INTERVIEW_DURATIONS: Record<InterviewType, number> = {
  junior: 25,
  'semi-senior': 40,
};

export const COMPANIES: { id: Company; name: string }[] = [
  { id: 'naranja-x', name: 'Naranja X' },
  { id: 'globant', name: 'Globant' },
  { id: 'mercadolibre', name: 'Mercado Libre' },
  { id: 'generica', name: 'Genérica' },
];

// ========== NARANJA X ==========
const NARANJA_X_PROBLEMS: InterviewProblem[] = [
  {
    id: 'nx-promo',
    title: 'Mejor momento para aplicar promoción',
    difficulty: 'medium',
    durationMinutes: 25,
    description: `Calculá el mejor momento para aplicar una promoción de descuento dado el historial de transacciones de un usuario.

Dado un array de precios (representando transacciones diarias) y un descuento fijo D, encontrá el par (día_compra, día_venta) que maximiza la ganancia después del descuento. La ganancia es: precio[venta] - precio[compra] - D.

Retorná [índice_compra, índice_venta] o [] si no hay ganancia posible.`,
    examples: [
      { input: 'precios = [7, 1, 5, 3, 6, 4], D = 2', output: '[1, 4] → ganancia 6-1-2 = 3' },
      { input: 'precios = [7, 6, 4, 3, 1], D = 1', output: '[] → no hay ganancia' },
    ],
    constraints: ['1 ≤ precios.length ≤ 10⁴', '0 ≤ precios[i] ≤ 10⁶', '0 ≤ D ≤ 10⁶'],
    functionName: 'mejorMomentoPromo',
    basicTests: [
      { input: [[7, 1, 5, 3, 6, 4], 2], expected: [1, 4] },
      { input: [[7, 6, 4, 3, 1], 1], expected: [] },
    ],
    hiddenTests: [
      { input: [[1, 2], 0], expected: [0, 1] },
      { input: [[5, 5, 5], 1], expected: [] },
      { input: [[3, 2, 6, 5, 0, 3], 2], expected: [1, 2] },
    ],
    optimalSolution: `function mejorMomentoPromo(precios, D) {
  let minIdx = 0;
  let maxProfit = -D;
  let best = [];
  for (let i = 1; i < precios.length; i++) {
    const profit = precios[i] - precios[minIdx] - D;
    if (profit > maxProfit && profit > 0) {
      maxProfit = profit;
      best = [minIdx, i];
    }
    if (precios[i] < precios[minIdx]) minIdx = i;
  }
  return best;
}
// O(n) tiempo, O(1) espacio`,
    optimalComplexity: 'O(n) tiempo, O(1) espacio',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'warning', text: 'Tu solución es O(n²) — en producción con 10⁶ elementos esto es inaceptable' },
      { type: 'positive', text: 'Manejaste el caso borde del array vacío' },
    ],
    suggestedModule: 'Hash Maps & Sets',
    initialCode: `function mejorMomentoPromo(precios, D) {
  // tu código acá
  return [];
}`,
  },
  {
    id: 'nx-extracto',
    title: 'Extracto bancario y duplicados',
    difficulty: 'easy',
    durationMinutes: 25,
    description: `Dado un extracto bancario como array de transacciones (objetos con { id, monto }), retorná un objeto con:
- saldo: suma de todos los montos
- tieneDuplicados: true si hay transacciones con el mismo id

Los montos pueden ser positivos (ingresos) o negativos (egresos).`,
    examples: [
      { input: '[{id:1,monto:100},{id:2,monto:-30},{id:1,monto:50}]', output: '{ saldo: 120, tieneDuplicados: true }' },
      { input: '[{id:1,monto:10},{id:2,monto:-5}]', output: '{ saldo: 5, tieneDuplicados: false }' },
    ],
    constraints: ['1 ≤ transacciones.length ≤ 10⁴', 'Solo números enteros'],
    functionName: 'procesarExtracto',
    basicTests: [
      { input: [[{ id: 1, monto: 100 }, { id: 2, monto: -30 }, { id: 1, monto: 50 }]], expected: { saldo: 120, tieneDuplicados: true } },
      { input: [[{ id: 1, monto: 10 }, { id: 2, monto: -5 }]], expected: { saldo: 5, tieneDuplicados: false } },
    ],
    hiddenTests: [
      { input: [[]], expected: { saldo: 0, tieneDuplicados: false } },
      { input: [[{ id: 1, monto: 0 }]], expected: { saldo: 0, tieneDuplicados: false } },
    ],
    optimalSolution: `function procesarExtracto(transacciones) {
  const ids = new Set();
  let saldo = 0;
  let tieneDuplicados = false;
  for (const t of transacciones) {
    saldo += t.monto;
    if (ids.has(t.id)) tieneDuplicados = true;
    ids.add(t.id);
  }
  return { saldo, tieneDuplicados };
}
// O(n) tiempo, O(n) espacio`,
    optimalComplexity: 'O(n) tiempo, O(n) espacio',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'positive', text: 'Manejaste el caso borde del array vacío' },
    ],
    initialCode: `function procesarExtracto(transacciones) {
  // retorná { saldo, tieneDuplicados }
  return { saldo: 0, tieneDuplicados: false };
}`,
  },
  {
    id: 'nx-turnos',
    title: 'Sistema de turnos con prioridad VIP',
    difficulty: 'medium',
    durationMinutes: 25,
    description: `Implementá un sistema de turnos (queue) para una cola de atención con prioridad VIP.

Creá una clase TurnosQueue con:
- enqueue(id, isVip): agrega a la cola. Los VIP van al frente de los no-VIP.
- dequeue(): saca y retorna el próximo id. Si no hay, retorna null.
- size(): cantidad en cola`,
    examples: [
      { input: 'enqueue(1,false), enqueue(2,true), enqueue(3,false), dequeue()', output: '2 (VIP primero)' },
    ],
    constraints: ['Dentro de VIP y no-VIP, orden FIFO'],
    functionName: 'TurnosQueue',
    basicTests: [
      {
        input: [],
        expected: null,
      },
    ],
    hiddenTests: [],
    optimalSolution: `class TurnosQueue {
  constructor() {
    this.vip = [];
    this.normal = [];
  }
  enqueue(id, isVip) {
    (isVip ? this.vip : this.normal).push(id);
  }
  dequeue() {
    if (this.vip.length) return this.vip.shift();
    if (this.normal.length) return this.normal.shift();
    return null;
  }
  size() {
    return this.vip.length + this.normal.length;
  }
}`,
    optimalComplexity: 'O(1) amortizado por operación',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'warning', text: 'shift() es O(n) — considerá linked list para producción' },
    ],
    suggestedModule: 'Stacks & Queues',
  },
];

// ========== GLOBANT ==========
const GLOBANT_PROBLEMS: InterviewProblem[] = [
  {
    id: 'gb-lru',
    title: 'LRU Cache simplificado',
    difficulty: 'medium',
    durationMinutes: 40,
    description: `Implementá un sistema de caché LRU simplificado.

Creá una clase LRUCache(capacity) con:
- get(key): retorna el valor o -1 si no existe. Actualiza "recientemente usado".
- put(key, value): inserta o actualiza. Si supera capacity, elimina el menos recientemente usado.`,
    examples: [
      { input: 'capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)', output: '1, -1 (2 fue evictado)' },
    ],
    constraints: ['1 ≤ capacity ≤ 3000', '0 ≤ key, value ≤ 10⁴'],
    functionName: 'LRUCache',
    basicTests: [],
    hiddenTests: [],
    optimalSolution: `// HashMap + Doubly Linked List para O(1) get/put
// Ver módulo Hash Maps & Sets`,
    optimalComplexity: 'O(1) get y put',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'warning', text: 'Tu solución es O(n) para get/put — LRU real requiere O(1)' },
    ],
    suggestedModule: 'Hash Maps & Sets',
  },
  {
    id: 'gb-react-tree',
    title: 'Componentes React que usan un hook',
    difficulty: 'medium',
    durationMinutes: 40,
    description: `Dado un árbol de componentes React representado como objeto anidado:
{ name: string, hooks: string[], children: [...] }
Encontrá todos los nombres de componentes que usan un determinado hook.`,
    examples: [
      { input: 'árbol con App->Header,Body. Body usa useState. Buscar "useState"', output: '["Body"]' },
    ],
    constraints: ['DFS o BFS'],
    functionName: 'findComponentsWithHook',
    basicTests: [],
    hiddenTests: [],
    optimalSolution: `function findComponentsWithHook(tree, hookName) {
  const result = [];
  function dfs(node) {
    if (node.hooks?.includes(hookName)) result.push(node.name);
    node.children?.forEach(dfs);
  }
  dfs(tree);
  return result;
}`,
    optimalComplexity: 'O(n) con n nodos',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'positive', text: 'DFS aplicado correctamente' },
    ],
    suggestedModule: 'Trees & BST',
  },
  {
    id: 'gb-event-emitter',
    title: 'Event Emitter simplificado',
    difficulty: 'hard',
    durationMinutes: 40,
    description: `Diseñá e implementá un event emitter simplificado con:
- on(event, callback): registra callback
- off(event, callback): remueve callback
- emit(event, ...args): ejecuta todos los callbacks registrados para el event`,
    examples: [
      { input: 'on("click", f), emit("click", 1) → f(1)', output: 'callback ejecutado' },
    ],
    constraints: ['Mismo callback puede estar en múltiples eventos'],
    functionName: 'EventEmitter',
    basicTests: [],
    hiddenTests: [],
    optimalSolution: `class EventEmitter {
  constructor() { this.events = {}; }
  on(event, cb) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(cb);
  }
  off(event, cb) {
    this.events[event] = (this.events[event] || []).filter(f => f !== cb);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(cb => cb(...args));
  }
}`,
    optimalComplexity: 'O(k) emit con k callbacks',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
    ],
  },
];

// ========== MERCADO LIBRE ==========
const MERCADOLIBRE_PROBLEMS: InterviewProblem[] = [
  {
    id: 'ml-catalogo',
    title: 'Búsqueda en catálogo con categorías anidadas',
    difficulty: 'medium',
    durationMinutes: 40,
    description: `Dado un catálogo de productos con categorías anidadas:
{ id, name, category: { id, name, parent?: category } }
Implementá una búsqueda por nombre que devuelva el path completo de categorías para cada producto que matchee.`,
    examples: [
      { input: 'Buscar "iPhone" en catálogo', output: '[["Electrónica","Celulares"]]' },
    ],
    constraints: ['Búsqueda case-insensitive', 'Path desde raíz hasta hoja'],
    functionName: 'buscarConPath',
    basicTests: [],
    hiddenTests: [],
    optimalSolution: `// DFS construyendo path, filtrar por nombre`,
    optimalComplexity: 'O(n)',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
    ],
    suggestedModule: 'Trees & BST',
  },
  {
    id: 'ml-rate-limit',
    title: 'Sistema de rate limiting',
    difficulty: 'hard',
    durationMinutes: 40,
    description: `Implementá un sistema de rate limiting que permita X requests por minuto por usuario.

Creá RateLimiter(limitPerMinute) con:
- allow(userId): retorna true si el request está permitido, false si excedió el límite.`,
    examples: [
      { input: 'limit=2, allow("u1"), allow("u1"), allow("u1")', output: 'true, true, false' },
    ],
    constraints: ['Ventana deslizante de 60 segundos'],
    functionName: 'RateLimiter',
    basicTests: [],
    hiddenTests: [],
    optimalSolution: `// Map<userId, queue de timestamps>. Limpiar los > 60s viejos.`,
    optimalComplexity: 'O(1) amortizado',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
    ],
  },
  {
    id: 'ml-ordenes',
    title: 'Maximizar revenue de órdenes',
    difficulty: 'hard',
    durationMinutes: 40,
    description: `Dada una lista de órdenes { id, revenue, peso } y capacidad máxima de envío diaria, encontrá el subset de órdenes que maximiza el revenue sin superar la capacidad.`,
    examples: [
      { input: 'Órdenes: [{r:10,p:5},{r:20,p:10}], capacidad=10', output: '20 (solo la segunda)' },
    ],
    constraints: ['Variante de Knapsack 0/1'],
    functionName: 'maxRevenue',
    basicTests: [],
    hiddenTests: [],
    optimalSolution: `// DP Knapsack. Ver módulo Dynamic Programming`,
    optimalComplexity: 'O(n * capacidad)',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'warning', text: 'Sin DP es O(2^n) — inaceptable para n grande' },
    ],
    suggestedModule: 'Dynamic Programming',
  },
];

// ========== GENÉRICA — Problemas del track DSA ==========
const GENERICA_PROBLEMS: InterviewProblem[] = [
  {
    id: 'gen-two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    durationMinutes: 25,
    description: `Dado un array de enteros nums y un target, retorná los índices de los dos números que suman target. Asumí que existe exactamente una solución.`,
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', 'Un solo par válido'],
    functionName: 'twoSum',
    basicTests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
    ],
    hiddenTests: [
      { input: [[3, 3], 6], expected: [0, 1] },
      { input: [[0, 4, 3, 0], 0], expected: [0, 3] },
    ],
    optimalSolution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
// O(n) tiempo, O(n) espacio`,
    optimalComplexity: 'O(n) tiempo, O(n) espacio',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'warning', text: 'Tu solución es O(n²) — HashMap baja a O(n)' },
    ],
    suggestedModule: 'Hash Maps & Sets',
    initialCode: `function twoSum(nums, target) {
  // retorná [i, j] tal que nums[i] + nums[j] === target
  return [];
}`,
  },
  {
    id: 'gen-valid-parens',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    durationMinutes: 25,
    description: `Dado un string s con paréntesis '()', '[]', '{}', determiná si está bien formado. Cada apertura debe cerrarse en orden correcto.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "([)]"', output: 'false' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁴', 'Solo ( ) [ ] { }'],
    functionName: 'isValid',
    basicTests: [
      { input: ['()'], expected: true },
      { input: ['([)]'], expected: false },
    ],
    hiddenTests: [
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false },
      { input: ['((('], expected: false },
    ],
    optimalSolution: `function isValid(s) {
  const stack = [];
  const map = { '(': ')', '[': ']', '{': '}' };
  for (const c of s) {
    if (map[c]) stack.push(map[c]);
    else if (stack.pop() !== c) return false;
  }
  return stack.length === 0;
}
// O(n) tiempo, O(n) espacio`,
    optimalComplexity: 'O(n) tiempo, O(n) espacio',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'positive', text: 'Manejaste el caso borde del string vacío' },
    ],
    suggestedModule: 'Stacks & Queues',
    initialCode: `function isValid(s) {
  // retorná true si los paréntesis están bien formados
  return false;
}`,
  },
  {
    id: 'gen-max-profit',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    durationMinutes: 25,
    description: `Dado un array de precios donde precios[i] es el precio de una acción el día i, encontrá la máxima ganancia comprando un día y vendiendo otro posterior.`,
    examples: [
      { input: 'precios = [7, 1, 5, 3, 6, 4]', output: '5 (compra 1, vende 6)' },
      { input: 'precios = [7, 6, 4, 3, 1]', output: '0' },
    ],
    constraints: ['1 ≤ precios.length ≤ 10⁵', '0 ≤ precios[i] ≤ 10⁴'],
    functionName: 'maxProfit',
    basicTests: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
    ],
    hiddenTests: [
      { input: [[1, 2]], expected: 1 },
      { input: [[2, 1]], expected: 0 },
    ],
    optimalSolution: `function maxProfit(prices) {
  let minSoFar = Infinity;
  let maxProfit = 0;
  for (const p of prices) {
    minSoFar = Math.min(minSoFar, p);
    maxProfit = Math.max(maxProfit, p - minSoFar);
  }
  return maxProfit;
}
// O(n) tiempo, O(1) espacio`,
    optimalComplexity: 'O(n) tiempo, O(1) espacio',
    feedbackPoints: [
      { type: 'positive', text: 'Llegaste a una solución funcional' },
      { type: 'warning', text: 'Tu solución es O(n²) — un solo pass con minSoFar alcanza O(n)' },
    ],
    suggestedModule: 'Arrays & Strings',
    initialCode: `function maxProfit(prices) {
  // retorná la máxima ganancia comprando y vendiendo
  return 0;
}`,
  },
];

export function getProblemsByCompany(company: Company): InterviewProblem[] {
  switch (company) {
    case 'naranja-x':
      return NARANJA_X_PROBLEMS;
    case 'globant':
      return GLOBANT_PROBLEMS;
    case 'mercadolibre':
      return MERCADOLIBRE_PROBLEMS;
    case 'generica':
      return GENERICA_PROBLEMS;
    default:
      return [];
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a as object).sort();
    const kb = Object.keys(b as object).sort();
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return false;
}

export function runInterviewTests(
  code: string,
  problem: InterviewProblem,
  basicOnly: boolean
): { passed: number; total: number; results: { passed: boolean; expected?: unknown; got?: unknown }[] } {
  let fn: (...args: unknown[]) => unknown;
  try {
    const wrapped = `
      ${code}
      if (typeof ${problem.functionName} !== 'undefined') return ${problem.functionName};
      throw new Error('La función ${problem.functionName} no está definida');
    `;
    fn = new Function(wrapped)();
  } catch (err) {
    return {
      passed: 0,
      total: basicOnly ? problem.basicTests.length : problem.basicTests.length + problem.hiddenTests.length,
      results: [],
    };
  }
  const tests = basicOnly ? problem.basicTests : [...problem.basicTests, ...problem.hiddenTests];
  const results: { passed: boolean; expected?: unknown; got?: unknown }[] = [];
  let passed = 0;
  for (const t of tests) {
    try {
      const got = (fn as (...args: unknown[]) => unknown)(...t.input);
      const ok = deepEqual(got, t.expected);
      if (ok) passed++;
      results.push({ passed: ok, expected: t.expected, got: ok ? undefined : got });
    } catch {
      results.push({ passed: false, expected: t.expected });
    }
  }
  return { passed, total: tests.length, results };
}

export function getRandomProblem(
  company: Company,
  difficulty: Difficulty
): InterviewProblem | null {
  const companyProblems = getProblemsByCompany(company);
  if (companyProblems.length === 0) return null;
  const filtered =
    difficulty === 'mixed'
      ? companyProblems
      : companyProblems.filter((p) => p.difficulty === difficulty);
  const pool = filtered.length > 0 ? filtered : companyProblems;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}
