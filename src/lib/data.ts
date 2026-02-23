
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
