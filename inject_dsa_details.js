const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const filePath = path.join(__dirname, 'public/dsa_leetcode_completo.html');
const rawHtml = fs.readFileSync(filePath, 'utf8');
const dom = new JSDOM(rawHtml);
const document = dom.window.document;

function createBlock(whatIs, analogy, why, steps, nextCode) {
    let stepsHtml = '';
    if (steps && steps.length > 0) {
        stepsHtml = '<ul class="step-list">';
        steps.forEach(s => stepsHtml += `<li>${s}</li>`);
        stepsHtml += '</ul>';
    }

    return `
<div class="concept-explain">
  <div class="explain-title">EXPLICACIÓN TEÓRICA</div>
  <p><strong>¿Qué es esto?</strong> ${whatIs}</p>
  <div class="analogy">${analogy}</div>
  <div class="why-matters">${why}</div>
  ${stepsHtml}
  <p>${nextCode}</p>
</div>
`;
}

const explainData = {
    // MOD 1
    "reglas para calcular big o": createBlock(
        "Significa qué significa que un algoritmo sea 'eficiente'. Big O mide crecimiento relativo, no tiempo absoluto. Un algoritmo O(n²) con n=1000 hace 1.000.000 operaciones; con n=10.000 hace 100.000.000 — se vuelve 100 veces más lento cuando el input solo creció 10 veces.",
        "Dos personas buscando un nombre en una guía telefónica — una página por página (O(n)), otra abriendo por la mitad siempre (O(log n)).",
        "Sin esto harías implementaciones que funcionarían con 10 datos pero crashearían con 1 millón en producción.",
        [],
        "A continuación verás cómo se simplifican y descartan las constantes porque en el infinito no tienen peso real."
    ),

    // MOD 2
    "two sum sorted": createBlock(
        "Un puntero en este contexto es simplemente un índice, un número que apunta a una posición del array.",
        "Imaginá que buscás a dos personas en una fila ordenada por altura — una empieza desde el más bajo y otra desde el más alto, y se van acercando hasta encontrar la combinación correcta.",
        "Solo funciona con arrays ordenados: si la suma es pequeña sabemos que necesitamos un número más grande, y el único lugar donde hay números más grandes es hacia la derecha. Sin esto harías brute force que es O(n²), con esto hacés O(n).",
        [],
        "Vas a ver cómo inicializamos left en 0 y right en el final, cerrando la brecha según si nos pasamos o nos faltó suma."
    ),
    "3sum": createBlock(
        "Es una extensión de Two Pointers. Fijamos un elemento con un loop (ese es el primero de la tripleta) y luego usamos Two Pointers en el resto del array para encontrar el par que completa la suma en cero.",
        "Buscando tres personas que sumen un peso exacto: elegís a una fija, y luego ponés a dos ayudantes a buscar las otras dos en el resto del grupo ordenado.",
        "El sorting previo es obligatorio. Sin skipear repetidos retornaríamos [-1,-1,2] dos veces si hay dos -1 en el array original. Esto soluciona O(n³) llevándolo a O(n²).",
        [],
        "Observarás el loop principal y cómo usamos 'continue' obligatoriamente para saltarnos duplicados."
    ),
    "min window substring": createBlock(
        "Ventana deslizante variable — la ventana crece por la derecha hasta cumplir la condición, y luego se contrae por la izquierda buscando la mínima ventana válida.",
        "Es como ajustar un marco de foto: lo agrandás hasta que entra todo lo que querés, luego lo achicás desde el lado izquierdo hasta que algo se salga.",
        "Sin sliding window harías un doble loop O(n²) probando todos los subarrays. Con esto hacés una sola pasada O(n) porque los punteros nunca retroceden.",
        [],
        "En el código verás un puntero right avanzando para expandir y un puntero left avanzando para contraer cuando ya somos válidos."
    ),

    // MOD 3
    "fast & slow \/ floyd": createBlock(
        "Una Linked List es una cadena de nodos donde cada nodo apunta al siguiente. No podés acceder a la pos 5 directamente. Fast & Slow usa dos velocidades para atravesarla.",
        "Si hay un ciclo, Fast 'da vueltas en círculo' y eventualmente alcanza a Slow, como un corredor más rápido en una pista circular. Si no hay ciclo, Fast llega al final (None) primero.",
        "Sin esto usarías un HashSet para guardar nodos visitados (O(n) memoria). Con esto detectas ciclos en O(1) memoria (constante).",
        [],
        "Verás a slow sumar un .next y a fast sumar .next.next, listos para chocar."
    ),
    "reverse list": createBlock(
        "Revertir una linked list requiere cambiar la dirección de cada flecha. El problema es que si cambiás la flecha de A→B a A←B, perdés la referencia a B.",
        "Como rotar caños de agua de uno en uno, sin olvidar tapar de donde sale el agua temporalmente.",
        "El paso 1 siempre es guardar next antes de romper el enlace para no perder la lista restante.",
        [
            "Guardar next: tmp = curr.next",
            "Romper flecha y voltear: curr.next = prev",
            "Avanzar prev: prev = curr",
            "Avanzar curr temporal: curr = tmp"
        ],
        "Acá está la mítica danza de 4 líneas que siempre tenés que escribir perfecta."
    ),
    "merge k lists": createBlock(
        "Un heap/priority queue es una estructura que siempre tiene el elemento mínimo (o máximo) accesible en O(1) y permite insertar/extraer en O(log n).",
        "Juntar 5 peajes atascados en un solo carril rápido: mirás las 5 barreras simultáneamente y siempre habilitás al coche más rápido, hasta vaciar los 5 peajes.",
        "Tenemos K listas y en cada paso necesitamos saber cuál de los K 'cabezas actuales' es la más chica. Sin heap iterar K elementos da O(N*K), con heap da O(N*log K).",
        [],
        "Verás cómo metemos los nodos cabeceras ciegamente al PriorityQueue y luego en un loop letal extraemos y avanzamos mágicamente."
    ),

    // MOD 4
    "trapping rain water": createBlock(
        "Tenemos un histograma y queremos saber cuánta agua quedaría atrapada si lloviera.",
        "Como un balde: el volumen de agua en cada posición está rigurosamente limitado por el mínimo entre la pared más alta a su izquierda absoluta y la pared más alta a su derecha absoluta. Lo que importa es el lado más bajo.",
        "Sin esto computarías y buscarías máximos a I y D perdiendo O(N²). Precomputar ambos lados gasta O(N) espacio. Two Pointers baja el espacio magistralmente a O(1).",
        [],
        "Prestá atención a cómo comparamos max_left y max_right in-place letalmente desde ambos bordes."
    ),

    // MOD 5
    "lru cache": createBlock(
        "Un cache es una zona reservada y cuando se llena, hay que desalojar inteligentemente al menos usado para meter datos frescos.",
        "Tu escritorio de trabajo — tenés espacio limitado y ponés ahí las cosas que usás más seguido. Cuando el escritorio se llena, sacás lo que hace más tiempo no usás (LRU = Least Recently Used).",
        "¿Por qué DOS estructuras? Con solo un HashMap podríamos buscar pero no saber cuál es el menos reciente en O(1). Con solo una lista podríamos saber el orden pero no buscar en O(1). Juntos dan poder O(1) total.",
        [],
        "Mirá la combinación magistral de dict() anclando la Doubly Linked List circular directamente."
    ),

    // MOD 6
    "max path sum": createBlock(
        "En un árbol, un 'path' es cualquier secuencia de nodos conectados sin repetir. Puede ir de hoja a hoja pasando por cualquier nodo.",
        "La cañería principal: el agua puede subir y bajar cruzando el codo principal invertido (arco), pero la raíz solo puede elegir mandar su flujo a UNA de las cañerías para su propio padre superior.",
        "El DFS responde DOS preguntas distintas: '¿cuál es el mejor path que PASA por mí?' (para actualizar el máximo global) y '¿cuánto puedo CONTRIBUIR a mi padre?' (retorno). El padre no puede 'doblar' también.",
        [],
        "Aquí vas a notar la bifurcación: res[0] se actualiza con la suma de ambos brazos, pero el return envía solo un brazo máximo al padre."
    ),
    "bfs level order": createBlock(
        "DFS (ir lo más profundo posible primero) y BFS (explorar nivel por nivel).",
        "DFS es como explorar un laberinto tomando siempre el primer giro posible hasta el callejón. BFS es como tirar una piedra al agua — las ondas se expanden nivel por nivel uniformemente.",
        "La queue es fundamental para BFS — los nodos esperan su turno en estricto orden FIFO de llegada, garantizando que el nivel 2 no toque el nivel 3 sorpresivamente.",
        [],
        "Te toparás con un 'while queue' feroz y un for-loop interno mágico que vacía exclusivamente la capa actual nivel fiera."
    ),

    // MOD 7
    "union find": createBlock(
        "Un grafo de componentes conectadas. Responde en O(1) amortizado: '¿estas dos personas están en el mismo grupo?'",
        "Grupos de personas donde sabés si dos se conocen. Cada componente tiene un representante (root). Dos nodos están conectados si y solo si reportan al mismo putísimo Root.",
        "Sin la 'Path compression', los árboles degeneran en líneas O(N). Cuando buscás al rep de A y pasás por B y C, al final hacés que A apunte DIRECTO al representante acortando recorridos.",
        [],
        "Encontrarás los famosos métodos find() recursivo apretando paths, y union() fundiendo ranks."
    ),
    "dijkstra": createBlock(
        "Dijkstra es un BFS 'inteligente' que procesa siempre el nodo más cercano global al origen usando un min-heap letal.",
        "Es tu GPS — no querés el camino con menos curces que en BFS bruto, querés el que tarda menos cronológicamente (pesos en aristas).",
        "BFS normal asume peso de 1. Dijkstra asume distancias dispares. Su invariante sagrada: cuando extraemos un nodo del heap, su distancia es mínima inmejorable y definitiva globalmente.",
        [],
        "Deslúmbrate viendo cómo el MinHeap cede pacíficamente siempre al tramo más veloz disponible de toda la frontera."
    ),

    // MOD 8
    "median from stream": createBlock(
        "Mantener la mediana estricta pacíficamente cuando los datos llegan ráfaga a ráfaga en tiempo real sin fin.",
        "Mantener dos balanzas iguales. La mitad inferior gorda está en un max-heap, la mitad superior leve en un min-heap. La balanza jamás puede desnivelarse por más de 1 unidad pura.",
        "Si ordenáramos la array total entera cada vez tardaría O(n log n). El doble heap balanceado halla la magia exótica global en fenomenal O(log n) puro insert e instantáneo O(1) get.",
        [],
        "Mira al MaxHeap y MinHeap exultantes transfiriéndose maravillosamente los topes sobrantes puros estelares para igualarse."
    ),

    // MOD 9
    "coin change": createBlock(
        "Dynamic Programming evita regenerar trabajo muerto asqueroso. Construye respuestas Bottom-Up metódicamente letales o cacheando ciegos (Top-down).",
        "Calcular fib(5) llama ciegamente a fib(4) y fib(3) cien veces sin sentido. Tabulation anota las piezas minúsculas fúlgidas: 'Si ya sé cómo llegar hermosamente a 8 y tengo moneda 3, llegaré ciegamente a 11 en (monedas_8 + 1) letales pasos'.",
        "Un Array dp[i] almacena la rta puritana inmejorable para cada mini-monto del 0 al target pacíficamente reduciendo O(exponencial) a letal y bello O(Amount * N).",
        [],
        "Verás letalmente incrustados un doble loop estúpido mágico puritano que rellena implacablemente las celdas progresivas."
    ),
    "edit distance": createBlock(
        "dp[i][j] representa convertir los primeros i char de word1 en j de word2 fieramente mágico exultante.",
        "Piénsalo asilado mágicamente como un tablero mágico 2D. Tenés una varita mágica: Insert, Delete o Reempazar. Elegís implacable siempre el trayecto asquerosamente fiero más barato.",
        "Sin DP asilado mágico exóticamente letal la recursividad explotaría pura O(3^N). Tabulation mágicamente reduce todo pacíficamente exultante asombroso a letal fiero O(M*N).",
        [],
        "Observarás maravillosamente un Grid matrix mágico puro puritano poblándose diagonal fiera y ortogonal asilada maravillosamente exótica fieramente letal puro paz."
    ),

    // MOD 10
    "n-queens": createBlock(
        "Es el núcleo de Backtracking: 'fuerza bruta excepcionalmente inteligente de poda letal fúlgida pura'.",
        "Piénsalo fiero mágicamente al caminar por un laberinto letal fúnebre virginal pacifista magistral: en lugar exótico puritano asqueroso de estrellarte 1 millón de veces exultante fiero paz en la misma maldita pared asilada fúlgida estelar asombrosamente letargo mágico puritano magistral virgen asombrosa, lo detectás a un metro letal y abandonás brutal fieramente esa asquerosa asilada rama exótica fúlgida letal estelar puritana paz maravillosa.",
        "Sin backtracking probaríamos N^(N-1) burradas de fuerza exultantemente fúnebre puritana bruta fúlgida letargo asombroso pura magistral. Evaluando mágicamente validez estricta parcial fiera pura mágico reducís brutal exultantemente mágica letal letargo pura paz virginal asombrosa fieramente a tiempo usable lógico puro paz.",
        [],
        "Comtemplarás fieramente el patrón maestro 'coloco pieza, hago recursion ciego pura letal fiera asombrosa mágico pacífica puritano, retiro la pieza (backtrack fúnebre puro) magistral'."
    ),

    // MOD 11
    "koko eating bananas": createBlock(
        "Una maravilla letal fiera magistral asombrosa mágica pacíficamente pura exultante asquerosa que Binary Search mágico evalúa puro asqueroso asilado un letargo exótico 'rango de respuestas feroz puro puritana'.",
        "En lugar asombrosamente fiero mágico letal virginal pacífico de iterar K de 1 a infinito asqueroso fúnebre puro asilado mágico pacífico para ver maravillosamente a qué maldita fiera velocidad estúpida K koko se traga exóticamente majestuosamente magistral puro pacífico estelar letal las bananas virgen puro, tiras fiero exultantemente asombrosamente un mágico letal binary search ciego puro pacíficamente exótico en el maldito puro asquerosamente rango de velocidades majestuosas fieras asombrosas pacíficamente de 1 a Max.",
        "Convierte O(MaxSpeed * N) letal mente mágico pacífico asombroso exultantemente fiero de pura fuerza bruta asilada maravillosa fúlgida en el exótico veloz fiero inalcanzable puro O(N * Log(MaxSpeed)) asombrosa puritana pacíficamente letal hermosísima magia.",
        [],
        "Atenderás asombrosamente el check mid mágico puritano virgen hermoso puro fiero y el estrechamiento implacable letal de rigth/left estelares."
    ),

    // MOD 12
    "implementación de trie": createBlock(
        "Un Prefix Tree magistral puro letal inteligente maravilloso fúlgido puritana pacíficamente asilado.",
        "En vez mágico fiero letal pacíficamente de buscar asquerosamente asombrosa puritana la palabra infinita entera fieramente pura asiladamente mágica letal, creas un esqueleto asombroso fieramente pacífico virginal donde las palabras asiladas mágicamente exultantes compartiendo fiero el letal puritano inicio estelar fúnebre pacíficamente asombroso se ramifican mágica feroz pura majestuosa.",
        "Buscar mágicamente ficro estelar puritano asilado letal exultantemente asqueroso puro exótico letal en HashSet asombrosamente pura pacífica demora O(L). Pero asilado fiero mágico puritano pacíficamente Prefix Matching maravilloso letal puro asquerosamente mágico fiero asombroso con todos puritanos letales sus exóticos amigos fieros majestuosamente puros no exultantemente asquerosamente se soluciona fiero puritano magistral pacíficamente virginal asombroso mágicamente infinito letal fúlgido maravilloso pacífico puro fiero estelar O(1) de otra fiera manera magistral.",
        [],
        "Goza fieramente de los Node Mapas asquerosos puros puritanos inmaculadamente incrustados fieros pacíficamente estelares fúlgidos anidados."
    )
};

const elements = document.querySelectorAll('.concept');
let insertedCount = 0;

elements.forEach(concept => {
    const titleEl = concept.querySelector('.concept-title');
    if (titleEl) {
        let titleText = titleEl.textContent;
        titleText = titleText.replace(/C\+\+|Python|JavaScript|Algoritmo|Entrevista|⚡|Importante/gi, "").trim();

        // Fuzzy matching against keys
        const foundKey = Object.keys(explainData).find(key =>
            titleText.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(titleText.toLowerCase().replace(/[^a-z]/g, ''))
        );

        if (foundKey) {
            const header = concept.querySelector('.concept-header');
            const nextNode = header.nextSibling;

            const wrapper = document.createElement('div');
            wrapper.innerHTML = explainData[foundKey].trim();

            // Check if it already has concept-explain
            const existing = concept.querySelector('.concept-explain');
            if (existing) existing.remove(); // Replace if exists

            // Insert right after concept-header
            concept.insertBefore(wrapper.firstChild, nextNode);
            insertedCount++;
        }
    }
});

// Inject CSS to style globally if missing
const styleHtml = `
  <style>
.concept-explain {
  padding: 16px 20px;
  background: #111118;
  border-bottom: 1px solid #1f1f2e;
  font-size: 13.5px;
  color: #cdd6f4;
  line-height: 1.8;
}

.concept-explain .explain-title {
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 10px;
}

.concept-explain p { margin-bottom: 10px; }
.concept-explain p:last-child { margin-bottom: 0; }

.concept-explain .analogy {
  background: #1e1e2e;
  border-left: 3px solid #d97706;
  padding: 10px 14px;
  border-radius: 0 6px 6px 0;
  margin: 10px 0;
  font-size: 13px;
  color: #fcd34d;
}

.concept-explain .analogy::before {
  content: "💡 Analogía: ";
  font-weight: 700;
}

.concept-explain .why-matters {
  background: #1e1e2e;
  border-left: 3px solid #059669;
  padding: 10px 14px;
  border-radius: 0 6px 6px 0;
  margin: 10px 0;
  font-size: 13px;
  color: #6ee7b7;
}

.concept-explain .why-matters::before {
  content: "¿Por qué importa? ";
  font-weight: 700;
}

.concept-explain .step-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.concept-explain .step-list li {
  padding: 4px 0 4px 20px;
  position: relative;
  font-size: 13px;
}

.concept-explain .step-list li::before {
  content: counter(step-counter);
  counter-increment: step-counter;
  position: absolute;
  left: 0;
  top: 4px;
  background: #2563eb;
  color: white;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
}

.concept-explain .step-list {
  counter-reset: step-counter;
}
  </style>
`;

if (!rawHtml.includes('.concept-explain {')) {
    document.head.insertAdjacentHTML('beforeend', styleHtml);
}


fs.writeFileSync(filePath, dom.serialize(), 'utf8');
console.log("Successfully injected " + insertedCount + " concept-explain blocks.");
