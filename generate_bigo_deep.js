const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'public', 'dsa_leetcode_completo.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Function for Python highlighting
function highlightPython(code) {
  let tokens = [];
  let lc = code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(#.*)/g, m => { tokens.push(`<span class="cm">${m}</span>`); return `___T${tokens.length - 1}___`; })
    .replace(/("[^"]*")/g, m => { tokens.push(`<span class="st">${m}</span>`); return `___T${tokens.length - 1}___`; })
    .replace(/('[^']*')/g, m => { tokens.push(`<span class="st">${m}</span>`); return `___T${tokens.length - 1}___`; })
    .replace(/\b(def|class|if|elif|else|for|while|return|import|from|in|not|and|or|True|False|None|self|yield|continue|break)\b/g, m => { tokens.push(`<span class="kw">${m}</span>`); return `___T${tokens.length - 1}___`; })
    .replace(/([a-zA-Z_]\w*)(\s*\()/g, (m, g1, g2) => { tokens.push(`<span class="fn">${g1}</span>${g2}`); return `___T${tokens.length - 1}___`; })
    .replace(/\b(\d+)\b/g, m => { tokens.push(`<span class="nm">${m}</span>`); return `___T${tokens.length - 1}___`; });

  for (let i = 0; i < tokens.length; i++) {
    lc = lc.replace(`___T${i}___`, tokens[i]);
  }

  let lines = lc.trim().split('\n');
  return lines.map((line, idx) => {
    let ln = `<span class="ln">${idx + 1}</span>`;
    return `<div class="cl">${ln}<span class="lc">${line}</span></div>`;
  }).join('');
}

const bigOHTML = `
    <!-- BIG O -->
    <div id="bigo" class="mod-header">
      <div class="mod-num">Módulo 01</div>
      <h2>Complejidad Algorítmica — Big O y Space Complexity</h2>
      <p>El lenguaje universal de los ingenieros para medir y comunicar qué tan eficiente es un algoritmo en términos de <strong>Tiempo</strong> y <strong>Memoria</strong> cuando la cantidad de datos (input) crece hacia el infinito. Sin dominar esto, jamás sabrás si una solución es óptima o si pasará la entrevista.</p>
    </div>

    <!-- SECCION COMPLEJIDAD DE TIEMPO -->
    <div class="section">
      <div class="section-title">Time Complexity (Tiempo de Ejecución)</div>
      <p style="color: #999; margin-bottom: 24px; font-size: 15px; line-height: 1.6;">Mide cómo aumenta la cantidad de <strong>operaciones</strong> que hace tu programa a medida que el input (N) se vuelve gigante. En Big O, siempre nos preparamos para el peor escenario (<strong>el peor caso</strong>) y utilizamos una heurística vital: <strong>las constantes se ignoran por completo</strong>.</p>
      
      <div class="concept">
        <div class="concept-header">
          <div class="concept-title">Las 6 Complejidades Clásicas <span class="badge b-blue">vital</span></div>
        </div>
        <div class="concept-explain">
          <div class="explain-title">EXPLICACIÓN TEÓRICA EXHAUSTIVA</div>
          <p><strong>¿Por qué ignorar constantes?</strong> Si tienes un algoritmo que hace <code>2 * N</code> operaciones (o sea, <code>O(2n)</code>), decimos que es estrictamente <code>O(N)</code>. Porque si N es un trillón, ese "x2" no cambia la forma geométrica del crecimiento en la gráfica matemática; sigue siendo una línea recta (lineal). La regla de oro en Big O es que las constantes no importan: <code>O(2n) -> O(n)</code> y <code>O(n + 500) -> O(n)</code>.</p>
          
          <table class="tbl" style="margin-top:20px;">
            <thead>
              <tr><th>Notación</th><th>Nombre</th><th>Explicación profunda de concepto</th><th>Escala</th></tr>
            </thead>
            <tbody>
              <tr><td><code>O(1)</code></td><td>Constante</td><td>El tiempo no depende del input en lo absoluto. <strong>Ejemplo: Acceder a un elemento en un array por su índice <code>arr[i]</code></strong>, pushear a un stack, buscar en un hash map válido. Siempre hace ~1 operación rápida e instantánea.</td><td><span class="time time-good">✓ óptimo</span></td></tr>
              <tr><td><code>O(log n)</code></td><td>Logarítmica</td><td>El problema se <strong>divide por la mitad</strong> en cada paso. Eres un cirujano descartando grandes porciones de datos inútiles (ej: algoritmos como <strong>Binary Search</strong> sobre arreglos ordenados).</td><td><span class="time time-good">✓ excelente</span></td></tr>
              <tr><td><code>O(n)</code></td><td>Lineal</td><td>Tienes que mirar cada elemento del arreglo al menos una sola vez de frente (ej: un simple <code>for loop</code> recorriendo un array entero para buscar el máximo elemento).</td><td><span class="time time-good">✓ bueno</span></td></tr>
              <tr><td><code>O(n log n)</code></td><td>Lineal-log</td><td>Conocida como la complejidad <strong>típica de ordenamiento</strong> algorítmico eficiente (como Merge Sort o Heap Sort). Combina iterar sobre los elementos (N) multiplicando las particiones logarítmicas (log n).</td><td><span class="time time-ok">~ aceptable</span></td></tr>
              <tr><td><code>O(n²)</code></td><td>Cuadrática</td><td>Tienes <strong>dos bucles anidados que recorren "n"</strong> internamente de manera iterativa. Por cada elemento en el arreglo iterado, vuelves a iterar sobre los otros N elementos. (Ejemplo trágico: Bubble Sort).</td><td><span class="time time-bad">✗ lento</span></td></tr>
              <tr><td><code>O(2ⁿ)</code></td><td>Exponencial</td><td>El número de operaciones se duplica ciegamente cada vez que añades un simple dato más al input. Típico de evaluar un <strong>algoritmo de recursión simple como Fibonacci sin memoización</strong>. Un desastre de redimiento.</td><td><span class="time time-bad">✗ imposible</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- SECCION REGLAS DEL JUEGO -->
    <div class="section">
      <div class="section-title">Las Reglas del Juego Lógico</div>

      <div class="callout callout-yellow">
        <strong>💡 Analogía real para entender Constant vs Log vs Lineal:</strong><br>
        Buscar la palabra "Cebra" en un diccionario impreso de papel:<br>
        - <b>O(n):</b> Leer el diccionario página por página minuciosamente desde la A. Te va a tomar años de encierro si el libro tiene millones de páginas.<br>
        - <b>O(log n):</b> Abrirlo por la mitad exacto. Si ves la letra "M", sabes que Cebra está en el cerro de la izquierda. Descartas matemáticamente la mitad derecha entera y repites abriendo la mitad izquierda. Solo necesitas ~20 iteraciones para encontrarla en un libro de 1 millón de páginas (Como hace Binary Search).<br>
        - <b>O(1):</b> Tienes el número de página anotado en la palma de tu mano izquierda y vas directo. Tardas 1 segundo milimétricamente no importa qué tan grueso sea el diccionario.
      </div>
      
      <div class="concept">
        <div class="concept-header">
          <div class="concept-title">Detectando Complejidad por Patrones de Código <span class="badge b-yellow">ejemplos O(x)</span></div>
        </div>
        <div class="ide">
          <div class="ide-bar">
            <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
            <span class="ide-file">time_calc.py</span>
            <span class="ide-lang">Python</span>
            <button class="copy-btn" onclick="copyCode(this)">copiar</button>
          </div>
          <div class="ide-body">
            ${highlightPython(`
# REGLA 1: Acceso Directo → O(1)
def get_first(arr):
    return arr[0]  # O(1): No depende de si arr tiene 10 o 10 millones de cosas.

# REGLA 2: Un loop lineal común → O(n)
for i in range(n):
    print(i)  # O(n): La cantidad de "prints" crece codo a codo con n.

# REGLA 3: Dos bucles anidados iterando 'n' → Se multiplican O(n²)
for i in range(n):              
    for j in range(n):          # N pasos en la capa externa * N en la interna.
        print(i, j)             # El resultado computacional de esto es O(n²).

# REGLA 4: El problema sistemáticamente se divide en mitades → O(log n)
left, right = 0, n - 1
while left <= right:            # Binary Search
    mid = (left + right) // 2   # Descartas radicalmente el 50% de las opciones en cada paso
    left = mid + 1              # O(log n)

# REGLA 5: Recursión bifurcada sin memoria caché (Memo) → O(2ⁿ)
def fibonacci_malo(n):  
    if n <= 1: return n
    # En cada paso te ramificas en el árbol x2 veces. Esto es Exponencial.
    return fibonacci_malo(n-1) + fibonacci_malo(n-2)  # ¡Romperá la CPU velozmente!
            `)}
          </div>
        </div>
      </div>
    </div>

    <!-- SECCION SPACE COMPLEXITY -->
    <div class="section">
      <div class="section-title">Space Complexity (Complejidad de Espacio)</div>
      
      <div class="callout callout-green">
        <strong>🤔 ¿Por qué importa el espacio y cómo se calcula?</strong><br>
        Time Complexity mide cuán veloz eres, pero Space Complexity evalúa <strong>cuánta memoria RAM adicional (auxiliar) necesitas</strong> para operar. Atención vital: La matriz u objeto que te proveen originalmente como Input no cuenta como espacio adicional. Cuentan únicamente los constructos extra, diccionarios extra, matrices y recursos matemáticos que debas instanciar para resolver tu dilema.
      </div>

      <div class="concept">
        <div class="concept-header">
          <div class="concept-title">Memoria Auxiliar vs Creación de Copias <span class="badge b-red">memory</span></div>
        </div>
        <div class="concept-explain">
          <div class="explain-title">¿QUÉ OCUPA ESTE ESPACIO EN LA RAM?</div>
          <p>Hay exactamente dos grandes vampiros de recursos de memoria en cualquier paradigma de algoritmos:</p>
          <ul>
            <li style="margin-bottom: 8px;"><strong>Creación de copias y nuevas estructuras:</strong> Si el Input es un grandioso Array de tamaño N, y tú para solventar un problema decides internamente programar algo que <strong style="color:#ef4444">crea una copia de ese array</strong>, habrás condenado a tu algoritmo silenciosamente a consumir un Espacio Auxiliar de <code>O(n)</code>. Un mapa Hash/diccionario con N llaves también ocupa mágicamente <code>O(n)</code> espacio.</li>
            <li><strong>El Call Stack en Recursiones (La Pila Interna del Sistema del CPU):</strong> El SO de un computador preserva el registro de cada llamada a una función dentro del Call Stack antes de regresar arriba. Si desencadenas una Recursión profunda sin salir que se profundiza con tamaño N, consumiste un Espacio de Sistema real en el Stack equivalente a <code>O(n)</code>, aunque tu sintaxis ni si quiera tenga variables.</li>
          </ul>
        </div>
        <div class="ide">
          <div class="ide-bar">
            <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
            <span class="ide-file">space_calc.py</span>
            <span class="ide-lang">Python</span>
            <button class="copy-btn" onclick="copyCode(this)">copiar</button>
          </div>
          <div class="ide-body">
            ${highlightPython(`
# ESPACIO O(1) - La Optimidad pura, operaciones llamadas "In-Place" (en el lugar)
def reverse_array_inplace(arr):
    # En este algoritmo invertimos un enorme arreglo modificándolo en él mismo
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1; right -= 1
    # Declaramos las variables numéricas simples 'left' y 'right'.
    # Dos Integers básicos no escalan, esto es constante puro: Espacio O(1)

# ESPACIO O(n) - Copias Adicionales Costosas y Tablas Hash de almacenamiento
def reverse_array_copy(arr):
    # ¡Alerta roja de memoria! Cuando ejecutas esta sintaxis
    # internamente Python crea una COPIA masiva del array en la memoria.
    return arr[::-1] # Espacio adicional de O(n)

def store_in_hash(arr):
    # Si le insertas todos los elementos iterados a un diccionario (Hash Table)
    # terminará teniendo N buckets almacenados. El uso de espacio es O(n)
    vistos = set() 
    for element in arr: vistos.add(element)
            `)}
          </div>
        </div>
      </div>
    </div>
`;

// Parse the html via strings
// Locate from <div id="bigo"... to <!-- ARRAYS -->
const startIndex = html.indexOf('<div id="bigo" class="mod-header">');
const endIndex = html.indexOf('<!-- ARRAYS -->');

if (startIndex === -1 || endIndex === -1) {
  console.error("No se pudo ubicar el modulo bigo");
  process.exit(1);
}

const originalModule = html.substring(startIndex, endIndex);

let newHTML = html.replace(originalModule, bigOHTML + '\n    ');

fs.writeFileSync(htmlPath, newHTML, 'utf8');
console.log("Big O model updated successfully to a deep comprehensive one.");
