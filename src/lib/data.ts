
import { Module } from './types';

export const DSA_MODULES: Module[] = [
    {
        id: 'bigo',
        title: 'Complejidad Algorítmica — Big O',
        slug: 'big-o',
        quiz: [
            { question: '¿Cuál es la complejidad de acceder a un elemento en un array por su índice?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0 },
            { question: '¿Qué complejidad tiene un Binary Search?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'], correctAnswer: 2 },
            { question: 'Si tienes dos bucles anidados que recorren "n", ¿cuál es la complejidad?', options: ['O(n)', 'O(2n)', 'O(n^2)', 'O(log n)'], correctAnswer: 2 },
            { question: '¿Qué complejidad suele tener un algoritmo de recursión simple como Fibonacci sin memoización?', options: ['O(n)', 'O(log n)', 'O(2^n)', 'O(n^2)'], correctAnswer: 2 },
            { question: '¿En Big O se ignoran las constantes? (Ej: O(2n) -> O(n))', options: ['Sí', 'No'], correctAnswer: 0 },
            { question: '¿Qué significa O(n log n)?', options: ['Lineal', 'Cuadrática', 'Lineal-Logarítmica (típica de ordenamiento)', 'Exponencial'], correctAnswer: 2 },
            { question: '¿Qué complejidad de espacio tiene un algoritmo que crea una copia de un array de entrada?', options: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'], correctAnswer: 1 }
        ],
    },
    {
        id: 'arrays',
        title: 'Arrays & Strings',
        slug: 'arrays-strings',
        quiz: [
            { question: '¿Cuándo es ideal usar el patrón de Two Pointers?', options: ['Cuando el array es circular', 'Cuando el array está ordenado y buscas pares', 'Cuando necesitas ordenar el array', 'Siempre'], correctAnswer: 1 },
            { question: '¿Qué complejidad de tiempo tiene el algoritmo Two Sum en un array ordenado usando Two Pointers?', options: ['O(n^2)', 'O(log n)', 'O(n)', 'O(1)'], correctAnswer: 2 },
            { question: '¿Cuál es el objetivo principal de Sliding Window?', options: ['Reducir complejidad de O(n^2) a O(n) en sub-arrays', 'Ordenar un array', 'Invertir un string', 'Ninguna'], correctAnswer: 0 },
            { question: 'En 3Sum, ¿qué es lo más importante para evitar resultados duplicados?', options: ['Usar un Set', 'Ordenar y saltar elementos iguales', 'Usar recursión', 'No se puede evitar'], correctAnswer: 1 },
            { question: '¿Qué técnica es mejor para "Longest Substring Without Repeating Characters"?', options: ['Two Pointers fijos', 'Sliding Window con HashMap', 'Binary Search', 'Sorting'], correctAnswer: 1 },
            { question: '¿Qué complejidad de espacio tiene Two Sum usando un HashMap?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 1 },
            { question: '¿Cuál es la ventaja de Two Pointers sobre un HashMap en Two Sum?', options: ['Menor complejidad de tiempo', 'Menor complejidad de espacio (O(1))', 'Es más fácil de escribir', 'Ninguna'], correctAnswer: 1 }
        ]
    },
    {
        id: 'linked',
        title: 'Linked Lists',
        slug: 'linked-lists',
        quiz: [
            { question: '¿Qué ventaja tiene una Linked List sobre un Array?', options: ['Acceso aleatorio rápido', 'Inserción/Eliminación en O(1) en extremos', 'Uso de memoria contigua', 'Mejor caché locality'], correctAnswer: 1 },
            { question: '¿Cómo detectas un ciclo en una Linked List?', options: ['Con un solo puntero', 'Floyd’s Cycle-Finding Algorithm (Tortoise and Hare)', 'Llevando la cuenta de nodos', 'No se puede detectar'], correctAnswer: 1 },
            { question: '¿Qué complejidad tiene invertir una Linked List?', options: ['O(n^2)', 'O(log n)', 'O(n)', 'O(1)'], correctAnswer: 2 },
            { question: 'Para eliminar el N-ésimo nodo desde el final, ¿qué técnica es mejor?', options: ['Recorrer dos veces', 'Two Pointers con un gap de N', 'Recursión infinita', 'Convertir a array'], correctAnswer: 1 },
            { question: '¿Qué es una Doubly Linked List?', options: ['Una lista con dos copias de datos', 'Una lista donde cada nodo apunta al siguiente y al anterior', 'Una lista circular', 'Una lista con dos cabezas'], correctAnswer: 1 }
        ]
    },
    {
        id: 'stacks',
        title: 'Stacks & Queues',
        slug: 'stacks-queues',
        quiz: [
            { question: '¿Qué principio sigue un Stack?', options: ['FIFO', 'LIFO', 'LILO', 'Farsighted'], correctAnswer: 1 },
            { question: '¿Cuál es el uso principal de un Monotonic Stack?', options: ['Invertir una lista', 'Encontrar el siguiente elemento mayor/menor en O(n)', 'Implementar recursión', 'Ordenar un array'], correctAnswer: 1 },
            { question: '¿Qué estructura es mejor para un Level Order Traversal (BFS)?', options: ['Stack', 'Queue', 'Array', 'HashMap'], correctAnswer: 1 },
            { question: '¿Con qué operación de un Stack se resuelve el problema de los Paréntesis Válidos?', options: ['Pop/Push coincidiendo con apertura/cierre', 'Reverse', 'Sort', 'Search'], correctAnswer: 0 },
            { question: '¿Cómo implementas una Queue usando dos Stacks?', options: ['No es posible', 'Un stack para push y otro para pop (invirtiendo al vaciar)', 'Usando un stack para los pares y otro para impares', 'Copiando todo siempre'], correctAnswer: 1 }
        ]
    },
    {
        id: 'hashmaps',
        title: 'Hash Maps & Sets',
        slug: 'hash-maps',
        quiz: [
            { question: '¿Qué complejidad promedio tiene la inserción en un HashMap?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], correctAnswer: 2 },
            { question: '¿Qué ocurre en una colisión de hash?', options: ['Se borra el dato viejo', 'Se usa una técnica como encadenamiento o direccionamiento abierto', 'El programa crashea', 'Se duplica el hash'], correctAnswer: 1 },
            { question: '¿Para qué sirve un LRU Cache?', options: ['Para guardar todo para siempre', 'Para descartar el elemento menos recientemente usado al llenar la capacidad', 'Para ordenar datos', 'Para compresión'], correctAnswer: 1 },
            { question: '¿Qué estructuras combina un LRU Cache para lograr get/put en O(1)?', options: ['HashMap + Array', 'HashMap + Doubly Linked List', 'Two Stacks', 'BST + Queue'], correctAnswer: 1 },
            { question: '¿Qué ventaja tiene un Set sobre un Array para verificar existencia?', options: ['Usa menos memoria', 'Verificación en O(1) vs O(n)', 'Mantiene el orden', 'Permite duplicados'], correctAnswer: 1 }
        ]
    },
    {
        id: 'trees',
        title: 'Trees & BST',
        slug: 'trees-bst',
        quiz: [
            { question: 'En un BST, ¿dónde están los elementos menores al nodo actual?', options: ['A la derecha', 'A la izquierda', 'En el mismo nivel', 'En la raíz'], correctAnswer: 1 },
            { question: '¿Qué traversal de un BST devuelve los elementos ordenados?', options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'], correctAnswer: 2 },
            { question: '¿Qué complejidad tiene la búsqueda en un BST balanceado?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], correctAnswer: 1 },
            { question: '¿Cómo calculas el Max Path Sum de un árbol?', options: ['Solo DFS simple', 'DFS que retorna la mejor rama pero actualiza una variable global con el puente', 'BFS nivel por nivel', 'Cualquier traversal sirve'], correctAnswer: 1 },
            { question: '¿Qué es un Balanced Tree (como AVL)?', options: ['Un árbol con peso igual', 'Un árbol donde la diferencia de altura entre ramas es pequeña (<=1)', 'Un árbol con solo dos niveles', 'Un árbol lleno'], correctAnswer: 1 }
        ]
    },
    {
        id: 'graphs',
        title: 'Grafos',
        slug: 'graphs',
        quiz: [
            { question: '¿Qué algoritmo es mejor para encontrar el camino más corto en un grafo NO ponderado?', options: ['DFS', 'BFS', 'Dijkstra', 'Bellman-Ford'], correctAnswer: 1 },
            { question: '¿Cuándo usas Union Find?', options: ['Para ordenar nodos', 'Para verificar conectividad o componentes conexas en O(1) amortizado', 'Para caminos más cortos', 'Para buscar ciclos'], correctAnswer: 1 },
            { question: '¿Qué hace la "Path Compression" en Union Find?', options: ['Acorta los nombres de los nodos', 'Hace que todos los nodos apunten directamente a la raíz durante el find', 'Elimina nodos huérfanos', 'Reduce la memoria'], correctAnswer: 1 },
            { question: '¿Cuál es la complejidad de Dijkstra con un min-heap?', options: ['O(V + E)', 'O(E log V)', 'O(V^2)', 'O(E^2)'], correctAnswer: 1 },
            { question: '¿Qué problema resuelve Topological Sort?', options: ['Orden de ejecución con dependencias', 'Camino más largo', 'Flujo máximo', 'Coloración de grafos'], correctAnswer: 0 }
        ]
    },
    {
        id: 'heaps',
        title: 'Heaps',
        slug: 'heaps',
        quiz: [
            { question: '¿Cuál es la complejidad de insertar un elemento en un Heap?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 1 },
            { question: '¿Qué mantiene un Min-Heap en su raíz?', options: ['El elemento más grande', 'El elemento más pequeño', 'Cualquier elemento al azar', 'La mediana'], correctAnswer: 1 },
            { question: '¿Cómo encuentras la mediana de un stream de datos?', options: ['Ordenando siempre (O(n log n))', 'Usando dos heaps (Small-Max y Large-Min)', 'Con un array circular', 'No se puede en tiempo real'], correctAnswer: 1 },
            { question: 'En Python, ¿qué tipo de Heap implementa `heapq` por defecto?', options: ['Max-Heap', 'Min-Heap', 'Random-Heap', 'Fibonacci-Heap'], correctAnswer: 1 },
            { question: 'Para obtener los K elementos más frecuentes, ¿es mejor un Heap o Sort?', options: ['Sort (O(n log n))', 'Heap de tamaño K (O(n log k))', 'Ambos son iguales', 'Un Stack'], correctAnswer: 1 }
        ]
    },
    {
        id: 'trie',
        title: 'Trie',
        slug: 'trie',
        quiz: [
            { question: '¿Para qué es ideal un Trie?', options: ['Para números', 'Para búsqueda de prefijos de palabras eficientemente', 'Para grafos pesados', 'Para sorting'], correctAnswer: 1 },
            { question: '¿Qué tan rápido es buscar una palabra de longitud L en un Trie?', options: ['O(n)', 'O(L)', 'O(log n)', 'O(1)'], correctAnswer: 1 },
            { question: 'Cada nodo en un Trie puede tener hasta X hijos (para el alfabeto inglés):', options: ['2', '10', '26', 'Infinitos'], correctAnswer: 2 },
            { question: '¿Cómo marcas el final de una palabra en un Trie?', options: ['Con un puntero null', 'Con un booleano `isEndOfWord` o similar', 'Borrando el nodo', 'No se marca'], correctAnswer: 1 }
        ]
    },
    {
        id: 'dp',
        title: 'Dynamic Programming',
        slug: 'dynamic-programming',
        quiz: [
            { question: '¿Qué caracteriza a la Programación Dinámica?', options: ['Recursión simple', 'Subproblemas solapados y subestructura óptima', 'Sorting primero', 'Fuerza bruta pura'], correctAnswer: 1 },
            { question: '¿Qué es la Memoization?', options: ['Olvidar datos viejos', 'Guardar resultados de subproblemas en un cache (Top-Down)', 'Escribir notas en el código', 'Un tipo de sorting'], correctAnswer: 1 },
            { question: '¿Cuál es la diferencia entre Top-Down y Bottom-Up?', options: ['Ninguna', 'Top-Down es recursivo con memo; Bottom-Up es iterativo con tabla', 'Bottom-Up es más lento', 'Top-Down usa menos memoria siempre'], correctAnswer: 1 },
            { question: '¿Qué complejidad tiene Coin Change (mínimas monedas)?', options: ['O(n^2)', 'O(n * amount)', 'O(2^n)', 'O(log n)'], correctAnswer: 1 },
            { question: 'En el problema del Edit Distance, ¿qué opciones tienes en cada paso?', options: ['Solo insertar', 'Insertar, Borrar, Reemplazar', 'Sorting', 'Swap'], correctAnswer: 1 }
        ]
    },
    {
        id: 'backtrack',
        title: 'Backtracking',
        slug: 'backtracking',
        quiz: [
            { question: '¿Cuál es el core del Backtracking?', options: ['Iterar un array', 'Construir soluciones y "deshacer" (backtrack) cuando fallan', 'Binary search recursivo', 'Invertir una lista'], correctAnswer: 1 },
            { question: '¿Qué problema se resuelve clásicamente con Backtracking?', options: ['Binary Search', 'N-Queens / Sudoku Solver', 'Dijkstra', 'Sorting'], correctAnswer: 1 },
            { question: '¿Cómo evitas estados repetidos en Backtracking (ej. en Subsets)?', options: ['No se puede', 'Usando un `start` index o sorteando el input para saltar duplicados', 'Con un Stack adicional', 'Reiniciando todo'], correctAnswer: 1 },
            { question: '¿Qué estructura de datos suele usarse para las llamadas en Backtracking?', options: ['Queue', 'Recursion Stack', 'HashMap', 'LinkedList'], correctAnswer: 1 }
        ]
    },
    {
        id: 'bsearch',
        title: 'Binary Search',
        slug: 'binary-search',
        quiz: [
            { question: '¿Qué condición debe cumplir el espacio de búsqueda para usar Binary Search?', options: ['Debe ser circular', 'Debe estar ordenado o ser monótono', 'Debe ser pequeño', 'Debe tener números'], correctAnswer: 1 },
            { question: 'En "Koko Eating Bananas", ¿sobre qué hacemos Binary Search?', options: ['Sobre el array de bananas', 'Sobre el rango de velocidades posibles (espacio de respuestas)', 'Sobre el tiempo total', 'No se usa BS'], correctAnswer: 1 },
            { question: 'Si un problema pregunta por el "valor mínimo tal que se cumpla X", ¿qué patrón sospechas?', options: ['Sliding Window', 'Binary Search on Answer', 'DFS', 'Sort'], correctAnswer: 1 },
            { question: '¿Complejidad de Binary Search?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correctAnswer: 1 }
        ]
    },
    {
        id: 'sim',
        title: 'Simulacro Hard',
        slug: 'simulacro-hard',
        quiz: [
            { question: 'Para "Trapping Rain Water", ¿cuál es la solución O(1) space?', options: ['Arrays left_max y right_max', 'Two Pointers (L y R)', 'Stack monótono', 'Sorting'], correctAnswer: 1 },
            { question: 'En "Longest Increasing Path in a Matrix", ¿qué previene ciclos?', options: ['Un set de visitados', 'La condición de "estrictamente creciente"', 'Un contador de pasos', 'No se puede prevenir'], correctAnswer: 1 },
            { question: 'Si tienes que buscar un patrón de texto en un flujo gigante, ¿qué usarías?', options: ['HashMap', 'Trie o KMP Algorithm', 'Binary Search', 'Bubble Sort'], correctAnswer: 1 }
        ]
    },
    {
        id: 'topo',
        title: 'Topological Sort',
        slug: 'topological-sort',
        quiz: [
            { question: '¿Cuál es la complejidad de Kahn\'s Algorithm?', options: ['O(V)', 'O(E)', 'O(V+E)', 'O(V^2)'], correctAnswer: 2 }
        ]
    },
    {
        id: 'segtree',
        title: 'Segment Trees y Fenwick Trees',
        slug: 'segment-fenwick-trees',
        quiz: [
            { question: '¿Cuál es la complejidad de query en un Segment Tree?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 1 }
        ]
    },
    {
        id: 'graphs_adv',
        title: 'Algoritmos de Grafos Avanzados',
        slug: 'grafos-avanzados',
        quiz: [
            { question: '¿Qué algoritmo usarías para un grafo con pesos negativos?', options: ['Dijkstra', 'BFS', 'Bellman-Ford', 'Kruskal'], correctAnswer: 2 }
        ]
    },
    {
        id: 'strings_adv',
        title: 'String Algorithms Avanzados',
        slug: 'strings-avanzados',
        quiz: [
            { question: '¿Cuál es la complejidad del algoritmo KMP?', options: ['O(n*m)', 'O(n+m)', 'O(n^2)', 'O(log n)'], correctAnswer: 1 }
        ]
    },
    {
        id: 'bits_adv',
        title: 'Bit Manipulation Profundo',
        slug: 'bit-manipulation-profundo',
        quiz: [
            { question: '¿Qué hace la operación n & (n-1)?', options: ['Multiplica por 2', 'Elimina el bit menos significativo encendido', 'Aísla el bit menos significativo', 'Nada'], correctAnswer: 1 }
        ]
    },
    {
        id: 'sorting_adv',
        title: 'Quick Select y Sorting Avanzado',
        slug: 'quick-select-sorting-avanzado',
        quiz: [
            { question: '¿Cuál es el tiempo promedio de Quick Select?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], correctAnswer: 0 }
        ]
    },
    {
        id: 'hard_complete',
        title: 'Problemas Hard Completos',
        slug: 'problemas-hard-completos',
        quiz: [
            { question: 'En DP en intervalos (ej. Burst Balloons), ¿qué iteramos típicamente primero?', options: ['Izquierda a derecha', 'Derecha a izquierda', 'Tamaño del intervalo', 'Cualquiera'], correctAnswer: 2 }
        ]
    }
];

export const FLUTTER_MODULES: Module[] = [
    {
        id: 'mod1',
        title: 'Dart — El Lenguaje Base',
        slug: 'dart-base',
        quiz: [
            { question: '¿En qué tiempo se evalúa una variable declarada con "final"?', options: ['Compilación', 'Ejecución (Runtime)', 'Nunca', 'Ambas'], correctAnswer: 1 },
            { question: '¿Qué operador se usa para acceso seguro a nulos?', options: ['!', '?', '?.', '??'], correctAnswer: 2 },
            { question: '¿Cuál es la diferencia entre "final" y "const"?', options: ['Final es para números solamente', 'Const es una constante en tiempo de compilación; Final en tiempo de ejecución', 'Ninguna', 'Const puede cambiar'], correctAnswer: 1 },
            { question: '¿Qué hace el operador "??" en Dart?', options: ['Acceso nulo', 'Operador null-coalescing (retorna valor si no es nulo, sino el de la derecha)', 'Comparación triple', 'Crashea el app'], correctAnswer: 1 },
            { question: '¿Qué es un Future en Dart?', options: ['Un valor que estará disponible más adelante (async)', 'Un tipo de dato para fechas', 'Un Widget especial', 'Una clase deprecated'], correctAnswer: 0 },
            { question: '¿Qué es un Stream?', options: ['Un solo valor futuro', 'Una secuencia de eventos asíncronos', 'Una base de datos', 'Un tipo de loop'], correctAnswer: 1 },
            { question: '¿Para qué sirve el modificador "late"?', options: ['Para variables que se inicializan después (promesa de inicialización)', 'Para código lento', 'Para indicar error', 'Para borrar variables'], correctAnswer: 0 }
        ]
    },
    {
        id: 'mod2',
        title: 'Flutter Core',
        slug: 'flutter-core',
        quiz: [
            { question: '¿Qué es un Widget en Flutter?', options: ['Un botón solamente', 'La unidad básica de la UI (todo es un widget)', 'Una clase de backend', 'Un plugin'], correctAnswer: 1 },
            { question: '¿Diferencia entre StatelessWidget y StatefulWidget?', options: ['Ninguna', 'Stateless no cambia su estado interno; Stateful sí puede', 'Stateless es más rápido siempre', 'Stateful es solo para animaciones'], correctAnswer: 1 },
            { question: '¿Cuál es el ciclo de vida de un State?', options: ['init, draw, end', 'initState, build, dispose', 'start, build, stop', 'create, update, delete'], correctAnswer: 1 },
            { question: '¿Para qué sirve el `context` en el método build?', options: ['Para guardar fotos', 'Para ubicar el widget en el árbol y acceder a temas/mediaquery', 'Es opcional', 'Para debugear'], correctAnswer: 1 },
            { question: '¿Qué widget usarías para una lista de 1000 elementos?', options: ['Column + SingleChildScrollView', 'ListView.builder', 'Row', 'Stack'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod3',
        title: 'Navegación',
        slug: 'navigation',
        quiz: [
            { question: '¿Qué librería es la recomendada para navegación declarativa moderna?', options: ['Navigator 1.0', 'GoRouter', 'UrlLauncher', 'PathProvider'], correctAnswer: 1 },
            { question: '¿Qué significa "Deep Linking"?', options: ['Navegar muy profundo', 'Navegar a una ruta específica desde un link externo', 'Es un error de links', 'Links en el footer'], correctAnswer: 1 },
            { question: '¿Para qué sirve `Navigator.pushNamed`?', options: ['Para navegar usando una ruta definida por un string', 'Para borrar la pantalla', 'Para cambiar el nombre del app', 'No existe'], correctAnswer: 0 }
        ]
    },
    {
        id: 'mod4',
        title: 'Gestión de Estado',
        slug: 'state-management',
        quiz: [
            { question: '¿Por qué `setState` no es suficiente para apps grandes?', options: ['Porque es muy difícil de escribir', 'Porque acopla lógica y UI y no escala bien entre pantallas', 'Porque es lento', 'Porque Google lo prohibió'], correctAnswer: 1 },
            { question: '¿Cuál es la ventaja de Riverpod sobre Provider?', options: ['No depende de BuildContext y es type-safe', 'Es más viejo', 'Usa menos RAM', 'No tiene ventajas'], correctAnswer: 0 },
            { question: '¿Qué patrón separa Eventos de Estados?', options: ['Provider', 'BLoC (Business Logic Component)', 'Redux', 'MVC'], correctAnswer: 1 },
            { question: '¿Qué hace un `Consumer` en Riverpod?', options: ['Borra datos', 'Escucha y rebuild el widget cuando el provider cambia', 'Es un usuario del app', 'Crea una base de datos'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod5',
        title: 'Arquitectura',
        slug: 'architecture',
        quiz: [
            { question: '¿En qué se basa Clean Architecture?', options: ['En tener una sola carpeta', 'En separar capas (Data, Domain, Presentation) con dependencias hacia adentro', 'En no usar paquetes externos', 'En usar un solo archivo'], correctAnswer: 1 },
            { question: '¿Qué es el "Domain Layer"?', options: ['Donde están los logos', 'El corazón del app con entidades y casos de uso sin lógica de UI o API', 'Donde se hacen los llamados HTTP', 'La base de datos'], correctAnswer: 1 },
            { question: '¿Para qué sirve la Inyección de Dependencias?', options: ['Para meter virus', 'Para proveer instancias a clases sin que ellas las creen, facilitando testing', 'Para decorar el código', 'No sirve para nada'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod6',
        title: 'APIs & HTTP',
        slug: 'apis-http',
        quiz: [
            { question: '¿Qué paquete es el estándar para HTTP con soporte para interceptores?', options: ['http', 'dio', 'fetch', 'axios'], correctAnswer: 1 },
            { question: '¿Para qué sirve un Interceptor?', options: ['Para interceptar llamadas y agregar tokens de auth automáticamente', 'Para hackear', 'Para cambiar el color del header', 'Para nada'], correctAnswer: 0 },
            { question: '¿Cómo conviertes un JSON a un objeto en Dart?', options: ['jsonEncode', 'jsonDecode + Factory constructor (fromJson)', 'Dart lo hace solo', 'Copiando a mano'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod7',
        title: 'Storage & Firebase',
        slug: 'storage-firebase',
        quiz: [
            { question: '¿Qué servicio de Firebase usas para base de datos NoSQL en tiempo real?', options: ['Auth', 'Cloud Firestore', 'Analytics', 'Functions'], correctAnswer: 1 },
            { question: '¿Para qué sirve `Shared Preferences`?', options: ['Para archivos pesados', 'Para persistencia simple de clave-valor (ej. configuraciones)', 'Para fotos', 'Para nada'], correctAnswer: 1 },
            { question: '¿Cuál es la ventaja de Hive sobre SQLite?', options: ['Es NoSQL muy veloz y escrito en puramente Dart', 'Es de Microsoft', 'No necesita setup', 'Es para backups'], correctAnswer: 0 }
        ]
    },
    {
        id: 'mod8',
        title: 'Testing',
        slug: 'testing',
        quiz: [
            { question: '¿Qué tipos de tests soporta Flutter?', options: ['Solo unitarios', 'Unit, Widget y Integration tests', 'Manuales únicamente', 'No soporta testing'], correctAnswer: 1 },
            { question: '¿Qué hace un Mock?', options: ['Es una burla al código', 'Simula una dependencia (ej. API) para testear aisladamente', 'Borra los datos', 'Crashea el test'], correctAnswer: 1 },
            { question: '¿Cómo disparas un click en un Widget Test?', options: ['tester.tap()', 'tester.click()', 'tester.touch()', 'document.click()'], correctAnswer: 0 }
        ]
    },
    {
        id: 'mod9',
        title: 'Git & Workflow',
        slug: 'git-workflow',
        quiz: [
            { question: '¿Qué es GitFlow?', options: ['Un comando de git', 'Un workflow de ramas (main, develop, feature, etc.)', 'Un tipo de widget', 'Un buscador'], correctAnswer: 1 },
            { question: '¿Para qué sirve CI/CD?', options: ['Para programar más rápido', 'Para automatizar tests y despliegues (Github Actions, Codemagic)', 'Para cargar el celular', 'Para nada'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod10',
        title: 'Performance',
        slug: 'performance',
        quiz: [
            { question: '¿Cómo evitas rebuilds innecesarios?', options: ['Usando `const` en widgets y providers atómicos', 'Borrando widgets', 'Reiniciando el app', 'No se puede'], correctAnswer: 0 },
            { question: '¿Qué herramienta de DevTools sirve para ver el lag?', options: ['Network', 'Performance / Performance Overlay', 'Logging', 'Debugger'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod11',
        title: 'Simulacro',
        slug: 'simulacro',
        quiz: [
            { question: '¿Qué responderías sobre el manejo de memoria en Flutter?', options: ['Flutter no maneja memoria', 'Dart tiene un Garbage Collector y Flutter maneja el árbol de widgets eficientemente', 'Se maneja a mano como C++', 'Es un misterio'], correctAnswer: 1 },
            { question: '¿Cómo manejas errores globales en el app?', options: ['Con prints', 'FlutterError.onError y Zone guards', 'Con un try-catch gigante', 'Ignorándolos'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod12',
        title: 'Rendering Pipeline',
        slug: 'rendering-pipeline',
        quiz: [
            { question: '¿Cuáles son los tres árboles principales de Flutter?', options: ['State, Build, Context', 'Widget, Element, RenderObject', 'Dart, C++, Skia', 'UI, Logic, Data'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod13',
        title: 'Isolates y Concurrencia',
        slug: 'isolates-concurrencia',
        quiz: [
            { question: '¿Para qué sirve la función `compute`?', options: ['Para sumar números', 'Para ejecutar una función costosa en un Isolate secundario sin bloquear la UI', 'Para hacer peticiones HTTP más rápido', 'Para renderizar 3D'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod14',
        title: 'Animaciones',
        slug: 'animaciones',
        quiz: [
            { question: '¿Qué genera los valores continuos para una animación a lo largo del tiempo?', options: ['AnimationController', 'setState', 'Un timer manual', 'Future.delayed'], correctAnswer: 0 }
        ]
    },
    {
        id: 'mod15',
        title: 'Accessibility y l10n',
        slug: 'accessibility-l10n',
        quiz: [
            { question: '¿Qué widget provee descripciones para lectores de pantalla?', options: ['Text', 'Semantics', 'Tooltip', 'A11yWidget'], correctAnswer: 1 }
        ]
    },
    {
        id: 'mod16',
        title: 'CI/CD y Releases',
        slug: 'ci-cd-releases',
        quiz: [
            { question: '¿Para qué sirve CI/CD en un proyecto móvil?', options: ['Para automatizar análisis, testing y despliegues', 'Solo para subir el código a GitHub', 'Para diseñar la interfaz', 'No sirve de nada'], correctAnswer: 0 }
        ]
    },
    {
        id: 'mod17',
        title: 'Design System',
        slug: 'design-system',
        quiz: [
            { question: '¿Qué versión de Material Design promueve el uso de `ColorScheme.fromSeed`?', options: ['Material 1', 'Material 2', 'Material 3', 'Cupertino'], correctAnswer: 2 }
        ]
    }
];

export const FS_MODULES: Module[] = [
    {
        id: 'fs1',
        title: 'JavaScript Fundamentos',
        slug: 'js-fundamentals',
        quiz: [
            { question: '¿Cuál es la diferencia de scope entre var y let?', options: ['Ambos tienen scope de bloque', 'var tiene scope de función, let tiene scope de bloque', 'let tiene scope de función', 'No hay diferencia'], correctAnswer: 1 },
            { question: '¿Qué valores son falsy en JavaScript?', options: ['Solo false y null', 'false, 0, "", null, undefined, NaN', 'Solo undefined', 'Todos los primitivos'], correctAnswer: 1 },
            { question: '¿Qué retorna [] === []?', options: ['true', 'false', 'undefined', 'Error'], correctAnswer: 1 },
            { question: '¿Qué es un closure?', options: ['Una función que recuerda variables del scope donde fue creada', 'Un tipo de loop', 'Un error de JavaScript', 'Una variable global'], correctAnswer: 0 },
            { question: '¿Qué hace el operador ?. (optional chaining)?', options: ['Compara valores', 'Corta el acceso si el valor es null/undefined', 'Asigna un valor por defecto', 'Nada'], correctAnswer: 1 },
            { question: '¿Qué diferencia hay entre ?? y ||?', options: ['Ninguna', '?? solo considera null/undefined, || considera todos los falsy', '|| es más estricto', '?? solo usa strings'], correctAnswer: 1 },
            { question: '¿Qué complejidad tiene el Event Loop de JavaScript?', options: ['Multi-threaded', 'Single-threaded con non-blocking I/O', 'Dual-threaded', 'No tiene event loop'], correctAnswer: 1 },
            { question: '¿Qué hace async/await?', options: ['Ejecuta código en paralelo', 'Permite escribir código asíncrono como síncrono', 'Bloquea el hilo principal', 'Solo para fetch'], correctAnswer: 1 },
            { question: '¿Qué hace Promise.all?', options: ['Ejecuta una sola promesa', 'Ejecuta todas en paralelo, falla si una falla', 'Ejecuta en secuencia', 'Solo para arrays'], correctAnswer: 1 },
            { question: '¿Cuál es la diferencia entre import y require?', options: ['Son iguales', 'import es ES Modules (estático), require es CommonJS (dinámico)', 'require es más rápido', 'import no existe en Node'], correctAnswer: 1 }
        ]
    },
    {
        id: 'fs2',
        title: 'TypeScript Esencial',
        slug: 'typescript-esencial',
        quiz: [
            { question: '¿Cuál es el problema de usar any?', options: ['Es más lento', 'Desactiva el type checker y pierdes los beneficios de TS', 'No existe en TypeScript', 'Solo afecta en runtime'], correctAnswer: 1 },
            { question: '¿Qué hace unknown en TypeScript?', options: ['Es igual a any', 'Requiere type narrowing antes de usar', 'Solo para números', 'No existe'], correctAnswer: 1 },
            { question: '¿Cuándo usar interface vs type?', options: ['Siempre interface', 'interface para objetos, type para unions y utilidades', 'Siempre type', 'Son intercambiables sin diferencia'], correctAnswer: 1 },
            { question: '¿Qué es un Generic en TypeScript?', options: ['Un tipo fijo', 'Un parámetro de tipo que se infiere o especifica', 'Solo para arrays', 'Un tipo deprecated'], correctAnswer: 1 },
            { question: '¿Qué hace Partial<T>?', options: ['Hace todo required', 'Hace todas las propiedades opcionales', 'Elimina propiedades', 'Copia el tipo'], correctAnswer: 1 },
            { question: '¿Qué hace Pick<T, K>?', options: ['Elimina propiedades', 'Selecciona solo las propiedades K de T', 'Copia todo', 'No existe'], correctAnswer: 1 },
            { question: '¿Los tipos de TypeScript existen en runtime?', options: ['Sí', 'No, se eliminan al compilar', 'Solo en desarrollo', 'Depende'], correctAnswer: 1 },
            { question: '¿Qué es type narrowing?', options: ['Reducir el tamaño del tipo', 'Reducir el tipo a uno más específico con condicionales o type guards', 'Borrar tipos', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué hace Omit<T, K>?', options: ['Elige K de T', 'Crea un tipo sin las propiedades K', 'Copia T', 'No existe'], correctAnswer: 1 },
            { question: '¿Cuándo usar type assertion (as)?', options: ['Siempre que sea posible', 'Cuando sabés más que el compilador (API, DOM), con precaución', 'Nunca', 'Solo para any'], correctAnswer: 1 }
        ]
    },
    {
        id: 'fs3',
        title: 'HTML & CSS Producción',
        slug: 'html-css',
        quiz: [
            { question: '¿Qué es la div-itis?', options: ['Usar muchos divs sin estructura semántica', 'Un error de React', 'Un framework CSS', 'No existe'], correctAnswer: 0 },
            { question: '¿Qué hace box-sizing: border-box?', options: ['Aumenta el padding', 'Incluye padding y border en el width', 'Solo afecta margin', 'No hace nada'], correctAnswer: 1 },
            { question: '¿Cuándo usar Flexbox vs Grid?', options: ['Siempre Grid', 'Flexbox para una dimensión, Grid para dos', 'Siempre Flexbox', 'Son iguales'], correctAnswer: 1 },
            { question: '¿Qué es mobile-first?', options: ['Diseñar solo para móvil', 'Empezar con estilos base móvil y agregar media queries para desktop', 'Ignorar desktop', 'Un framework'], correctAnswer: 1 },
            { question: '¿Qué elemento HTML es para navegación?', options: ['div', 'nav', 'menu', 'header'], correctAnswer: 1 },
            { question: '¿Qué es rem en CSS?', options: ['Relativo al viewport', 'Relativo al font-size del root', 'Relativo al padre', 'Un valor fijo'], correctAnswer: 1 },
            { question: '¿Qué hace auto-fill en Grid?', options: ['Llena automáticamente', 'Crea columnas automáticas que caben en el espacio', 'Es un error', 'Solo para flex'], correctAnswer: 1 },
            { question: '¿Qué elemento es para contenido principal?', options: ['div', 'section', 'main', 'content'], correctAnswer: 2 },
            { question: '¿Qué es una variable CSS (custom property)?', options: ['Una constante en JS', '--nombre: valor; para reutilizar en el CSS', 'Solo en preprocesadores', 'No existe'], correctAnswer: 1 },
            { question: '¿Por qué colapsan los márgenes?', options: ['Es un bug', 'Comportamiento del CSS: márgenes verticales adyacentes se fusionan', 'Solo en flexbox', 'Por el box model'], correctAnswer: 1 }
        ]
    },
    {
        id: 'fs4',
        title: 'React Core',
        slug: 'react-core',
        quiz: [
            { question: '¿Qué es JSX?', options: ['HTML puro', 'Syntactic sugar para React.createElement', 'Un lenguaje nuevo', 'Solo para componentes'], correctAnswer: 1 },
            { question: '¿Las props en React son mutables?', options: ['Sí', 'No, son inmutables', 'Solo en class components', 'Depende'], correctAnswer: 1 },
            { question: '¿Qué causa un re-render en React?', options: ['Cualquier cambio', 'Cambio de estado (useState) o props', 'Solo props', 'Solo eventos'], correctAnswer: 1 },
            { question: '¿Puedes mutar el estado directamente?', options: ['Sí', 'No, siempre usar setState', 'Solo en class components', 'Solo en arrays'], correctAnswer: 1 },
            { question: '¿Cuándo corre useEffect?', options: ['Solo al montar', 'Según el array de dependencias', 'Nunca', 'Solo al desmontar'], correctAnswer: 1 },
            { question: '¿Para qué sirve useRef?', options: ['Para estado', 'Para referencias DOM o valores que no causan re-render', 'Para efectos', 'Solo para formularios'], correctAnswer: 1 },
            { question: '¿Qué regla tienen los Hooks?', options: ['Solo en class components', 'Orden constante, no en condicionales o loops', 'Pueden estar en cualquier orden', 'Solo useMemo'], correctAnswer: 1 },
            { question: '¿Cuándo usar useMemo?', options: ['Siempre', 'Para cálculos costosos que necesitan memorización', 'Nunca', 'Solo para objetos'], correctAnswer: 1 },
            { question: '¿Qué es el prop drilling?', options: ['Un bug', 'Pasar props por muchos niveles de componentes', 'Un patrón de React', 'Solo para context'], correctAnswer: 1 },
            { question: '¿Qué resuelve useContext?', options: ['Performance', 'Estado global sin prop drilling', 'Solo temas', 'Nada'], correctAnswer: 1 }
        ]
    },
    {
        id: 'fs5',
        title: 'Node.js & Express',
        slug: 'node-express',
        quiz: [
            { question: '¿Por qué Node.js es single-threaded?', options: ['Por limitación', 'Usa event loop para I/O no bloqueante', 'Es multi-threaded', 'Solo en desarrollo'], correctAnswer: 1 },
            { question: '¿Qué es un middleware en Express?', options: ['Un plugin', 'Función que recibe req, res, next y procesa la request', 'Solo para auth', 'Un error handler'], correctAnswer: 1 },
            { question: '¿Por qué importa el orden de los middlewares?', options: ['No importa', 'Se ejecutan en orden secuencial', 'Solo el primero corre', 'Solo para performance'], correctAnswer: 1 },
            { question: '¿Cuántos parámetros tiene el middleware de error?', options: ['2', '3', '4 (err, req, res, next)', '1'], correctAnswer: 2 },
            { question: '¿Qué convención HTTP para crear un recurso?', options: ['GET', 'POST', 'PUT', 'PATCH'], correctAnswer: 1 },
            { question: '¿Qué status code para "no autorizado"?', options: ['400', '401', '403', '404'], correctAnswer: 1 },
            { question: '¿Cómo guardar passwords?', options: ['En texto plano', 'Con bcrypt (hash)', 'Con md5', 'Encriptado reversible'], correctAnswer: 1 },
            { question: '¿Qué hace dotenv?', options: ['Carga variables de entorno desde .env', 'Es un framework', 'Solo para producción', 'No existe'], correctAnswer: 0 },
            { question: '¿Qué es JWT?', options: ['Un framework', 'Token firmado con payload (userId, exp)', 'Solo para cookies', 'Un lenguaje'], correctAnswer: 1 },
            { question: '¿Qué es CORS?', options: ['Un framework', 'Política del navegador para requests cross-origin', 'Solo para APIs', 'Un error de Node'], correctAnswer: 1 }
        ]
    },
    {
        id: 'fs6',
        title: 'SQL & PostgreSQL',
        slug: 'sql-postgresql',
        quiz: [
            { question: '¿Qué diferencia hay entre INNER JOIN y LEFT JOIN?', options: ['Ninguna', 'INNER: solo coincidencias; LEFT: todos de la izquierda', 'LEFT es más rápido', 'INNER incluye más filas'], correctAnswer: 1 },
            { question: '¿Qué es el error N+1?', options: ['Un error de sintaxis', 'Un query + N queries por cada resultado (ej. por cada usuario)', 'Solo en NoSQL', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué hace GROUP BY?', options: ['Ordena', 'Agrupa filas por criterio', 'Filtra', 'Elimina duplicados'], correctAnswer: 1 },
            { question: '¿Cuándo usar HAVING vs WHERE?', options: ['Son iguales', 'WHERE filtra filas, HAVING filtra grupos', 'HAVING es más rápido', 'Solo WHERE existe'], correctAnswer: 1 },
            { question: '¿Qué significa ACID?', options: ['Un framework', 'Atomicidad, Consistencia, Aislamiento, Durabilidad', 'Solo para NoSQL', 'Un tipo de base'], correctAnswer: 1 },
            { question: '¿Para qué sirven los índices?', options: ['Para ordenar', 'Para acelerar búsquedas en columnas', 'Para backup', 'Solo decorativos'], correctAnswer: 1 },
            { question: '¿Qué es una foreign key?', options: ['Una clave primaria', 'Referencia a otra tabla', 'Un índice único', 'Un constraint de tipo'], correctAnswer: 1 },
            { question: '¿Qué hace BEGIN en SQL?', options: ['Inicia una transacción', 'Comienza un script', 'Crea una tabla', 'Nada'], correctAnswer: 0 },
            { question: '¿Qué es una junction table?', options: ['Una tabla de unión para relaciones N:M', 'Una tabla temporal', 'Un tipo de índice', 'No existe'], correctAnswer: 0 },
            { question: '¿Qué hace ROLLBACK?', options: ['Deshace la transacción', 'Borra la tabla', 'Revierte el último commit', 'Nada'], correctAnswer: 0 }
        ]
    },
    {
        id: 'fs7',
        title: 'APIs REST & Data Fetching',
        slug: 'rest-data-fetching',
        quiz: [
            { question: '¿fetch rechaza en errores 4xx/5xx?', options: ['Sí', 'No, hay que chequear res.ok', 'Solo en 5xx', 'Depende'], correctAnswer: 1 },
            { question: '¿Qué es CORS?', options: ['Un framework', 'Política del navegador para requests cross-origin', 'Solo para APIs', 'Un error de Node'], correctAnswer: 1 },
            { question: '¿Qué hace useQuery de TanStack Query?', options: ['Solo mutations', 'Fetch con cache, loading, error automáticos', 'Reemplaza fetch', 'Solo para GET'], correctAnswer: 1 },
            { question: '¿Qué hace invalidateQueries?', options: ['Borra el cache', 'Marca queries como stale para refetch', 'Cierra la conexión', 'No existe'], correctAnswer: 1 },
            { question: '¿Dónde guardar el token?', options: ['Solo en localStorage', 'localStorage vs httpOnly cookie: httpOnly más seguro para XSS', 'Solo en memoria', 'En el HTML'], correctAnswer: 1 },
            { question: '¿Qué es AbortController?', options: ['Un framework', 'Para cancelar requests fetch', 'Solo para axios', 'No existe'], correctAnswer: 1 },
            { question: '¿Cuáles son los 3 estados de una llamada async?', options: ['pending, done, error', 'loading, error, data', 'fetch, success, fail', 'init, run, end'], correctAnswer: 1 },
            { question: '¿Para qué sirven los interceptors de axios?', options: ['Solo para logging', 'Para interceptar requests/responses (ej. agregar token)', 'Para cancelar', 'No existen'], correctAnswer: 1 },
            { question: '¿Qué es un optimistic update?', options: ['Actualizar UI antes de confirmar con el servidor', 'Esperar siempre al servidor', 'Un tipo de cache', 'No existe'], correctAnswer: 0 },
            { question: '¿Qué header para enviar JSON?', options: ['Content-Type: application/json', 'Accept: json', 'Type: json', 'JSON: true'], correctAnswer: 0 }
        ]
    },
    {
        id: 'fs8',
        title: 'Testing',
        slug: 'testing',
        quiz: [
            { question: '¿Qué filosofía sigue Testing Library?', options: ['Testear implementación', 'Testear comportamiento desde perspectiva del usuario', 'Solo unit tests', 'Solo mocks'], correctAnswer: 1 },
            { question: '¿Qué es mejor: userEvent o fireEvent?', options: ['Son iguales', 'userEvent simula mejor al usuario real', 'fireEvent siempre', 'Solo fireEvent existe'], correctAnswer: 1 },
            { question: '¿Cuándo usar jest.mock()?', options: ['Nunca', 'Para mockear módulos (fetch, APIs)', 'Solo para componentes', 'Solo en desarrollo'], correctAnswer: 1 },
            { question: '¿Qué es la pirámide de testing?', options: ['Más unitarios, menos e2e', 'Más e2e', 'Solo unitarios', 'Solo integración'], correctAnswer: 0 },
            { question: '¿Qué query usar para elementos por rol?', options: ['getByClass', 'getByRole', 'getById', 'getByTag'], correctAnswer: 1 },
            { question: '¿Qué hace Supertest?', options: ['Testing de componentes', 'Testing de APIs HTTP (Express)', 'Solo para React', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué es un mock?', options: ['Un error', 'Simulación de una dependencia para tests aislados', 'Un tipo de test', 'Solo para APIs'], correctAnswer: 1 },
            { question: '¿Qué hace beforeEach?', options: ['Corre después de cada test', 'Corre antes de cada test', 'Solo una vez', 'Solo para async'], correctAnswer: 1 },
            { question: '¿Qué matcher para verificar que un elemento existe?', options: ['toBe()', 'toBeInTheDocument()', 'toExist()', 'toRender()'], correctAnswer: 1 },
            { question: '¿Cuándo NO testear?', options: ['Siempre testear todo', 'Cuando el costo no justifica el beneficio o es código trivial', 'No hay excepciones', 'Solo en producción'], correctAnswer: 1 }
        ]
    },
    {
        id: 'fs9',
        title: 'Docker & Deploy',
        slug: 'docker-deploy',
        quiz: [
            { question: '¿Qué es una imagen Docker?', options: ['Un contenedor', 'Plantilla read-only para crear contenedores', 'Un volumen', 'Un comando'], correctAnswer: 1 },
            { question: '¿Qué es un contenedor?', options: ['Una imagen', 'Instancia en ejecución de una imagen', 'Un volumen', 'Un comando'], correctAnswer: 1 },
            { question: '¿Qué hace .dockerignore?', options: ['Nada', 'Excluye archivos del contexto de build (node_modules, .env)', 'Solo para producción', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué es un multi-stage build?', options: ['Múltiples imágenes en una', 'Build en una imagen, run en otra más ligera', 'Solo para Node', 'No existe'], correctAnswer: 1 },
            { question: '¿Para qué sirve docker-compose?', options: ['Solo para una app', 'Orquestar múltiples servicios (app + DB)', 'Solo para desarrollo', 'Solo para producción'], correctAnswer: 1 },
            { question: '¿Qué hace depends_on?', options: ['Orden de arranque de servicios', 'Dependencias de npm', 'Solo para DB', 'No existe'], correctAnswer: 0 },
            { question: '¿Qué son los volúmenes en Docker?', options: ['Solo para logs', 'Persistencia de datos entre reinicios', 'Solo para cache', 'No existen'], correctAnswer: 1 },
            { question: '¿Dónde guardar variables de producción?', options: ['En el código', 'En variables de entorno del host o secrets', 'En el Dockerfile', 'En git'], correctAnswer: 1 },
            { question: '¿Qué hace GitHub Actions?', options: ['Solo backups', 'CI/CD: automatizar tests y deploys', 'Solo para issues', 'No existe'], correctAnswer: 1 },
            { question: '¿Cuál es la instrucción por defecto en Dockerfile para ejecutar?', options: ['RUN', 'ENTRYPOINT', 'CMD', 'EXEC'], correctAnswer: 2 }
        ]
    },
    {
        id: 'fs10',
        title: 'Entrevistas Full Stack',
        slug: 'entrevistas-fullstack',
        quiz: [
            { question: '¿Qué es el Event Loop?', options: ['Un loop de eventos en React', 'Mecanismo que permite JS single-threaded manejar async', 'Solo en Node', 'Un error'], correctAnswer: 1 },
            { question: '¿Qué es un closure?', options: ['Un bug', 'Función que recuerda variables del scope donde fue creada', 'Solo en React', 'Un tipo de loop'], correctAnswer: 1 },
            { question: '¿REST vs GraphQL?', options: ['Son iguales', 'REST: recursos/verbos HTTP; GraphQL: query language, flexible', 'GraphQL reemplaza REST', 'Solo REST existe'], correctAnswer: 1 },
            { question: '¿Cómo funciona JWT?', options: ['Solo en cookies', 'Token firmado con payload, servidor verifica firma sin guardar sesión', 'Es un framework', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué es CORS?', options: ['Un framework', 'Política del navegador para requests cross-origin', 'Solo para APIs', 'Un error'], correctAnswer: 1 },
            { question: '¿Por qué las reglas de los Hooks?', options: ['Por performance', 'React depende del orden de llamadas para asociar estado', 'Por seguridad', 'No hay razón'], correctAnswer: 1 },
            { question: '¿Qué es el Virtual DOM?', options: ['Un framework', 'Representación en memoria del DOM para diff eficiente', 'Solo en Vue', 'No existe'], correctAnswer: 1 },
            { question: '¿Cuándo usar SQL vs NoSQL?', options: ['Siempre SQL', 'SQL: datos relacionales; NoSQL: flexible, documental, etc.', 'Siempre NoSQL', 'Son iguales'], correctAnswer: 1 },
            { question: '¿Qué son los índices en base de datos?', options: ['Backups', 'Estructuras que aceleran búsquedas', 'Solo para primary keys', 'No existen'], correctAnswer: 1 },
            { question: '¿Qué significa ACID?', options: ['Un framework', 'Atomicidad, Consistencia, Aislamiento, Durabilidad', 'Solo para NoSQL', 'Un tipo de base'], correctAnswer: 1 },
            { question: '¿Cómo describir un proyecto en entrevista?', options: ['Solo tecnologías', 'Problema que resolvía + solución técnica + resultado', 'Solo el código', 'No importa'], correctAnswer: 1 },
            { question: '¿Qué es prop drilling?', options: ['Un bug de React', 'Pasar props por muchos niveles', 'Solo para context', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué hace useEffect?', options: ['Solo fetch', 'Side effects (fetch, suscripciones) con control de dependencias', 'Reemplaza useState', 'Solo al montar'], correctAnswer: 1 },
            { question: '¿Qué es el callback hell?', options: ['Un error', 'Callbacks anidados que hacen código ilegible', 'Solo en Node', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué hace Promise.all?', options: ['Una sola promesa', 'Ejecuta todas en paralelo, falla si una falla', 'Ejecuta en secuencia', 'Solo para arrays'], correctAnswer: 1 },
            { question: '¿Cuál es la diferencia entre let y const?', options: ['Solo el nombre', 'const no permite reasignación', 'let es más rápido', 'No hay diferencia'], correctAnswer: 1 },
            { question: '¿Qué es un middleware en Express?', options: ['Un plugin', 'Función (req, res, next) que procesa la request', 'Solo para auth', 'Un error handler'], correctAnswer: 1 },
            { question: '¿Qué hace bcrypt?', options: ['Encripta reversiblemente', 'Hash de passwords (una vía)', 'Solo para tokens', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué es el error N+1?', options: ['Un error de sintaxis', '1 query + N queries por cada resultado', 'Solo en NoSQL', 'No existe'], correctAnswer: 1 },
            { question: '¿Qué es un Generic en TypeScript?', options: ['Un tipo fijo', 'Parámetro de tipo que se infiere o especifica', 'Solo para arrays', 'Deprecated'], correctAnswer: 1 }
        ]
    }
];
