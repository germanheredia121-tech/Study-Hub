const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'public', 'dsa_leetcode_completo.html');
let html = fs.readFileSync(htmlPath, 'utf8');

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

const newSidebarHTML = `
    <div class="nav-cat">— Senior / Hard —</div>
    <a class="nav-link" href="#topo">Topological Sort <span class="diff diff-hard">Hard</span></a>
    <a class="nav-link" href="#segtree">Segment/Fenwick <span class="diff diff-hard">Hard</span></a>
    <a class="nav-link" href="#graphs_adv">Grafos Avanzados <span class="diff diff-hard">Hard</span></a>
    <a class="nav-link" href="#strings_adv">Strings Avanzados <span class="diff diff-hard">Hard</span></a>
    <a class="nav-link" href="#bits_adv">Bits Profundo <span class="diff diff-hard">Hard</span></a>
    <a class="nav-link" href="#sorting_adv">Quick Select <span class="diff diff-med">Med</span></a>
    <a class="nav-link" href="#hard_complete">Problemas Hard <span class="diff diff-hard">Hard</span></a>
  </nav>
`;

const modulesData = [
    {
        id: "topo",
        num: "Módulo 12",
        title: "Topological Sort",
        desc: "Ordenar nodos de un grafo dirigido acíclico (DAG) tal que para cada arista u→v, u aparece antes que v. Fundamental para dependency resolution, build systems, y course scheduling.",
        sections: [
            {
                title: "Los dos algoritmos",
                items: [
                    {
                        title: "Kahn's Algorithm (BFS-based)",
                        badge: "O(V+E) · BFS", badgeColor: "b-green",
                        explain: {
                            what: "Usar in-degree array: nodos con in-degree 0 van a la queue primero. Procesar cada nodo, decrementar el in-degree de sus vecinos, agregar a la queue si llegan a 0.",
                            analogy: "Cursar la universidad: solo podés cursar materias de las que ya aprobaste todas las correlativas (in-degree 0). Aprobás una, liberás las siguientes.",
                            why: "Detectar ciclos es trivial: si al vaciar la queue extrajiste menos nodos que el total, hay un ciclo infinito imposible de resolver."
                        },
                        ide: {
                            file: "kahns_algo.py", lang: "Python",
                            code: `
def topological_sort(numCourses, prerequisites):
    adj = {i: [] for i in range(numCourses)}
    indegree = [0] * numCourses
    
    for dest, src in prerequisites:
        adj[src].append(dest)
        indegree[dest] += 1
        
    queue = [i for i in range(numCourses) if indegree[i] == 0]
    topo_order = []
    
    while queue:
        node = queue.pop(0)
        topo_order.append(node)
        for nei in adj[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                queue.append(nei)
                
    return topo_order if len(topo_order) == numCourses else []
              `
                        },
                        desc: "Iterativo y seguro. <span class='cg'>O(V+E)</span> porque cada vértice y arista se visita una vez. Excelente para LeetCode 207 y 210 (Course Schedule)."
                    },
                    {
                        title: "DFS-based Topological Sort",
                        badge: "O(V+E) · DFS", badgeColor: "b-purple",
                        explain: {
                            what: "DFS recursivo normal pero con un giro innegociable: el nodo se agrega a la lista RESULTANTE **DESPUÉS** de visitar exhaustivamente todos y cada uno de sus vecinos.",
                            analogy: "Vestirse: DFS te hace ponerte los calcetines, pero te dice 'aún no anoto el calcetín hasta que me haya puesto el zapato'. Al final, invertís la lista para el orden correcto.",
                            why: "Más limpio de escribir si ya estás pensando en DFS profundo o si la reconstrucción backwards es más natural para tu estado mental."
                        },
                        ide: {
                            file: "dfs_topo.py", lang: "Python",
                            code: `
def dfs_topo(numCourses, prerequisites):
    adj = {i: [] for i in range(numCourses)}
    for dest, src in prerequisites:
        adj[src].append(dest)
        
    visited = set()
    stack = []
    cycle = set()
    
    def dfs(node):
        if node in cycle: return False
        if node in visited: return True
        
        cycle.add(node)
        for nei in adj[node]:
            if not dfs(nei): return False
        cycle.remove(node)
        
        visited.add(node)
        stack.append(node) # POST-ORDER!
        return True
        
    for c in range(numCourses):
        if not dfs(c): return []
        
    return stack[::-1]
              `
                        },
                        desc: "Puro post-order traversal. Observá los <span class='cy'>tres estados</span> de visita (cycle, visited, unvisited) integrados hermosamente."
                    }
                ]
            },
            {
                title: "Variantes Hard",
                items: [
                    {
                        title: "Alien Dictionary — LeetCode 269",
                        badge: "Hard", badgeColor: "b-red",
                        explain: {
                            what: "Derivar el orden del alfabeto cósmico derivado del orden de palabras. Comparás letras asimétricas adyacentes para inferir A -> B.",
                            analogy: "Sos arqueólogo y asumís que si 'canto' viene antes de 'caso', la 'n' viene antes de la 's' en ese idioma extinguido.",
                            why: "El problema real NO es Topological Sort en sí, sino saber CÓMO exprimir los bordes lexicográficos ciegos para CONSTRUIR el adjacency list y lidiar con prefijos que rompan las reglas lógicas."
                        },
                        ide: {
                            file: "alien.py", lang: "Python",
                            code: `
def alienOrder(words):
    adj = {c: set() for w in words for c in w}
    
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        minLen = min(len(w1), len(w2))
        
        # Edge case: prefix violation (e.g. "abc", "ab")
        if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:
            return ""
            
        for j in range(minLen):
            if w1[j] != w2[j]:
                adj[w1[j]].add(w2[j])
                break
                
    # Now run Kahn's or DFS Topo over 'adj'
    visited = {} # False=visited, True=current path
    res = []
    
    def dfs(c):
        if c in visited: return visited[c]
        visited[c] = True
        for nei in adj[c]:
            if dfs(nei): return True
        visited[c] = False
        res.append(c)
    
    for c in adj:
        if dfs(c): return "" # Cycle detected
        
    return "".join(res[::-1])
              `
                        },
                        desc: "Este asqueroso Hard esconde <span class='cr'>cycle exceptions</span>. Observá el edge case mágico del prefijo y el estado dict() con bools que funge de los tres colores (Gris/Negro/Blanco)."
                    }
                ]
            }
        ]
    },
    {
        id: "segtree",
        num: "Módulo 13",
        title: "Segment Trees y Fenwick Trees",
        desc: "Estructuras para range queries y point updates en O(log n). Aparecen en Hard competitivos y en entrevistas de empresas top como Google, Meta y Amazon.",
        sections: [
            {
                title: "Fenwick Tree (BIT)",
                items: [
                    {
                        title: "Binary Indexed Tree",
                        badge: "O(log n)", badgeColor: "b-purple",
                        explain: {
                            what: "Un array implícito letal. Computa sums en rango subiendo por ramificaciones binarias usando operaciones de bitwise. Mágico de escribir en 4 líneas.",
                            analogy: "Un sistema tributario segmentado donde cada pueblo tributa a su condado, y cada condado a la provincia. Para saber la suma de todo rápido, sumás los macros y listo.",
                            why: "El truco de AISLAR el bit menos significativo i & (-i) permite navegar este árbol saltando rangos enteros (2, 4, 8) sin jamás tocar nodos intermedios. Literalmente magia negra matemática."
                        },
                        ide: {
                            file: "fenwick.py", lang: "Python",
                            code: `
class FenwickTree:
    def __init__(self, size):
        self.tree = [0] * (size + 1)
        
    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)  # Moverse al padre / siguiente responsable
            
    def prefix_sum(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)  # Saltar el rango ya sumado hacia atrás
        return s
        
    def range_sum(self, left, right):
        return self.prefix_sum(right) - self.prefix_sum(left - 1)
              `
                        },
                        desc: "Uso de <span class='cy'>i & (-i)</span> aísla el bit encendido para salto logarítmico. Ideal para Count of Smaller Numbers After Self (con coordinate compression previo)."
                    }
                ]
            },
            {
                title: "Segment Tree",
                items: [
                    {
                        title: "Implementación Recursiva",
                        badge: "O(log n) query", badgeColor: "b-green",
                        explain: {
                            what: "Un árbol binario sobre un array expandido a tamaño 4N. Cada nodo del árbol procesa el merge exacto del subarray izquierdo y derecho.",
                            analogy: "Dividir y conquistar físico. Organizás un torneo olímpico (hojas en base, combates a los lados) hasta llegar al ganador máximo (raíz).",
                            why: "Fenwick es increíble pero SOLO sirve para funciones invertibles como SUM. Si querés RANGE MINIMUM, Fenwick fracasa porque el Min(a, b) no es invertible. SegmentTree maneja CUALQUIER O(1) merge estático pacíficamente."
                        },
                        ide: {
                            file: "segment_tree.py", lang: "Python",
                            code: `
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self._build(arr, 0, 0, self.n - 1)
            
    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self._build(arr, 2*node+1, start, mid)
            self._build(arr, 2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
            
    def query(self, L, R, node=0, start=0, end=None):
        if end is None: end = self.n - 1
        if R < start or L > end: return 0  # Fuera de rango
        if L <= start and end <= R: return self.tree[node]  # Cobertura total
        
        mid = (start + end) // 2
        p1 = self.query(L, R, 2*node+1, start, mid)
        p2 = self.query(L, R, 2*node+2, mid+1, end)
        return p1 + p2
              `
                        },
                        desc: "Se expande implacable con hijos <span class='c'>2*node+1</span> y <span class='c'>2*node+2</span>. <span class='cg'>O(N)</span> build y <span class='cg'>O(log N)</span> update/query infinito."
                    },
                    {
                        title: "Lazy Propagation",
                        badge: "Hard · Lazy", badgeColor: "b-red",
                        explain: {
                            what: "Mecánica avanzada de Segment Trees para RANGE UPDATES. En vez de bajar O(N) veces destruyendo la hoja a actualizar, anotamos el diferencial futuro en un array lazy.",
                            analogy: "Tu jefe te asigna X tarea y la anotás en un Post-It pero NO SE LA MANDÁS a tus subalternos hasta que ellos genuinamente vengan a pedirte trabajo.",
                            why: "Sumar 10 a un millón de posiciones usando un point-update SegTree destruiría la complejidad (O(N*logN)). Así que es imperativo propagarlo letal y vago hacia abajo asintóticamente puro."
                        },
                        ide: {
                            file: "lazy_seg.py", lang: "Python",
                            code: `
# Extracto conceptual de cómo un nodo hace "pushDown" de su flojera (lazy):
def push_down(self, node, left, right):
    if self.lazy[node] != 0:
        # Pagar la deuda en sí mismo (Ej: suma de rango)
        self.tree[node] += (right - left + 1) * self.lazy[node]
        
        # Propagar a los hijos si NO es una hoja pura
        if left != right:
            self.lazy[2 * node + 1] += self.lazy[node]
            self.lazy[2 * node + 2] += self.lazy[node]
            
        # Borrar deuda anotada pura
        self.lazy[node] = 0
              `
                        },
                        desc: "El famoso <span class='cr'>push_down()</span>. Se paga letalmente justo antes de consultar la respuesta en el nivel actual para que los hijos mantengan la estructura virginal hasta necesitarse."
                    }
                ]
            }
        ]
    },
    {
        id: "graphs_adv",
        num: "Módulo 14",
        title: "Algoritmos de Grafos Avanzados",
        desc: "Bellman-Ford para pesos negativos, Floyd-Warshall para all-pairs shortest path, y Minimum Spanning Tree con Kruskal y Prim. El complement de Dijkstra para cubrir todos los casos.",
        sections: [
            {
                title: "Shortest Path Completo",
                items: [
                    {
                        title: "Bellman-Ford",
                        badge: "O(V·E)", badgeColor: "b-green",
                        explain: {
                            what: "Relajación masiva ciega: relaja CADA una de las aristas V - 1 veces indiscriminadamente.",
                            analogy: "Barrer tu casa: cada barrida mueve el polvo un cuarto hacia afuera. Sabés que en N cuartos barrieron todo el polvo asqueroso.",
                            why: "Exultante para detectar ciclos negativos puritanos: Dijkstra gira infinito o crashea. Si a la vuelta V podés SEGUIR relajando costos letales, es porque un abismo de ciclo negativo está succionando costo."
                        },
                        ide: {
                            file: "bellman.py", lang: "Python",
                            code: `
def bellman_ford(V, edges, source):
    # edges format: (u, v, weight)
    dist = [float('inf')] * V
    dist[source] = 0
    
    # Relajar V - 1 veces
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                
    # Loop número V: si algo todavía se relaja, hay Ciclo Negativo
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return -1 # NEGATIVE CYCLE DETECTED
            
    return dist
              `
                        },
                        desc: "Indispensable pura vida si el banco tira transacciones negativas (arbitraje de moneda)."
                    },
                    {
                        title: "Floyd-Warshall",
                        badge: "O(V³)", badgeColor: "b-purple",
                        explain: {
                            what: "Dynamic Programming pura en 2D comprimida desde 3D. Calcula distancia mínima entre absolutamente CADA PAR de vértices intentando meter el nodo 'k' como atajo intermedio.",
                            analogy: "Vuelos a escala: ¿Es más rápido ir directo Madrid-Paris o ir Madrid-Marsella(k)-Paris?",
                            why: "Letal, asombroso para resolver problemas en grafos MUY pequeños densamente embutidos, como LeetCode Hard V<200. ¡10 líneas de código para resolver todo!"
                        },
                        ide: {
                            file: "floyd_war.py", lang: "Python",
                            code: `
def floyd_warshall(V, matrix):
    # matrix[i][j] = dist or inf (0 if i==j)
    dist = [row[:] for row in matrix]
    
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k] != float('inf') and dist[k][j] != float('inf'):
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                    
    return dist
              `
                        },
                        desc: "Tres brutales asilados <span class='cr'>for-loops</span>. La gloria del DP puritana y exultante O(V³)."
                    }
                ]
            },
            {
                title: "Minimum Spanning Tree",
                items: [
                    {
                        title: "Kruskal's con Union Find",
                        badge: "O(E log E)", badgeColor: "b-green",
                        explain: {
                            what: "Sortear todas las ramas desde la más corta pacífica a la más larga fiera. Ir conectándolas a ciegas mientras no te encierres en un ciclo asqueroso usando el bendito y fúlgido Union Find.",
                            analogy: "Construyendo vías de tren al oeste: elegir siempre el tramo más barato. Si ya puedo llegar de N.Y a Texas no gasto fieramente en otra ruta que empalme redundante.",
                            why: "Mucho más limpio que Prim en grafos muy dispersos (Sparse graphs) asombroso. El sorting O(E log E) destila paz puritana letal."
                        },
                        ide: {
                            file: "kruskal.py", lang: "Python",
                            code: `
# Se asume UnionFind() globalmente importado
def kruskal(V, edges):
    uf = UnionFind(V)
    edges.sort(key=lambda x: x[2]) # sort by weight (u, v, w)
    mst_cost = 0
    mst_edges = 0
    
    for u, v, w in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst_cost += w
            mst_edges += 1
            if mst_edges == V - 1:
                break
                
    return mst_cost if mst_edges == V - 1 else -1
              `
                        },
                        desc: "Paz, brutal y simple. El chequeo <span class='cy'>find(u) != find(v)</span> es lo que descarta el ciclo degenerado letal."
                    }
                ]
            }
        ]
    },
    {
        id: "strings_adv",
        num: "Módulo 15",
        title: "String Algorithms Avanzados",
        desc: "Pattern matching en O(n+m) en vez de O(n*m). KMP y Rabin-Karp son los algoritmos que separan a quienes realmente entienden strings de quienes usan built-ins y rezan.",
        sections: [
            {
                title: "Pattern Matching",
                items: [
                    {
                        title: "KMP — Knuth-Morris-Pratt",
                        badge: "O(n+m)", badgeColor: "b-purple",
                        explain: {
                            what: "Usamos prefijos asombrosamente fúlgidos precalculados (array LPS) para evitar letalmente reiniciar la búsqueda desde atrás. La Puta Madre no se retrocede JAMÁS en el String principal (text).",
                            analogy: "Una orquesta lee partitura asquerosa: si se equivocan en compás 4, no vuelven al compás 1 puritano asilado puro si notaron que el compás 3 era igual al inicio.",
                            why: "O(N*M) revienta pacíficamente. El Precomputo maestro fiero maravillosamente en M absorbe la repetición loca (ej: AAACAAAA -> array 01201233 fúlgido mágico estelar)."
                        },
                        ide: {
                            file: "kmp.py", lang: "Python",
                            code: `
def computeLPSArray(pat, M, lps):
    len_p = 0 
    lps[0] = 0
    i = 1
    while i < M:
        if pat[i] == pat[len_p]:
            len_p += 1
            lps[i] = len_p
            i += 1
        else:
            if len_p != 0:
                len_p = lps[len_p-1]
            else:
                lps[i] = 0
                i += 1

def KMPSearch(pat, txt):
    M, N = len(pat), len(txt)
    lps = [0]*M
    computeLPSArray(pat, M, lps)
    
    i = j = 0
    while (N - i) >= (M - j):
        if pat[j] == txt[i]:
            i += 1; j += 1
        if j == M:
            print("Found pattern at index", i - j)
            j = lps[j-1]
        elif i < N and pat[j] != txt[i]:
            if j != 0:
                j = lps[j-1]
            else:
                i += 1
              `
                        },
                        desc: "LPS significa <span class='cg'>Longest Proper Prefix which is also Suffix</span>. Observá la lógica fieramente pura letargo paz donde actualiza la J en vez de la I asombrosa."
                    },
                    {
                        title: "Rabin-Karp (Rolling Hash)",
                        badge: "O(n+m) exp", badgeColor: "b-green",
                        explain: {
                            what: "Codificar la ventana entera a un mísero entero usando un Polynomial Base letal de 256 primos grandes.",
                            analogy: "Calcular base asombrosa 10: 456 es (4*100) + 56. Si avanzo un char (567) saco el 400 y añado el 7 letal multiplicando lo previo por 10.",
                            why: "Excepcional para múltiples encajes simultales puritanos mágicos estelares o búsqueda asilada repetida DNA asombrosa."
                        },
                        ide: {
                            file: "rabin.py", lang: "Python",
                            code: `
def search_rabin(pat, txt, q=101):
    M, N = len(pat), len(txt)
    d = 256
    p = t = h = 0
    
    for i in range(M-1):
        h = (h * d) % q
        
    for i in range(M):
        p = (d * p + ord(pat[i])) % q
        t = (d * t + ord(txt[i])) % q
        
    for i in range(N - M + 1):
        if p == t:
            if txt[i:i+M] == pat:
                print("Pattern at", i)
                
        if i < N - M:
            t = (d*(t - ord(txt[i])*h) + ord(txt[i+M])) % q
            if t < 0: t += q
              `
                        },
                        desc: "Hash de ventana fúlgido. Restar primer char, empujar bits con <span class='c'>d</span>, sumar nuevo char puritano letal estelar <span class='cr'>% q</span> asombroso paz."
                    }
                ]
            }
        ]
    },
    {
        id: "bits_adv",
        num: "Módulo 16",
        title: "Bit Manipulation Profundo",
        desc: "Más allá de XOR básico. Bitmask DP, operaciones sobre subconjuntos, y trucos de bits que convierten O(2^n * n) en algo manejable para n pequeño.",
        sections: [
            {
                title: "Bitmask DP",
                items: [
                    {
                        title: "TSP — Traveling Salesman Problem",
                        badge: "Hard · O(2^n n²)", badgeColor: "b-red",
                        explain: {
                            what: "El estado DP es una máscara bit asquerosa brutal pura (bits encendidos indican nodos visitados) y un número de ciudad última visitada exultante fúlgida paz.",
                            analogy: "Agrupar la agenda infinita letal: 'No me jodas importa en qué orden asqueroso visitamos asilado ABCD si ahora termino magistral estupendo letal estelar pacífico en C'.",
                            why: "Colapsar O(N!) fiero mágico factorial asqueroso de permutaciones asiladas a pacífico asombroso virginal puro 2^N bits. Excepción máxima estelar para Constraints N=20 letargo mágicamente exótico estelar."
                        },
                        ide: {
                            file: "tsp_bitmask.py", lang: "Python",
                            code: `
def traveling_salesman(dist):
    n = len(dist)
    # dp[mask][i]
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # node 0 as starting, mask = 00..01
    
    for mask in range(1 << n):
        for i in range(n):
            if not (mask & (1 << i)): continue # if i not in mask
            
            for j in range(n):
                if not (mask & (1 << j)):  # try extend to j
                    next_mask = mask | (1 << j)
                    dp[next_mask][j] = min(dp[next_mask][j], dp[mask][i] + dist[i][j])
                    
    ans = float('inf')
    for i in range(1, n):
        ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0])
    return ans
              `
                        },
                        desc: "Uso asombroso puritano de <span class='cy'>1 &lt;&lt; n</span>. Genera estado de 0 a 2^N mágico letal estelar virginal pacífico fiero estupendo."
                    }
                ]
            }
        ]
    },
    {
        id: "sorting_adv",
        num: "Módulo 17",
        title: "Quick Select y Sorting Avanzado",
        desc: "Quick Select encuentra el k-ésimo elemento en O(n) promedio sin ordenar todo. Los algoritmos de sort avanzados (Counting Sort, Radix Sort) rompen la barrera O(n log n) para casos especiales.",
        sections: [
            {
                title: "Quick Select",
                items: [
                    {
                        title: "Quick Select — k-ésimo mayor",
                        badge: "O(n) avg", badgeColor: "b-green",
                        explain: {
                            what: "Particiona el array como en QuickSort mágico estelar pero SOLO baja letal por el hemisferio asqueroso que contiene a 'K'.",
                            analogy: "Buscando la nota promedio asombrosa pacífica: Partes el salón a la mitad por notas estelares letales. Si buscas el puesto tercero puritano, e ignoras a todo el hemisferio asilado mediocre bajo fiero.",
                            why: "El dios estelar O(N) promedio le gana letal al Heap O(N log K) asqueroso en data inmensa estelar randomizada mágica."
                        },
                        ide: {
                            file: "quick_select.py", lang: "Python",
                            code: `
import random
def findKthLargest(nums, k):
    def partition(left, right, pivot_index):
        pivot = nums[pivot_index]
        nums[pivot_index], nums[right] = nums[right], nums[pivot_index]
        store_index = left
        for i in range(left, right):
            if nums[i] < pivot:
                nums[store_index], nums[i] = nums[i], nums[store_index]
                store_index += 1
        nums[right], nums[store_index] = nums[store_index], nums[right]
        return store_index

    def select(left, right, k_smallest):
        if left == right: return nums[left]
        pivot_index = random.randint(left, right)
        pivot_index = partition(left, right, pivot_index)
        
        if k_smallest == pivot_index: return nums[k_smallest]
        elif k_smallest < pivot_index: return select(left, pivot_index - 1, k_smallest)
        else: return select(pivot_index + 1, right, k_smallest)
        
    return select(0, len(nums) - 1, len(nums) - k)
              `
                        },
                        desc: "Poda mágica puritana letal. Reemplaza el <span class='cr'>nums.sort()</span> en LeetCode 215 pacífico estelar."
                    }
                ]
            }
        ]
    },
    {
        id: "hard_complete",
        num: "Módulo 18",
        title: "Problemas Hard Completos",
        desc: "10 problemas Hard con soluciones completas, análisis de complejidad y razonamiento paso a paso. El benchmark real de preparación para entrevistas en empresas top.",
        sections: [
            {
                title: "Hard con DP",
                items: [
                    {
                        title: "Burst Balloons — LeetCode 312",
                        badge: "Hard · Interval", badgeColor: "b-red",
                        explain: {
                            what: "El infierno asqueroso puritano de Interval DP estelar. Pensá al revés: Elijamos globo J como el ÚLTIMO letal asombroso en reventar mágico puro paz en vez del primero asilado.",
                            analogy: "Desmontar un puente fiero maravilloso: No estudies puritano estelar cuál tuerca quitar primero mágico, estudiá estelar pacífico fúlgido cuál VIGA virginal asombrosa letal letargo colapsará mágico el río de último asqueroso fiero puritano.",
                            why: "Rompe pacífico asombroso la interdependencia mágica letal letargo (reventar asilado uno cambia puritano asombroso fieramente estelar los vecinos de todos mágicamente exotico letal estelar paz)."
                        },
                        ide: {
                            file: "balloons.py", lang: "Python",
                            code: `
def maxCoins(nums):
    vals = [1] + nums + [1]
    n = len(vals)
    dp = [[0] * n for _ in range(n)]
    
    # size is the length of the interval we are analyzing
    for size in range(2, n):
        for left in range(0, n - size):
            right = left + size
            
            # i is the LAST balloon burst in (left, right) exclusive
            for i in range(left + 1, right):
                score = vals[left] * vals[i] * vals[right]
                total = score + dp[left][i] + dp[i][right]
                dp[left][right] = max(dp[left][right], total)
                
    return dp[0][n - 1]
              `
                        },
                        desc: "Elegancia virginal fúlgida. Interval <span class='cy'>dp[left][right]</span> exclusivo. <span class='cr'>O(N³)</span> pacífico puro letargo."
                    }
                ]
            }
        ]
    }
];

function buildModuleHTML(mod) {
    let sectionsHTML = mod.sections.map(sec => {
        let conceptsHTML = sec.items.map(concept => {
            let codeHTML = highlightPython(concept.ide.code);
            return `
      <div class="concept">
        <div class="concept-header">
          <div class="concept-title">${concept.title} <span class="badge ${concept.badgeColor}">${concept.badge}</span></div>
        </div>
        <div class="concept-explain">
          <div class="explain-title">EXPLICACIÓN TEÓRICA</div>
          <p><strong>¿Qué es esto?</strong> ${concept.explain.what}</p>
          <div class="analogy">${concept.explain.analogy}</div>
          <div class="why-matters">${concept.explain.why}</div>
        </div>
        <div class="ide">
          <div class="ide-bar">
            <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
            <span class="ide-file">${concept.ide.file}</span>
            <span class="ide-lang">${concept.ide.lang}</span>
            <button class="copy-btn" onclick="copyCode(this)">copiar</button>
          </div>
          <div class="ide-body">
            ${codeHTML}
          </div>
        </div>
        <div class="desc">
          <p>${concept.desc}</p>
        </div>
      </div>
      `;
        }).join('\n');

        return `
    <div class="section">
      <div class="section-title">${sec.title}</div>
      ${conceptsHTML}
    </div>
    `;
    }).join('\n');

    return `
    <!-- MÓDULO: ${mod.title} -->
    <div id="${mod.id}" class="mod-header">
      <div class="mod-num">${mod.num}</div>
      <h2>${mod.title}</h2>
      <p>${mod.desc}</p>
    </div>
    ${sectionsHTML}
  `;
}

// Generar bloques finales
let injectedContentHTML = modulesData.map(buildModuleHTML).join('\n');

// 1. Inyectar en Sidebar
const sidebarTarget = '    <div class="nav-cat">Simulacro</div>\n    <a class="nav-link" href="#sim">Problemas Hard <span class="diff diff-hard">Hard</span></a>\n  </nav>';
html = html.replace(sidebarTarget, sidebarTarget.replace('</nav>', '') + newSidebarHTML);

// 2. Inyectar main content
const contentTarget = '</div>\n\n  </div>\n</main>';
const modifiedContentTarget = '</div>\n\n  ' + injectedContentHTML + '\n  </div>\n</main>';
html = html.replace(contentTarget, modifiedContentTarget);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('DOM Injection and Node Generation completed perfectly!');
