/**
 * LeetCode Challenge — 35 ejercicios completos con hints progresivos y soluciones
 * Según promptejercicios.txt y prompdetalleejercicios.txt
 */

export type LeetCodeDifficulty = 'easy' | 'medium' | 'hard';

export interface PatternReminder {
  name: string;
  module: string;
  whenToUse: string;
  keywords: string;
  template: string;
}

export interface LeetCodeExercise {
  id: number;
  number: number;
  name: string;
  leetcodeSlug: string;
  difficulty: LeetCodeDifficulty;
  module: string;
  tip: string;
  pattern: string;
  patternReminder: PatternReminder;
  hints: [string, string, string, string];
  solution: {
    timeComplexity: string;
    spaceComplexity: string;
    patternUsed: string;
    code: string;
    commonErrors: string[];
    relatedProblems: string[];
  };
}

export const LEETCODE_LAST_THEORETICAL_MODULE = 'hard_complete';

export const LEETCODE_EXERCISES: LeetCodeExercise[] = [
  // ========== EASY 1-15 ==========
  {
    id: 1,
    number: 1,
    name: 'Two Sum',
    leetcodeSlug: 'two-sum',
    difficulty: 'easy',
    module: 'Arrays & Strings',
    tip: 'Pensá en complementos — ¿qué estructura te da búsqueda O(1)?',
    pattern: 'HashMap/HashSet',
    patternReminder: {
      name: 'HashMap/HashSet',
      module: 'Hash Maps & Sets',
      whenToUse: 'Frecuencia, complementos, duplicados en O(1). Cuando necesitás saber "¿ya vi este valor?" o "¿existe target - actual?" en O(1).',
      keywords: '"complemento", "par que suma", "duplicados", "frecuencia"',
      template: 'const map = new Map();\nfor (const x of arr) {\n  const complement = target - x;\n  if (map.has(complement)) return [map.get(complement), i];\n  map.set(x, i);\n}',
    },
    hints: [
      'Fuerza bruta: dos loops anidados O(n²). Para cada elemento, buscás su complemento (target - actual). ¿Qué estructura te da esa búsqueda en O(1)?',
      'Un HashMap guarda valor → índice. Si en el paso actual tenés el complemento ya guardado, encontraste el par. En un solo pass.',
      'El orden importa: primero guardás el elemento actual después de verificar. Así no usás el mismo elemento dos veces.',
      'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (________) return [________, i];\n    map.set(________, ________);\n  }\n  return [];\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — un solo pass.',
      spaceComplexity: 'O(n) — HashMap para el peor caso.',
      patternUsed: 'HashMap para complementos',
      code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}`,
      commonErrors: [
        'Guardar antes de verificar: si guardás primero, podés matchear el mismo elemento consigo mismo.',
        'Devolver índices en orden incorrecto: [map.get(complement), i] es el orden correcto.',
        'No considerar que el complemento puede estar antes en el array.',
      ],
      relatedProblems: ['#15 3Sum', '#217 Contains Duplicate', '#347 Top K Frequent Elements'],
    },
  },
  {
    id: 2,
    number: 20,
    name: 'Valid Parentheses',
    leetcodeSlug: 'valid-parentheses',
    difficulty: 'easy',
    module: 'Stacks & Queues',
    tip: 'Cada apertura espera su cierre — ¿qué estructura respeta ese orden?',
    pattern: 'Stack',
    patternReminder: {
      name: 'Stack',
      module: 'Stacks & Queues',
      whenToUse: 'LIFO: lo último que abrís es lo primero que cerra. Paréntesis, validación de anidamiento.',
      keywords: '"paréntesis", "anidado", "último", "LIFO"',
      template: 'const stack = [];\nfor (const c of s) {\n  if (c === "(") stack.push(")");\n  else if (stack.pop() !== c) return false;\n}\nreturn stack.length === 0;',
    },
    hints: [
      'Fuerza bruta: contar aperturas y cierres no alcanza. "( [ ) ]" tiene igual cantidad pero es inválido. El orden importa.',
      'Cuando ves una apertura, esperás su cierre. ¿Qué estructura guarda "lo que espero" en orden LIFO?',
      'Mapeá cada apertura a su cierre: (→), [→], {→}. Al ver apertura, pusheá el cierre esperado. Al ver cierre, pop debe coincidir.',
      'function isValid(s) {\n  const stack = [];\n  const map = { "(": ")", "[": "]", "{": "}" };\n  for (const c of s) {\n    if (map[c]) stack.push(________);\n    else if (stack.pop() !== ________) return false;\n  }\n  return ________;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — un pass por cada caracter.',
      spaceComplexity: 'O(n) — stack en el peor caso (todo aperturas).',
      patternUsed: 'Stack para validar anidamiento',
      code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { '(': ')', '[': ']', '{': '}' };
  for (const c of s) {
    if (map[c]) stack.push(map[c]);
    else if (stack.pop() !== c) return false;
  }
  return stack.length === 0;
}`,
      commonErrors: [
        'No verificar stack vacío al final: "(((" debería ser false.',
        'Confundir el orden: el cierre que esperás es el del último que abriste.',
        'No considerar string vacío: "" es válido.',
      ],
      relatedProblems: ['#155 Min Stack', '#394 Decode String', '#22 Generate Parentheses'],
    },
  },
  {
    id: 3,
    number: 21,
    name: 'Merge Two Sorted Lists',
    leetcodeSlug: 'merge-two-sorted-lists',
    difficulty: 'easy',
    module: 'Linked Lists',
    tip: 'Dos punteros avanzando en paralelo, elegís el menor en cada paso',
    pattern: 'Two Pointers',
    patternReminder: {
      name: 'Two Pointers',
      module: 'Arrays & Strings',
      whenToUse: 'Array ordenado, suma de pares, palíndromos. Dos índices que se mueven según una condición.',
      keywords: '"sorted", "par", "palíndromo", "dos punteros"',
      template: 'let left = 0, right = n - 1;\nwhile (left < right) {\n  const sum = arr[left] + arr[right];\n  if (sum === target) return [left, right];\n  if (sum < target) left++; else right--;\n}',
    },
    hints: [
      'Fuerza bruta: crear array nuevo, mergear y reconstruir lista. No es necesario — podés ir enlazando nodos.',
      'Compará los heads de ambas listas. El menor va al resultado. Avanzá el puntero de la lista de donde sacaste.',
      'Usá un dummy node para evitar el caso especial del primer nodo. dummy.next será la cabeza real.',
      'function mergeTwoLists(l1, l2) {\n  const dummy = new ListNode(0);\n  let curr = dummy;\n  while (l1 && l2) {\n    if (l1.val <= l2.val) { curr.next = l1; l1 = ________; }\n    else { curr.next = l2; l2 = ________; }\n    curr = ________;\n  }\n  curr.next = ________;\n  return dummy.next;\n}',
    ],
    solution: {
      timeComplexity: 'O(n + m) — cada nodo se visita una vez.',
      spaceComplexity: 'O(1) — solo punteros, in-place.',
      patternUsed: 'Two Pointers en linked lists',
      code: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 ?? l2;
  return dummy.next;
}`,
      commonErrors: [
        'No usar dummy: el primer nodo es un caso especial.',
        'Olvidar enlazar el resto: cuando una lista se acaba, curr.next = la otra.',
        'Comparar con === en vez de <=: el orden puede ser arbitrario.',
      ],
      relatedProblems: ['#23 Merge K Sorted Lists', '#88 Merge Sorted Array', '#2 Add Two Numbers'],
    },
  },
  {
    id: 4,
    number: 121,
    name: 'Best Time to Buy and Sell Stock',
    leetcodeSlug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'easy',
    module: 'Arrays & Strings',
    tip: 'Un solo pass — llevá registro del mínimo visto hasta ahora',
    pattern: 'Two Pointers / Sliding Window',
    patternReminder: {
      name: 'Sliding Window',
      module: 'Arrays & Strings',
      whenToUse: 'Substring, subarray, ventana de tamaño variable. Optimizar O(n²) a O(n).',
      keywords: '"longest", "shortest", "subarray", "substring"',
      template: 'let left = 0;\nfor (let right = 0; right < n; right++) {\n  // expandir\n  while (invalid) left++;\n  // actualizar resultado\n}',
    },
    hints: [
      'Fuerza bruta: para cada día de compra, probá cada día de venta posterior. O(n²).',
      '¿Qué necesitás saber? El mínimo precio hasta ahora (para comprar barato). Si vendés hoy, la ganancia es prices[i] - minSoFar.',
      'Un solo pass: mantené minSoFar y maxProfit. En cada paso: actualizá minSoFar, calculá profit, actualizá maxProfit.',
      'function maxProfit(prices) {\n  let minSoFar = Infinity;\n  let maxProfit = 0;\n  for (const p of prices) {\n    minSoFar = ________;\n    maxProfit = ________;\n  }\n  return maxProfit;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — un pass.',
      spaceComplexity: 'O(1) — solo variables.',
      patternUsed: 'Track mínimo + max diferencia',
      code: `function maxProfit(prices: number[]): number {
  let minSoFar = Infinity;
  let maxProfit = 0;
  for (const p of prices) {
    minSoFar = Math.min(minSoFar, p);
    maxProfit = Math.max(maxProfit, p - minSoFar);
  }
  return maxProfit;
}`,
      commonErrors: [
        'Buscar min y max global: el min debe estar antes del max.',
        'No actualizar minSoFar antes de calcular profit: el orden importa.',
        'Inicializar maxProfit con 0: si no hay ganancia, devolver 0.',
      ],
      relatedProblems: ['#122 Best Time II', '#53 Maximum Subarray', '#121 con múltiples transacciones'],
    },
  },
  {
    id: 5,
    number: 125,
    name: 'Valid Palindrome',
    leetcodeSlug: 'valid-palindrome',
    difficulty: 'easy',
    module: 'Arrays & Strings',
    tip: 'Two pointers desde los extremos, ignorando no-alfanuméricos',
    pattern: 'Two Pointers',
    patternReminder: {
      name: 'Two Pointers',
      module: 'Arrays & Strings',
      whenToUse: 'Array ordenado, suma de pares, palíndromos. Dos índices que se mueven según una condición.',
      keywords: '"sorted", "par", "palíndromo", "dos punteros"',
      template: 'let left = 0, right = n - 1;\nwhile (left < right) {\n  if (arr[left] !== arr[right]) return false;\n  left++; right--;\n}\nreturn true;',
    },
    hints: [
      'Fuerza bruta: filtrar string a solo alfanuméricos, invertir y comparar. O(n) pero extra espacio.',
      'Two pointers: left al inicio, right al final. Si no son alfanuméricos, avanzá. Si son distintos, false.',
      'Creá una función isAlphanumeric(c). O usá: /[a-zA-Z0-9]/.test(c). Convertí a minúscula antes de comparar.',
      'function isPalindrome(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    while (left < right && !isAlphanumeric(s[left])) left++;\n    while (left < right && !isAlphanumeric(s[right])) right--;\n    if (________ !== ________) return false;\n    left++; right--;\n  }\n  return true;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — cada caracter se visita una vez.',
      spaceComplexity: 'O(1) — solo punteros.',
      patternUsed: 'Two Pointers desde extremos',
      code: `function isPalindrome(s: string): boolean {
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++; right--;
  }
  return true;
}
function isAlphanumeric(c: string): boolean {
  return /[a-zA-Z0-9]/.test(c);
}`,
      commonErrors: [
        'No verificar left < right en los inner while: pueden cruzarse.',
        'No convertir a minúscula: "A" y "a" son iguales para palíndromo.',
        'Olvidar el caso string vacío o solo espacios: es válido.',
      ],
      relatedProblems: ['#5 Longest Palindromic Substring', '#680 Valid Palindrome II', '#125 con un delete'],
    },
  },
  {
    id: 6,
    number: 226,
    name: 'Invert Binary Tree',
    leetcodeSlug: 'invert-binary-tree',
    difficulty: 'easy',
    module: 'Trees & BST',
    tip: '¿Podés definir "invertir" en términos de sí mismo?',
    pattern: 'BFS/DFS',
    patternReminder: {
      name: 'BFS/DFS',
      module: 'Trees & BST',
      whenToUse: 'Grafos, árboles, matrices, componentes conectados. DFS recursivo o BFS con queue.',
      keywords: '"tree", "graph", "connected", "traverse"',
      template: 'function dfs(node) {\n  if (!node) return;\n  // procesar\n  dfs(node.left);\n  dfs(node.right);\n}',
    },
    hints: [
      'Fuerza bruta: no hay. Es un árbol, recorés recursivamente.',
      'Invertir un árbol: ¿qué significa? Intercambiar left y right. En cada nodo: swap(left, right).',
      'Recursión: invertir el subárbol izquierdo, invertir el derecho, luego swap. O swap primero y luego recursión.',
      'function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = ________;\n  root.right = ________;\n  invertTree(root.left);\n  invertTree(root.right);\n  return ________;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — cada nodo una vez.',
      spaceComplexity: 'O(h) — altura del árbol para recursión.',
      patternUsed: 'DFS recursivo',
      code: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
}`,
      commonErrors: [
        'No hacer swap: hay que intercambiar ambos hijos.',
        'Recursión después del swap: los hijos ya están intercambiados.',
        'Usar temp en vez de destructuring: ambos funcionan.',
      ],
      relatedProblems: ['#104 Maximum Depth', '#101 Symmetric Tree', '#617 Merge Two Binary Trees'],
    },
  },
  {
    id: 7,
    number: 104,
    name: 'Maximum Depth of Binary Tree',
    leetcodeSlug: 'maximum-depth-of-binary-tree',
    difficulty: 'easy',
    module: 'Trees & BST',
    tip: 'La profundidad es 1 + el máximo de profundidades de los hijos',
    pattern: 'BFS/DFS',
    patternReminder: {
      name: 'BFS/DFS',
      module: 'Trees & BST',
      whenToUse: 'Grafos, árboles, matrices. DFS recursivo o BFS con queue.',
      keywords: '"tree", "graph", "depth", "traverse"',
      template: 'function dfs(node) {\n  if (!node) return 0;\n  return 1 + Math.max(dfs(node.left), dfs(node.right));\n}',
    },
    hints: [
      'Fuerza bruta: BFS nivel por nivel, contando niveles. O DFS con profundidad como parámetro.',
      'Definición recursiva: depth(null) = 0. depth(node) = 1 + max(depth(left), depth(right)).',
      'Es la misma idea que invertir: la respuesta del nodo depende de las respuestas de los hijos.',
      'function maxDepth(root) {\n  if (!root) return ________;\n  const leftDepth = maxDepth(root.left);\n  const rightDepth = maxDepth(root.right);\n  return ________ + Math.max(leftDepth, rightDepth);\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — cada nodo una vez.',
      spaceComplexity: 'O(h) — altura para recursión.',
      patternUsed: 'DFS recursivo',
      code: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      commonErrors: [
        'Devolver 0 para null: correcto. Devolver -1 o algo distinto rompe.',
        'No sumar 1: el nodo actual aporta un nivel.',
        'Usar min en vez de max: la profundidad es el camino más largo.',
      ],
      relatedProblems: ['#110 Balanced Binary Tree', '#111 Minimum Depth', '#543 Diameter of Binary Tree'],
    },
  },
  {
    id: 8,
    number: 141,
    name: 'Linked List Cycle',
    leetcodeSlug: 'linked-list-cycle',
    difficulty: 'easy',
    module: 'Linked Lists',
    tip: "Floyd's algorithm — tortoise and hare, dos velocidades",
    pattern: 'Fast & Slow Pointers',
    patternReminder: {
      name: 'Fast & Slow Pointers',
      module: 'Linked Lists',
      whenToUse: 'Ciclos en linked list, encontrar punto medio. Dos punteros a distinta velocidad.',
      keywords: '"cycle", "middle", "tortoise", "hare"',
      template: 'let slow = head, fast = head;\nwhile (fast?.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow === fast) return true;\n}\nreturn false;',
    },
    hints: [
      'Fuerza bruta: Set de nodos visitados. O(n) espacio. Si hay ciclo, eventualmente repetís.',
      'Floyd: dos punteros, uno avanza 1 paso, otro 2. Si hay ciclo, se encuentran. Si no hay, fast llega a null.',
      'Por qué funciona: en un ciclo, la tortuga y la liebre están en un círculo. La liebre alcanza a la tortuga.',
      'function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = ________;\n    fast = ________;\n    if (________) return true;\n  }\n  return false;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — la liebre alcanza a la tortuga en O(n) pasos.',
      spaceComplexity: 'O(1) — solo dos punteros.',
      patternUsed: 'Floyd Cycle Detection',
      code: `function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast?.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      commonErrors: [
        'No verificar fast.next: fast.next.next crashea si fast.next es null.',
        'Empezar ambos en head: correcto. Si empezaran en head.next, podría fallar en listas cortas.',
        'Comparar valores en vez de referencias: los nodos pueden tener valores repetidos.',
      ],
      relatedProblems: ['#142 Linked List Cycle II (encontrar inicio)', '#202 Happy Number', '#287 Find Duplicate'],
    },
  },
  {
    id: 9,
    number: 217,
    name: 'Contains Duplicate',
    leetcodeSlug: 'contains-duplicate',
    difficulty: 'easy',
    module: 'Arrays & Strings',
    tip: '¿Qué estructura te dice en O(1) si ya viste un elemento?',
    pattern: 'HashMap/HashSet',
    patternReminder: {
      name: 'HashMap/HashSet',
      module: 'Hash Maps & Sets',
      whenToUse: 'Duplicados, frecuencia, existencia en O(1).',
      keywords: '"duplicate", "unique", "already seen"',
      template: 'const set = new Set();\nfor (const x of arr) {\n  if (set.has(x)) return true;\n  set.add(x);\n}\nreturn false;',
    },
    hints: [
      'Fuerza bruta: dos loops O(n²). O sort O(n log n) y comparar vecinos.',
      'Set: antes de agregar, verificá si ya existe. Si existe, hay duplicado. O(n) tiempo, O(n) espacio.',
      'Una sola pasada: para cada elemento, si ya está en el Set, return true. Si no, agregalo.',
      'function containsDuplicate(nums) {\n  const set = new Set();\n  for (const n of nums) {\n    if (________) return true;\n    set.add(________);\n  }\n  return ________;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — un pass.',
      spaceComplexity: 'O(n) — Set en el peor caso.',
      patternUsed: 'HashSet para duplicados',
      code: `function containsDuplicate(nums: number[]): boolean {
  const set = new Set<number>();
  for (const n of nums) {
    if (set.has(n)) return true;
    set.add(n);
  }
  return false;
}`,
      commonErrors: [
        'No verificar antes de agregar: el orden debe ser has → add.',
        'Usar Map en vez de Set: Set es suficiente, no necesitás valor.',
        'Devolver false al final: si no encontraste duplicado en el loop.',
      ],
      relatedProblems: ['#1 Two Sum', '#219 Contains Duplicate II', '#242 Valid Anagram'],
    },
  },
  {
    id: 10,
    number: 70,
    name: 'Climbing Stairs',
    leetcodeSlug: 'climbing-stairs',
    difficulty: 'easy',
    module: 'Dynamic Programming',
    tip: 'Para llegar al paso N, ¿desde qué pasos podés venir?',
    pattern: 'Dynamic Programming',
    patternReminder: {
      name: 'Dynamic Programming',
      module: 'Dynamic Programming',
      whenToUse: 'Decisiones con subproblemas que se repiten. Contar formas, mínimo/máximo.',
      keywords: '"how many ways", "minimum", "maximum", "subproblems"',
      template: 'const dp = [1, 1];\nfor (let i = 2; i <= n; i++) {\n  dp[i] = dp[i-1] + dp[i-2];\n}\nreturn dp[n];',
    },
    hints: [
      'Fuerza bruta: recursión pura. fib(n) = fib(n-1) + fib(n-2). O(2^n).',
      'Para llegar al paso n: podés venir del n-1 (un paso) o del n-2 (dos pasos). dp[n] = dp[n-1] + dp[n-2].',
      'Es Fibonacci. Solo necesitás los dos valores anteriores. O(n) tiempo, O(1) espacio.',
      'function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev = 1, curr = 2;\n  for (let i = 3; i <= n; i++) {\n    const next = ________ + ________;\n    prev = curr;\n    curr = ________;\n  }\n  return curr;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — un loop.',
      spaceComplexity: 'O(1) — solo prev y curr.',
      patternUsed: 'DP bottom-up (Fibonacci)',
      code: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}`,
      commonErrors: [
        'No considerar n=1 y n=2: devolver n directamente.',
        'Off-by-one en el loop: empezar en 3 si n>=3.',
        'Confundir prev y curr: curr es el actual, prev es el anterior.',
      ],
      relatedProblems: ['#509 Fibonacci', '#746 Min Cost Climbing Stairs', '#198 House Robber'],
    },
  },
  {
    id: 11,
    number: 206,
    name: 'Reverse Linked List',
    leetcodeSlug: 'reverse-linked-list',
    difficulty: 'easy',
    module: 'Linked Lists',
    tip: 'Tres punteros: prev, curr, next — redirigí sin perder la cadena',
    pattern: 'Linked List',
    patternReminder: {
      name: 'Linked List',
      module: 'Linked Lists',
      whenToUse: 'Manipulación de punteros. Invertir, reordenar, eliminar.',
      keywords: '"reverse", "reverse in place"',
      template: 'let prev = null;\nwhile (curr) {\n  const next = curr.next;\n  curr.next = prev;\n  prev = curr;\n  curr = next;\n}\nreturn prev;',
    },
    hints: [
      'Fuerza bruta: crear nueva lista invirtiendo. O(n) espacio. In-place es O(1) espacio.',
      'En cada paso: guardá next antes de modificar curr.next. curr.next = prev. Avanzá prev y curr.',
      'El orden: next = curr.next (guardar), curr.next = prev (invertir), prev = curr, curr = next.',
      'function reverseList(head) {\n  let prev = null;\n  while (head) {\n    const next = ________;\n    head.next = ________;\n    prev = ________;\n    head = ________;\n  }\n  return prev;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — un pass.',
      spaceComplexity: 'O(1) — in-place.',
      patternUsed: 'Iterative reversal',
      code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
      commonErrors: [
        'No guardar next antes de modificar: perdés la referencia al resto.',
        'Devolver head en vez de prev: al final head es null.',
        'Confundir el orden de las asignaciones.',
      ],
      relatedProblems: ['#92 Reverse Linked List II', '#143 Reorder List', '#234 Palindrome Linked List'],
    },
  },
  {
    id: 12,
    number: 704,
    name: 'Binary Search',
    leetcodeSlug: 'binary-search',
    difficulty: 'easy',
    module: 'Big O y Complejidad',
    tip: 'left y right se acercan — ¿cuándo terminás?',
    pattern: 'Binary Search',
    patternReminder: {
      name: 'Binary Search',
      module: 'Binary Search',
      whenToUse: 'Array ordenado o espacio de búsqueda reducible. O(log n).',
      keywords: '"sorted", "find", "search"',
      template: 'let left = 0, right = n - 1;\nwhile (left <= right) {\n  const mid = left + Math.floor((right - left) / 2);\n  if (nums[mid] === target) return mid;\n  if (nums[mid] < target) left = mid + 1;\n  else right = mid - 1;\n}\nreturn -1;',
    },
    hints: [
      'Fuerza bruta: linear search O(n). Con array ordenado, podés descartar mitad en cada paso.',
      'left y right delimitan el espacio de búsqueda. mid = (left + right) / 2. Si nums[mid] < target, left = mid + 1.',
      'El loop: while (left <= right). Si left > right, no está. Usar left + (right-left)/2 para evitar overflow.',
      'function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (________) {\n    const mid = left + Math.floor((right - left) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = ________;\n    else right = ________;\n  }\n  return -1;\n}',
    ],
    solution: {
      timeComplexity: 'O(log n) — mitad en cada paso.',
      spaceComplexity: 'O(1) — solo punteros.',
      patternUsed: 'Binary Search clásico',
      code: `function search(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      commonErrors: [
        'left <= right: si es <, fallás cuando left === right y es el target.',
        'mid + 1 y mid - 1: no incluir mid en el nuevo rango.',
        'Overflow: (left + right) / 2 puede overflow en lenguajes con ints.',
      ],
      relatedProblems: ['#35 Search Insert Position', '#278 First Bad Version', '#33 Search in Rotated Array'],
    },
  },
  {
    id: 13,
    number: 278,
    name: 'First Bad Version',
    leetcodeSlug: 'first-bad-version',
    difficulty: 'easy',
    module: 'Big O y Complejidad',
    tip: 'Binary search pero el "sorted array" es implícito',
    pattern: 'Binary Search',
    patternReminder: {
      name: 'Binary Search',
      module: 'Binary Search',
      whenToUse: 'Array ordenado o espacio monótono. FFF...TTT o TTT...FFF.',
      keywords: '"first", "last", "minimum", "search"',
      template: 'let left = 0, right = n;\nwhile (left < right) {\n  const mid = left + Math.floor((right - left) / 2);\n  if (isBad(mid)) right = mid;\n  else left = mid + 1;\n}\nreturn left;',
    },
    hints: [
      'El array implícito: [G, G, G, B, B, B]. Buscás el primer B. Es monótono.',
      'Binary search: si mid es bad, el primero puede ser mid o antes. right = mid. Si no, left = mid + 1.',
      'Diferencia con BS clásico: left < right (no <=). Cuando left === right, es la respuesta.',
      'function firstBadVersion(n) {\n  let left = 1, right = n;\n  while (________) {\n    const mid = left + Math.floor((right - left) / 2);\n    if (isBadVersion(mid)) right = ________;\n    else left = ________;\n  }\n  return left;\n}',
    ],
    solution: {
      timeComplexity: 'O(log n) — binary search.',
      spaceComplexity: 'O(1).',
      patternUsed: 'Binary Search on Answer',
      code: `function firstBadVersion(n: number): number {
  let left = 1, right = n;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (isBadVersion(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
      commonErrors: [
        'right = mid - 1 cuando es bad: podrías saltarte el primero.',
        'left <= right: con left < right, cuando salís, left es la respuesta.',
        'Empezar en 0: las versiones van de 1 a n.',
      ],
      relatedProblems: ['#34 Find First and Last', '#35 Search Insert', '#69 Sqrt(x)'],
    },
  },
  {
    id: 14,
    number: 110,
    name: 'Balanced Binary Tree',
    leetcodeSlug: 'balanced-binary-tree',
    difficulty: 'easy',
    module: 'Trees & BST',
    tip: 'En cada nodo necesitás saber la altura — ¿ya la calculás en otro problema?',
    pattern: 'BFS/DFS',
    patternReminder: {
      name: 'BFS/DFS',
      module: 'Trees & BST',
      whenToUse: 'Árboles, altura, balance. DFS que retorna información.',
      keywords: '"height", "balanced", "depth"',
      template: 'function height(node): number | -1 {\n  if (!node) return 0;\n  const L = height(node.left);\n  const R = height(node.right);\n  if (L === -1 || R === -1 || Math.abs(L-R) > 1) return -1;\n  return 1 + Math.max(L, R);\n}',
    },
    hints: [
      'Fuerza bruta: para cada nodo, calcular altura de left y right. O(n²) porque recalculás alturas.',
      'Optimización: DFS que retorna la altura. Si en algún subtree hay desbalance, retornar -1 (o señal).',
      'En cada nodo: height(left), height(right). Si alguno es -1 o |L-R| > 1, return -1. Sino return 1 + max(L,R).',
      'function isBalanced(root) {\n  function height(node) {\n    if (!node) return 0;\n    const L = height(node.left);\n    const R = height(node.right);\n    if (L === -1 || R === -1 || Math.abs(L-R) > 1) return ________;\n    return ________;\n  }\n  return height(root) !== -1;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — cada nodo una vez.',
      spaceComplexity: 'O(h) — recursión.',
      patternUsed: 'DFS con altura',
      code: `function isBalanced(root: TreeNode | null): boolean {
  function height(node: TreeNode | null): number {
    if (!node) return 0;
    const L = height(node.left);
    const R = height(node.right);
    if (L === -1 || R === -1 || Math.abs(L - R) > 1) return -1;
    return 1 + Math.max(L, R);
  }
  return height(root) !== -1;
}`,
      commonErrors: [
        'No propagar -1: si un hijo retorna -1, el padre debe retornar -1.',
        'Math.abs(L - R) > 1: la definición de balance.',
        'return 0 para null: un árbol vacío tiene altura 0.',
      ],
      relatedProblems: ['#104 Maximum Depth', '#543 Diameter', '#111 Minimum Depth'],
    },
  },
  {
    id: 15,
    number: 733,
    name: 'Flood Fill',
    leetcodeSlug: 'flood-fill',
    difficulty: 'easy',
    module: 'Grafos',
    tip: 'BFS o DFS desde el pixel origen, cambiá el color en cada visita',
    pattern: 'BFS/DFS',
    patternReminder: {
      name: 'BFS/DFS',
      module: 'Grafos',
      whenToUse: 'Matrices, componentes conectados, flood fill.',
      keywords: '"matrix", "connected", "flood", "island"',
      template: 'function dfs(r, c) {\n  if (outOfBounds || visited[r][c]) return;\n  visited[r][c] = true;\n  image[r][c] = newColor;\n  for (const [dr,dc] of dirs) dfs(r+dr, c+dc);\n}',
    },
    hints: [
      'Fuerza bruta: no hay. Es un traversal directo.',
      'BFS o DFS desde (sr, sc). Si el color actual es el target, cambiá a newColor. Visitá vecinos (4 direcciones).',
      'Caso especial: si image[sr][sc] === newColor, no hagas nada (evita loop infinito).',
      'function floodFill(image, sr, sc, newColor) {\n  const oldColor = image[sr][sc];\n  if (oldColor === newColor) return image;\n  function dfs(r, c) {\n    if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] !== ________) return;\n    image[r][c] = newColor;\n    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);\n  }\n  dfs(sr, sc);\n  return image;\n}',
    ],
    solution: {
      timeComplexity: 'O(m * n) — cada celda una vez.',
      spaceComplexity: 'O(m * n) — recursión en el peor caso.',
      patternUsed: 'DFS en matriz',
      code: `function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
  const oldColor = image[sr][sc];
  if (oldColor === newColor) return image;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] !== oldColor) return;
    image[r][c] = newColor;
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  dfs(sr, sc);
  return image;
}`,
      commonErrors: [
        'No verificar oldColor === newColor: loop infinito.',
        'Verificar image[r][c] !== oldColor: solo llenar el color original.',
        'Los bounds: r y c deben estar dentro de la matriz.',
      ],
      relatedProblems: ['#200 Number of Islands', '#695 Max Area of Island', '#463 Island Perimeter'],
    },
  },
  // ========== MEDIUM 16-30 ==========
  {
    id: 16,
    number: 15,
    name: '3Sum',
    leetcodeSlug: '3sum',
    difficulty: 'medium',
    module: 'Arrays & Strings',
    tip: 'Ordená primero, luego fijá un elemento y usá two pointers para los otros dos',
    pattern: 'Two Pointers',
    patternReminder: {
      name: 'Two Pointers',
      module: 'Arrays & Strings',
      whenToUse: 'Array ordenado, suma de pares o triples.',
      keywords: '"sorted", "sum", "pair", "triplet"',
      template: 'nums.sort();\nfor (let i = 0; i < n; i++) {\n  if (i > 0 && nums[i] === nums[i-1]) continue;\n  let left = i+1, right = n-1;\n  while (left < right) { /* two sum */ }\n}',
    },
    hints: [
      'Fuerza bruta: tres loops O(n³). Con ordenamiento, fijás el primero y two pointers para el resto.',
      'Ordena el array. Para cada i, buscá dos números en [i+1, n-1] que sumen -nums[i]. Es Two Sum con two pointers.',
      'Evitar duplicados: skip i si nums[i] === nums[i-1]. Skip left/right cuando son iguales al anterior.',
      'function threeSum(nums) {\n  nums.sort((a,b) => a-b);\n  const res = [];\n  for (let i = 0; i < nums.length; i++) {\n    if (i > 0 && nums[i] === nums[i-1]) continue;\n    let left = i+1, right = nums.length-1;\n    while (left < right) {\n      const sum = ________;\n      if (sum === 0) { res.push([nums[i], nums[left], nums[right]]); left++; /* skip dups */ }\n      else if (sum < 0) left++; else right--;\n    }\n  }\n  return res;\n}',
    ],
    solution: {
      timeComplexity: 'O(n²) — sort O(n log n) + two pointers O(n) por cada i.',
      spaceComplexity: 'O(1) o O(log n) para sort.',
      patternUsed: 'Two Pointers en array ordenado',
      code: `function threeSum(nums: number[]): number[][] {
  nums.sort((a,b) => a-b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let left = i+1, right = nums.length-1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        while (left < right && nums[left] === nums[left-1]) left++;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return res;
}`,
      commonErrors: [
        'No sortear: two pointers requiere orden.',
        'No saltar duplicados: generarás triplets repetidos.',
        'Saltar left/right: después de encontrar un triplet, avanzar left y saltar duplicados.',
      ],
      relatedProblems: ['#1 Two Sum', '#18 4Sum', '#16 3Sum Closest'],
    },
  },
  {
    id: 17,
    number: 11,
    name: 'Container With Most Water',
    leetcodeSlug: 'container-with-most-water',
    difficulty: 'medium',
    module: 'Arrays & Strings',
    tip: 'Two pointers desde extremos — siempre movés el lado más corto',
    pattern: 'Two Pointers',
    patternReminder: {
      name: 'Two Pointers',
      module: 'Arrays & Strings',
      whenToUse: 'Array, maximizar área con dos índices.',
      keywords: '"max area", "two pointers"',
      template: 'let left = 0, right = n-1;\nwhile (left < right) {\n  area = Math.max(area, (right-left) * Math.min(h[left], h[right]));\n  if (h[left] < h[right]) left++; else right--;\n}',
    },
    hints: [
      'Fuerza bruta: todos los pares O(n²).',
      '¿Por qué el lado más corto? Si movés el más alto, el ancho disminuye y la altura no aumenta. Si movés el más corto, quizás encontrás uno más alto.',
      'Greedy: left y right en extremos. Calculá área. Mové el más corto hacia adentro.',
      'function maxArea(height) {\n  let left = 0, right = height.length - 1, maxA = 0;\n  while (left < right) {\n    maxA = Math.max(maxA, (right - left) * ________);\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return maxA;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — un pass.',
      spaceComplexity: 'O(1).',
      patternUsed: 'Two Pointers greedy',
      code: `function maxArea(height: number[]): number {
  let left = 0, right = height.length - 1, maxA = 0;
  while (left < right) {
    maxA = Math.max(maxA, (right - left) * Math.min(height[left], height[right]));
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxA;
}`,
      commonErrors: [
        'No usar Math.min para la altura: el agua está limitada por el más corto.',
        'Mové el más alto: incorrecto. Siempre el más corto.',
        'Ancho: right - left, no right - left + 1.',
      ],
      relatedProblems: ['#42 Trapping Rain Water', '#11 mismo patrón', '#15 3Sum'],
    },
  },
  {
    id: 18,
    number: 3,
    name: 'Longest Substring Without Repeating Characters',
    leetcodeSlug: 'longest-substring-without-repeating-characters',
    difficulty: 'medium',
    module: 'Arrays & Strings',
    tip: 'Sliding window — expandí la ventana hasta que haya repetido, luego contraé',
    pattern: 'Sliding Window',
    patternReminder: {
      name: 'Sliding Window',
      module: 'Arrays & Strings',
      whenToUse: 'Substring, subarray, ventana variable. "longest", "shortest" + substring.',
      keywords: '"longest substring", "without repeating"',
      template: 'let left = 0;\nfor (let right = 0; right < n; right++) {\n  // expandir con s[right]\n  while (condición inválida) left++;\n  // actualizar resultado\n}',
    },
    hints: [
      'Fuerza bruta: para cada i, todos los substrings que empiezan en i. O(n²). ¿Hay información reutilizable?',
      'HashMap: caracter → último índice visto. Si el char nuevo ya está en la ventana, mové left a map.get(char) + 1.',
      '¿Por qué max(left, map.get(char)+1)? En "abba", al llegar al 2do "a", left ya está en 2. Sin max, left volvería a 1.',
      'function lengthOfLongestSubstring(s) {\n  const map = new Map();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (________) left = Math.max(left, map.get(char) + 1);\n    map.set(char, right);\n    maxLen = Math.max(maxLen, ________);\n  }\n  return maxLen;\n}',
    ],
    solution: {
      timeComplexity: 'O(n) — cada caracter entra y sale una vez.',
      spaceComplexity: 'O(min(n, m)) — m = tamaño del alfabeto.',
      patternUsed: 'Sliding Window + HashMap',
      code: `function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char)) left = Math.max(left, map.get(char)! + 1);
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      commonErrors: [
        'No usar max() al mover left: "abba" falla.',
        'Actualizar map antes del if: perdés la posición anterior.',
        'right - left + 1: la ventana incluye ambos extremos.',
      ],
      relatedProblems: ['#11 Container With Most Water', '#76 Minimum Window Substring', '#347 Top K Frequent'],
    },
  },
  {
    id: 19,
    number: 238,
    name: 'Product of Array Except Self',
    leetcodeSlug: 'product-of-array-except-self',
    difficulty: 'medium',
    module: 'Arrays & Strings',
    tip: 'Prefix products de izquierda, suffix products de derecha, sin división',
    pattern: 'Prefix/Suffix',
    patternReminder: { name: 'Prefix/Suffix', module: 'Arrays & Strings', whenToUse: 'Producto/suma acumulada sin un elemento', keywords: '"except self", "prefix"', template: 'prefix[i] = prefix[i-1] * nums[i-1]; suffix[i] = suffix[i+1] * nums[i+1];' },
    hints: ['División no permitida. Para cada i necesitás producto de todo excepto nums[i].', 'prefix[i] = producto de nums[0..i-1]. suffix[i] = producto de nums[i+1..n-1]. result[i] = prefix[i] * suffix[i].', 'Podés hacer en O(1) espacio: usar result como prefix, luego un pass de derecha a izquierda multiplicando por suffix.', 'let res = [1]; for (let i=1;i<n;i++) res[i]=res[i-1]*nums[i-1]; let suffix=1; for (let i=n-1;i>=0;i--) { res[i]*=suffix; suffix*=nums[i]; }'],
    solution: { timeComplexity: 'O(n)', spaceComplexity: 'O(1)', patternUsed: 'Prefix + Suffix', code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array(n).fill(1);
  for (let i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];
  let suffix = 1;
  for (let i = n-1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
  return res;
}`, commonErrors: ['No considerar el caso n=1.', 'Inicializar res[0]=1.', 'El orden del segundo loop: derecha a izquierda.'], relatedProblems: ['#42 Trapping Rain Water', '#152 Max Product Subarray'] },
  },
  {
    id: 20,
    number: 153,
    name: 'Find Minimum in Rotated Sorted Array',
    leetcodeSlug: 'find-minimum-in-rotated-sorted-array',
    difficulty: 'medium',
    module: 'Big O y Complejidad',
    tip: 'Binary search modificado — el mínimo está donde el orden "se rompe"',
    pattern: 'Binary Search',
    patternReminder: { name: 'Binary Search', module: 'Binary Search', whenToUse: 'Array rotado, buscar punto de quiebre', keywords: '"rotated", "sorted"', template: 'Comparar mid con right. Si nums[mid] > nums[right], el mínimo está a la derecha.' },
    hints: ['En un array rotado [4,5,6,7,0,1,2], el mínimo está donde nums[i] > nums[i+1].', 'Compará nums[mid] con nums[right]. Si mid > right, el mínimo está en [mid+1, right].', 'Si mid <= right, el mínimo está en [left, mid].', 'function findMin(nums) { let left=0, right=nums.length-1; while (left<right) { const mid=left+Math.floor((right-left)/2); if (nums[mid]>nums[right]) left=mid+1; else right=mid; } return nums[left]; }'],
    solution: { timeComplexity: 'O(log n)', spaceComplexity: 'O(1)', patternUsed: 'Binary Search', code: `function findMin(nums: number[]): number {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}`, commonErrors: ['Comparar con left en vez de right: right es más confiable.', 'right = mid (no mid-1) cuando nums[mid] <= nums[right].', 'Devolver nums[left] al final.'], relatedProblems: ['#33 Search in Rotated', '#154 Find Min II'] },
  },
  {
    id: 21,
    number: 98,
    name: 'Validate Binary Search Tree',
    leetcodeSlug: 'validate-binary-search-tree',
    difficulty: 'medium',
    module: 'Trees & BST',
    tip: 'No alcanza comparar con el hijo — cada nodo tiene un rango válido',
    pattern: 'BFS/DFS',
    patternReminder: { name: 'BST', module: 'Trees & BST', whenToUse: 'Validar BST: cada nodo en rango (min, max)', keywords: '"BST", "validate"', template: 'function validate(node, min, max) { if (!node) return true; if (node.val <= min || node.val >= max) return false; return validate(node.left, min, node.val) && validate(node.right, node.val, max); }' },
    hints: ['Comparar solo con el padre no alcanza. Un nodo a la derecha puede ser menor que un ancestro.', 'Pasá (min, max) como parámetro. Para el hijo izquierdo: (min, node.val). Para el derecho: (node.val, max).', 'Inicial: (Infinity, -Infinity) o (null, null) si permitís null.', 'function isValidBST(root, min=-Infinity, max=Infinity) { if (!root) return true; if (root.val <= min || root.val >= max) return false; return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max); }'],
    solution: { timeComplexity: 'O(n)', spaceComplexity: 'O(h)', patternUsed: 'DFS con rangos', code: `function isValidBST(root: TreeNode | null, min = -Infinity, max = Infinity): boolean {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`, commonErrors: ['Usar <= y >=: los valores deben ser estrictamente menores/mayores.', 'No pasar los rangos a los hijos.', 'Considerar overflow con Infinity.'], relatedProblems: ['#94 Inorder Traversal', '#230 Kth Smallest'] },
  },
  {
    id: 22,
    number: 200,
    name: 'Number of Islands',
    leetcodeSlug: 'number-of-islands',
    difficulty: 'medium',
    module: 'Grafos',
    tip: "DFS/BFS desde cada '1' no visitado — cada llamada inicial es una isla",
    pattern: 'BFS/DFS',
    patternReminder: { name: 'BFS/DFS', module: 'Grafos', whenToUse: 'Componentes conectados en matriz', keywords: '"islands", "connected"', template: 'Por cada "1" no visitado, DFS/BFS y marcar visitados. Contar llamadas iniciales.' },
    hints: ['Recorré la matriz. Cuando encontrás "1", incrementá contador y hacé DFS/BFS para marcar toda la isla.', 'Marcar como "0" o usar visited. Así no contás la misma isla dos veces.', '4 direcciones: (r±1, c), (r, c±1).', 'function numIslands(grid) { let count=0; for (let r=0;r<grid.length;r++) for (let c=0;c<grid[0].length;c++) if (grid[r][c]==="1") { count++; dfs(grid,r,c); } return count; }'],
    solution: { timeComplexity: 'O(m*n)', spaceComplexity: 'O(m*n)', patternUsed: 'DFS en grid', code: `function numIslands(grid: string[][]): number {
  let count = 0;
  function dfs(r: number, c: number) {
    if (r<0||r>=grid.length||c<0||c>=grid[0].length||grid[r][c]==='0') return;
    grid[r][c] = '0';
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r=0; r<grid.length; r++)
    for (let c=0; c<grid[0].length; c++)
      if (grid[r][c]==='1') { count++; dfs(r,c); }
  return count;
}`, commonErrors: ['No marcar como visitado: loop infinito.', 'Modificar grid in-place o usar visited.', 'Las 4 direcciones.'], relatedProblems: ['#733 Flood Fill', '#695 Max Area', '#463 Perimeter'] },
  },
  {
    id: 23,
    number: 133,
    name: 'Clone Graph',
    leetcodeSlug: 'clone-graph',
    difficulty: 'medium',
    module: 'Grafos',
    tip: 'HashMap de original→clon para no procesar el mismo nodo dos veces',
    pattern: 'BFS/DFS',
    patternReminder: { name: 'Graph', module: 'Grafos', whenToUse: 'Clonar grafo: map para evitar duplicados', keywords: '"clone", "copy"', template: 'const map = new Map(); map.set(node, new Node(node.val)); for (const neighbor of node.neighbors) { if (!map.has(neighbor)) dfs(neighbor); clone.neighbors.push(map.get(neighbor)); }' },
    hints: ['DFS o BFS. Para cada nodo original, creá el clon si no existe. Map: original → clon.', 'Al procesar vecinos: si no está en map, recursión. Luego agregar map.get(neighbor) a clone.neighbors.', 'Manejá null y nodo sin vecinos.', 'function cloneGraph(node) { if (!node) return null; const map = new Map(); function dfs(n) { if (map.has(n)) return map.get(n); const clone = new Node(n.val); map.set(n, clone); for (const nb of n.neighbors) clone.neighbors.push(dfs(nb)); return clone; } return dfs(node); }'],
    solution: { timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)', patternUsed: 'DFS + HashMap', code: `function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;
  const map = new Map<Node, Node>();
  function dfs(n: Node): Node {
    if (map.has(n)) return map.get(n)!;
    const clone = new Node(n.val);
    map.set(n, clone);
    for (const nb of n.neighbors) clone.neighbors.push(dfs(nb));
    return clone;
  }
  return dfs(node);
}`, commonErrors: ['No usar map: nodos con múltiples referencias se clonan varias veces.', 'No manejar null.', 'Agregar a neighbors antes de que el vecino esté en el map.'], relatedProblems: ['#138 Copy List with Random', '#133 Clone Graph'] },
  },
  {
    id: 24,
    number: 207,
    name: 'Course Schedule',
    leetcodeSlug: 'course-schedule',
    difficulty: 'medium',
    module: 'Grafos',
    tip: 'Cycle detection en grafo dirigido — DFS con tres estados: unvisited/visiting/visited',
    pattern: 'BFS/DFS',
    patternReminder: { name: 'Topological Sort', module: 'Grafos', whenToUse: 'Dependencias, ciclo en grafo dirigido', keywords: '"prerequisite", "cycle"', template: 'Estados: 0=unvisited, 1=visiting, 2=visited. Si encontrás un nodo visiting durante DFS, hay ciclo.' },
    hints: ['Construí el grafo: prereq[1] = [0] significa que 1 requiere 0.', 'DFS con colores: 0=blanco, 1=gris (en stack), 2=negro (terminado). Si ves gris, hay ciclo.', 'Si terminás el DFS sin ciclo, se puede completar.', 'function canFinish(n, prereqs) { const graph = buildGraph(n, prereqs); const state = new Array(n).fill(0); function hasCycle(i) { if (state[i]===1) return true; if (state[i]===2) return false; state[i]=1; for (const j of graph[i]) if (hasCycle(j)) return true; state[i]=2; return false; } for (let i=0;i<n;i++) if (hasCycle(i)) return false; return true; }'],
    solution: { timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)', patternUsed: 'DFS cycle detection', code: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({length: numCourses}, () => []);
  for (const [a, b] of prerequisites) graph[a].push(b);
  const state: number[] = new Array(numCourses).fill(0);
  function hasCycle(i: number): boolean {
    if (state[i] === 1) return true;
    if (state[i] === 2) return false;
    state[i] = 1;
    for (const j of graph[i]) if (hasCycle(j)) return true;
    state[i] = 2;
    return false;
  }
  for (let i = 0; i < numCourses; i++) if (hasCycle(i)) return false;
  return true;
}`, commonErrors: ['Confundir la dirección del edge: [a,b] significa a requiere b.', 'No resetear state correctamente.', 'Devolver true cuando no hay ciclo.'], relatedProblems: ['#210 Course Schedule II', '#269 Alien Dictionary'] },
  },
  {
    id: 25,
    number: 155,
    name: 'Min Stack',
    leetcodeSlug: 'min-stack',
    difficulty: 'medium',
    module: 'Stacks & Queues',
    tip: 'Stack auxiliar que solo pushea cuando el nuevo elemento es ≤ al mínimo actual',
    pattern: 'Stack',
    patternReminder: { name: 'Stack', module: 'Stacks & Queues', whenToUse: 'Min/Max en O(1) con stack auxiliar', keywords: '"min stack"', template: 'minStack solo pushea cuando val <= minStack.peek().' },
    hints: ['getMin en O(1) requiere guardar el mínimo en cada nivel.', 'Stack auxiliar: cuando push(x), si x <= minStack.peek(), pusheá x a minStack.', 'Cuando pop(), si pop() === minStack.peek(), minStack.pop().', 'push(x): stack.push(x); if (minStack.length===0 || x<=minStack[minStack.length-1]) minStack.push(x);'],
    solution: { timeComplexity: 'O(1) todas las operaciones', spaceComplexity: 'O(n)', patternUsed: 'Stack auxiliar', code: `class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];
  push(val: number): void {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length-1])
      this.minStack.push(val);
  }
  pop(): void {
    if (this.stack.pop() === this.minStack[this.minStack.length-1]) this.minStack.pop();
  }
  top(): number { return this.stack[this.stack.length-1]; }
  getMin(): number { return this.minStack[this.minStack.length-1]; }
}`, commonErrors: ['Usar < en vez de <=: si hay duplicados del mínimo, falla.', 'No hacer pop del minStack cuando corresponde.', 'Considerar stack vacío en getMin.'], relatedProblems: ['#20 Valid Parentheses', '#232 Implement Queue with Stacks'] },
  },
  {
    id: 26,
    number: 322,
    name: 'Coin Change',
    leetcodeSlug: 'coin-change',
    difficulty: 'medium',
    module: 'Dynamic Programming',
    tip: 'dp[amount] = mínimo de monedas — construí bottom-up desde 0',
    pattern: 'Dynamic Programming',
    patternReminder: { name: 'DP', module: 'Dynamic Programming', whenToUse: 'Mínimo/máximo de formas, unbounded knapsack', keywords: '"minimum coins"', template: 'dp[i] = 1 + min(dp[i-coin] for coin in coins if i>=coin)' },
    hints: ['dp[amount] = mínimo de monedas para formar amount. dp[0] = 0.', 'Para cada amount de 1 a target: dp[amount] = 1 + min(dp[amount - coin]) para cada coin.', 'Si no se puede formar, dp[i] = Infinity. Al final, si dp[amount]===Infinity return -1.', 'for (let i=1;i<=amount;i++) { dp[i]=Infinity; for (const c of coins) if (i>=c) dp[i]=Math.min(dp[i], 1+dp[i-c]); }'],
    solution: { timeComplexity: 'O(amount * coins)', spaceComplexity: 'O(amount)', patternUsed: 'DP unbounded knapsack', code: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount+1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const c of coins)
      if (i >= c) dp[i] = Math.min(dp[i], 1 + dp[i-c]);
  return dp[amount] === Infinity ? -1 : dp[amount];
}`, commonErrors: ['dp[0] = 0: base case.', 'No considerar -1 cuando no hay solución.', 'Orden del loop: amount primero, luego coins.'], relatedProblems: ['#518 Coin Change II', '#70 Climbing Stairs', '#279 Perfect Squares'] },
  },
  {
    id: 27,
    number: 1143,
    name: 'Longest Common Subsequence',
    leetcodeSlug: 'longest-common-subsequence',
    difficulty: 'medium',
    module: 'Dynamic Programming',
    tip: 'Tabla 2D — si los caracteres coinciden, viene de la diagonal',
    pattern: 'Dynamic Programming',
    patternReminder: { name: 'DP 2D', module: 'Dynamic Programming', whenToUse: 'LCS, edit distance, dos strings', keywords: '"subsequence", "common"', template: 'dp[i][j] = text1[i]===text2[j] ? 1+dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])' },
    hints: ['dp[i][j] = LCS de text1[0..i-1] y text2[0..j-1].', 'Si text1[i-1] === text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1].', 'Si no: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).', 'Inicializar primera fila y columna con 0. dp[0][j]=0, dp[i][0]=0.'],
    solution: { timeComplexity: 'O(m*n)', spaceComplexity: 'O(m*n)', patternUsed: 'DP 2D', code: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = text1[i-1] === text2[j-1] ? 1 + dp[i-1][j-1] : Math.max(dp[i-1][j], dp[i][j-1]);
  return dp[m][n];
}`, commonErrors: ['Índices: text1[i-1] porque dp tiene tamaño m+1.', 'La diagonal es dp[i-1][j-1].', 'Inicializar con 0.'], relatedProblems: ['#72 Edit Distance', '#583 Delete Operation', '#718 Longest Common Subarray'] },
  },
  {
    id: 28,
    number: 198,
    name: 'House Robber',
    leetcodeSlug: 'house-robber',
    difficulty: 'medium',
    module: 'Dynamic Programming',
    tip: 'En cada casa elegís robar (+ casa anterior anterior) o no robar (casa anterior)',
    pattern: 'Dynamic Programming',
    patternReminder: { name: 'DP', module: 'Dynamic Programming', whenToUse: 'Decisiones secuenciales, no adyacentes', keywords: '"rob", "adjacent"', template: 'dp[i] = max(nums[i] + dp[i-2], dp[i-1])' },
    hints: ['En casa i: robarla (nums[i] + best hasta i-2) o no (best hasta i-1).', 'dp[i] = max(nums[i] + dp[i-2], dp[i-1]). Solo necesitás dp[i-1] y dp[i-2].', 'O(1) espacio: prev2, prev1, curr.', 'let prev2=0, prev1=0; for (const n of nums) { const curr = Math.max(prev1, n+prev2); prev2=prev1; prev1=curr; } return prev1;'],
    solution: { timeComplexity: 'O(n)', spaceComplexity: 'O(1)', patternUsed: 'DP lineal', code: `function rob(nums: number[]): number {
  let prev2 = 0, prev1 = 0;
  for (const n of nums) {
    const curr = Math.max(prev1, n + prev2);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`, commonErrors: ['No considerar el caso de no robar: max(rob, notRob).', 'prev2 y prev1: el orden de actualización importa.', 'Casos n=0, n=1.'], relatedProblems: ['#213 House Robber II', '#337 House Robber III', '#70 Climbing Stairs'] },
  },
  {
    id: 29,
    number: 143,
    name: 'Reorder List',
    leetcodeSlug: 'reorder-list',
    difficulty: 'medium',
    module: 'Linked Lists',
    tip: '3 pasos — encontrá el medio, revertí la segunda mitad, mergeá intercalado',
    pattern: 'Fast & Slow Pointers',
    patternReminder: { name: 'Linked List', module: 'Linked Lists', whenToUse: 'Encontrar medio, revertir, mergear', keywords: '"reorder"', template: '1. Fast/slow para medio. 2. Reverse segunda mitad. 3. Merge.' },
    hints: ['Paso 1: fast/slow para encontrar el medio. La segunda mitad empieza en slow.next.', 'Paso 2: reverse de la segunda mitad (como Reverse Linked List).', 'Paso 3: merge intercalado: l1.next = l2, l2.next = l1.next (guardar antes).', 'Cortar la primera mitad: prev.next = null antes de reverse.'],
    solution: { timeComplexity: 'O(n)', spaceComplexity: 'O(1)', patternUsed: 'Find middle + Reverse + Merge', code: `function reorderList(head: ListNode | null): void {
  if (!head?.next) return;
  let slow = head, fast = head;
  while (fast.next?.next) { slow = slow.next!; fast = fast.next.next; }
  let second = reverse(slow.next);
  slow.next = null;
  let first = head;
  while (second) {
    const t1 = first.next, t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1!;
    second = t2;
  }
}
function reverse(head: ListNode | null): ListNode | null {
  let prev = null;
  while (head) { const next = head.next; head.next = prev; prev = head; head = next; }
  return prev;
}`, commonErrors: ['No cortar la primera mitad: ciclo infinito.', 'Guardar first.next antes de modificar.', 'Manejar lista de 1 o 2 nodos.'], relatedProblems: ['#206 Reverse List', '#234 Palindrome List', '#876 Middle of List'] },
  },
  {
    id: 30,
    number: 347,
    name: 'Top K Frequent Elements',
    leetcodeSlug: 'top-k-frequent-elements',
    difficulty: 'medium',
    module: 'Hash Maps & Sets',
    tip: 'Heap de tamaño K o bucket sort por frecuencia',
    pattern: 'Heap/HashMap',
    patternReminder: { name: 'Heap', module: 'Heaps', whenToUse: 'K elementos más frecuentes/grandes', keywords: '"top k", "most frequent"', template: 'Map para frecuencia. Min-heap de tamaño K. Si freq > heap.peek(), pop y push.' },
    hints: ['HashMap para contar frecuencia. Luego: heap de tamaño K (min-heap por freq) o bucket sort.', 'Bucket sort: bucket[i] = números con frecuencia i. De mayor freq a menor, tomar K.', 'Heap: mantener K más frecuentes. Si el actual tiene más freq que el mínimo del heap, reemplazar.', 'const freq = new Map(); for (const n of nums) freq.set(n, (freq.get(n)||0)+1); const buckets = []; for (let i=0;i<=nums.length;i++) buckets[i]=[]; for (const [n,f] of freq) buckets[f].push(n); const res=[]; for (let i=buckets.length-1;i>=0 && res.length<k;i--) res.push(...buckets[i]); return res.slice(0,k);'],
    solution: { timeComplexity: 'O(n) con bucket sort', spaceComplexity: 'O(n)', patternUsed: 'Bucket sort por frecuencia', code: `function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n)||0)+1);
  const buckets: number[][] = Array.from({length: nums.length+1}, () => []);
  for (const [n, f] of freq) buckets[f].push(n);
  const res: number[] = [];
  for (let i = buckets.length-1; i >= 0 && res.length < k; i--) res.push(...buckets[i]);
  return res.slice(0, k);
}`, commonErrors: ['Bucket index: freq puede ser 1 a n, así que buckets.length = n+1.', 'Iterar de mayor a menor frecuencia.', 'slice(0,k) por si el último bucket tiene más de k.'], relatedProblems: ['#215 Kth Largest', '#692 Top K Frequent Words', '#347 con heap'] },
  },
  // ========== HARD 31-35 ==========
  {
    id: 31,
    number: 42,
    name: 'Trapping Rain Water',
    leetcodeSlug: 'trapping-rain-water',
    difficulty: 'hard',
    module: 'Arrays & Strings + Big O',
    tip: 'En cada posición, el agua = min(maxIzq, maxDer) - altura actual. Two pointers O(n) O(1)',
    pattern: 'Two Pointers',
    patternReminder: { name: 'Two Pointers', module: 'Arrays & Strings', whenToUse: 'Agua atrapada, el lado con menor max puede calcularse', keywords: '"trapping", "water"', template: 'leftMax, rightMax. Mové el puntero del lado con menor max.' },
    hints: ['Para cada i: agua[i] = min(maxIzq[i], maxDer[i]) - height[i]. Precomputar maxIzq y maxDer: O(n) espacio.', 'Two pointers O(1) espacio: left y right. Mantener leftMax y rightMax. El lado con menor max siempre puede calcular su agua.', 'Si leftMax < rightMax: el agua en left está determinada por leftMax. left++. Actualizar leftMax.', 'let left=0, right=n-1, leftMax=0, rightMax=0, water=0; while (left<right) { if (height[left]<height[right]) { if (height[left]>=leftMax) leftMax=height[left]; else water+=leftMax-height[left]; left++; } else { /* symmetric */ } }'],
    solution: { timeComplexity: 'O(n)', spaceComplexity: 'O(1)', patternUsed: 'Two Pointers', code: `function trap(height: number[]): number {
  let left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`, commonErrors: ['Comparar leftMax con height[left] antes de sumar.', 'Solo sumar cuando height < max (hay capacidad).', 'Mover el puntero del lado más bajo.'], relatedProblems: ['#11 Container With Most Water', '#42 con arrays', '#238 Product Except Self'] },
  },
  {
    id: 32,
    number: 297,
    name: 'Serialize and Deserialize Binary Tree',
    leetcodeSlug: 'serialize-and-deserialize-binary-tree',
    difficulty: 'hard',
    module: 'Trees & BST + Grafos',
    tip: 'BFS con marcadores null — la serialización debe ser invertible unívocamente',
    pattern: 'BFS/DFS',
    patternReminder: { name: 'Tree Serialization', module: 'Trees & BST', whenToUse: 'BFS con null markers para reconstruir', keywords: '"serialize", "deserialize"', template: 'BFS: "1,2,3,null,null,4,5". Deserialize: queue, reconstruir nivel por nivel.' },
    hints: ['BFS: encolá nodos (incluyendo null). Serialización: valores separados por coma.', 'Para deserializar: split, queue. Para cada valor, crear nodo, asignar left y right de la cola.', 'Los null son importantes: sin ellos no sabés la estructura.', 'serialize: BFS, push "null" para hijos null. deserialize: split, idx, function build() { if (vals[idx]==="null") { idx++; return null; } const node = new TreeNode(+vals[idx++]); node.left = build(); node.right = build(); return node; }'],
    solution: { timeComplexity: 'O(n) serialize y deserialize', spaceComplexity: 'O(n)', patternUsed: 'BFS serialization', code: `function serialize(root: TreeNode | null): string {
  if (!root) return '';
  const queue: (TreeNode | null)[] = [root];
  const vals: string[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    vals.push(node ? String(node.val) : 'null');
    if (node) { queue.push(node.left); queue.push(node.right); }
  }
  return vals.join(',');
}
function deserialize(data: string): TreeNode | null {
  if (!data) return null;
  const vals = data.split(',');
  let i = 0;
  const root = new TreeNode(Number(vals[i++]));
  const queue: (TreeNode | null)[] = [root];
  while (queue.length && i < vals.length) {
    const node = queue.shift()!;
    const leftVal = vals[i++], rightVal = vals[i++];
    if (leftVal !== 'null') { node.left = new TreeNode(Number(leftVal)); queue.push(node.left); }
    if (rightVal !== 'null') { node.right = new TreeNode(Number(rightVal)); queue.push(node.right); }
  }
  return root;
}`, commonErrors: ['Incluir null en la serialización.', 'Manejar string vacío.', 'Reconstruir en el mismo orden BFS.'], relatedProblems: ['#102 Level Order', '#105 Construct from Preorder', '#297 con DFS'] },
  },
  {
    id: 33,
    number: 127,
    name: 'Word Ladder',
    leetcodeSlug: 'word-ladder',
    difficulty: 'hard',
    module: 'Grafos + Hash Maps',
    tip: 'BFS donde cada nodo es una palabra — ¿cómo generás los vecinos eficientemente?',
    pattern: 'BFS/DFS',
    patternReminder: { name: 'BFS', module: 'Grafos', whenToUse: 'Shortest path en grafo no ponderado', keywords: '"ladder", "transform"', template: 'BFS. Vecinos = palabras a 1 letra de distancia. Set para O(1) lookup.' },
    hints: ['Cada palabra es un nodo. Vecinos = palabras que difieren en 1 letra y están en wordList.', 'Generar vecinos: para cada posición, probar cada letra. Si está en wordList, es vecino. O(n * 26 * L).', 'BFS desde beginWord. Cuando encontrás endWord, return level.', 'const set = new Set(wordList); const queue = [[beginWord, 1]]; while (queue.length) { const [word, len] = queue.shift(); if (word===endWord) return len; for (let i=0;i<word.length;i++) for (let c of "abcdefghijklmnopqrstuvwxyz") { const next = word.slice(0,i)+c+word.slice(i+1); if (set.has(next)) { set.delete(next); queue.push([next, len+1]); } } } return 0;'],
    solution: { timeComplexity: 'O(M² * N) donde M=longitud palabra, N=size wordList', spaceComplexity: 'O(N)', patternUsed: 'BFS shortest path', code: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const set = new Set(wordList);
  if (!set.has(endWord)) return 0;
  const queue: [string, number][] = [[beginWord, 1]];
  set.delete(beginWord);
  while (queue.length) {
    const [word, len] = queue.shift()!;
    if (word === endWord) return len;
    for (let i = 0; i < word.length; i++)
      for (const c of 'abcdefghijklmnopqrstuvwxyz') {
        const next = word.slice(0,i) + c + word.slice(i+1);
        if (set.has(next)) { set.delete(next); queue.push([next, len+1]); }
      }
  }
  return 0;
}`, commonErrors: ['No borrar del set al visitar: visitarías el mismo nodo varias veces.', 'Verificar que endWord está en wordList.', 'Devolver 0 cuando no hay camino.'], relatedProblems: ['#126 Word Ladder II', '#433 Minimum Genetic Mutation', '#127 Bidirectional BFS'] },
  },
  {
    id: 34,
    number: 23,
    name: 'Merge K Sorted Lists',
    leetcodeSlug: 'merge-k-sorted-lists',
    difficulty: 'hard',
    module: 'Linked Lists + Trees',
    tip: 'Min-heap de tamaño K — siempre extraés el mínimo global en O(log K)',
    pattern: 'Heap',
    patternReminder: { name: 'Heap', module: 'Heaps', whenToUse: 'Merge K listas ordenadas, K elementos más pequeños', keywords: '"merge k", "k sorted"', template: 'Min-heap con (valor, lista, índice). Pop mínimo, push siguiente de esa lista.' },
    hints: ['Fuerza bruta: merge de a dos. O(N*K). Con heap: O(N log K).', 'Heap guarda el menor de cada lista. Al extraer, agregar el siguiente de esa lista.', 'En JS no hay heap nativo: podés implementar o usar un array y sort (menos óptimo).', 'const heap = new MinHeap((a,b) => a.val - b.val); lists.forEach(l => { if (l) heap.push(l); }); const dummy = new ListNode(0); let curr = dummy; while (heap.size()) { const node = heap.pop(); curr.next = node; curr = curr.next; if (node.next) heap.push(node.next); } return dummy.next;'],
    solution: { timeComplexity: 'O(N log K)', spaceComplexity: 'O(log K) recursión', patternUsed: 'Divide and Conquer (merge de a dos)', code: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (lists.length === 0) return null;
  return mergeRange(lists, 0, lists.length - 1);
}
function mergeRange(lists: (ListNode | null)[], left: number, right: number): ListNode | null {
  if (left === right) return lists[left];
  const mid = Math.floor((left + right) / 2);
  return mergeTwo(mergeRange(lists, left, mid), mergeRange(lists, mid + 1, right));
}
function mergeTwo(a: ListNode | null, b: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;
  while (a && b) {
    if (a.val <= b.val) { curr.next = a; a = a.next; }
    else { curr.next = b; b = b.next; }
    curr = curr.next;
  }
  curr.next = a ?? b;
  return dummy.next;
}`, commonErrors: ['Merge de a dos: divide and conquer evita heap.', 'mergeRange: caso base left===right.', 'mergeTwo: igual que Merge Two Sorted Lists.'], relatedProblems: ['#21 Merge Two Lists', '#215 Kth Largest', '#378 Kth Smallest in Matrix'] },
  },
  {
    id: 35,
    number: 76,
    name: 'Minimum Window Substring',
    leetcodeSlug: 'minimum-window-substring',
    difficulty: 'hard',
    module: 'Arrays & Strings + Hash Maps',
    tip: 'Sliding window con dos HashMaps — contraé por izquierda solo cuando la ventana contiene todos los caracteres',
    pattern: 'Sliding Window',
    patternReminder: { name: 'Sliding Window', module: 'Arrays & Strings', whenToUse: 'Substring que contiene todos los caracteres de T', keywords: '"minimum window", "substring"', template: 'Expandir right hasta tener todos. Contraer left mientras se mantenga válido. Trackear mínimo.' },
    hints: ['Necesitás saber: cuántos de cada char de T hay en la ventana actual. HashMap para T y para la ventana.', 'Expandir: agregar s[right]. Cuando la ventana tiene todos los chars de T, intentar contraer.', 'Contraer: mientras la ventana siga válida, left++. Actualizar el mínimo cuando contraés.', 'let left=0, need=Map of T, have=Map, count=0; for (let right=0; right<s.length; right++) { have.set(s[right], (have.get(s[right])||0)+1); if (have.get(s[right])<=need.get(s[right])) count++; while (count===t.length) { if (right-left+1<minLen) update; have.set(s[left], have.get(s[left])-1); if (have.get(s[left])<need.get(s[left])) count--; left++; } }'],
    solution: { timeComplexity: 'O(n + m)', spaceComplexity: 'O(m)', patternUsed: 'Sliding Window + 2 HashMaps', code: `function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c)||0)+1);
  const have = new Map<string, number>();
  let left = 0, count = 0, minStart = 0, minLen = Infinity;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    have.set(c, (have.get(c)||0)+1);
    if (have.get(c)! <= need.get(c)!) count++;
    while (count === t.length) {
      if (right - left + 1 < minLen) { minLen = right - left + 1; minStart = left; }
      const lc = s[left];
      have.set(lc, have.get(lc)!-1);
      if (have.get(lc)! < need.get(lc)!) count--;
      left++;
    }
  }
  return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
}`, commonErrors: ['count solo incrementa cuando have[c] <= need[c].', 'Al contraer, decrementar have antes de verificar count.', 'Manejar cuando no hay ventana válida.'], relatedProblems: ['#3 Longest Substring', '#209 Minimum Size Subarray', '#76 con optimización'] },
  },
];

// Helper para obtener ejercicios por nivel
export const getExercisesByLevel = () => {
  const easy = LEETCODE_EXERCISES.filter(e => e.difficulty === 'easy');
  const medium = LEETCODE_EXERCISES.filter(e => e.difficulty === 'medium');
  const hard = LEETCODE_EXERCISES.filter(e => e.difficulty === 'hard');
  return { easy, medium, hard };
};

export const LEETCODE_PATTERNS = [
  { id: 1, name: 'Two Pointers', when: 'array ordenado, suma de pares, palíndromos', problems: 'Two Sum, 3Sum, Valid Palindrome, Container With Most Water', template: 'let left = 0, right = n - 1;\nwhile (left < right) { /* ... */ }' },
  { id: 2, name: 'Sliding Window', when: 'substring, subarray, ventana variable', problems: 'Longest Substring, Min Window Substring', template: 'let left = 0;\nfor (let right = 0; right < n; right++) {\n  while (invalid) left++;\n}' },
  { id: 3, name: 'Fast & Slow Pointers', when: 'ciclos en linked list, punto medio', problems: 'Linked List Cycle, Middle of List', template: 'let slow = head, fast = head;\nwhile (fast?.next) { slow = slow.next; fast = fast.next.next; }' },
  { id: 4, name: 'Binary Search', when: 'array ordenado o espacio reducible', problems: 'Binary Search, First Bad Version', template: 'let left = 0, right = n - 1;\nwhile (left <= right) { const mid = ... }' },
  { id: 5, name: 'BFS/DFS', when: 'grafos, árboles, matrices', problems: 'Number of Islands, Flatten Tree', template: 'function dfs(node) { if (!node) return; dfs(node.left); dfs(node.right); }' },
  { id: 6, name: 'Dynamic Programming', when: 'subproblemas que se repiten', problems: 'Climbing Stairs, Coin Change', template: 'dp[i] = f(dp[i-1], dp[i-2], ...)' },
  { id: 7, name: 'Heap/Priority Queue', when: 'K elementos más grandes/pequeños', problems: 'Top K Frequent, Merge K Lists', template: 'const heap = new MinHeap();' },
  { id: 8, name: 'HashMap/HashSet', when: 'frecuencia, complementos, duplicados O(1)', problems: 'Two Sum, Contains Duplicate', template: 'const map = new Map(); if (map.has(c)) ...' },
];
