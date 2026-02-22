
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f13] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full text-center space-y-8 animate-in fade-in duration-1000">
        <header className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
            Gimnasio de Estudio
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Domina Algoritmos y Flutter con una ruta de aprendizaje estructurada y desafíos de validación.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* DSA Card */}
          <Link
            href="/dsa/big-o"
            className="group relative bg-[#1a1a24] border border-[#2a2a38] rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-8xl">⚡</span>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-2xl">
                DSA
              </div>
              <h2 className="text-3xl font-bold group-hover:text-blue-400 transition-colors">
                LeetCode & DSA
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Desde Big O hasta Programación Dinámica. Todo lo necesario para pasar entrevistas técnicas.
              </p>
              <div className="pt-4 flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                Comenzar <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Flutter Card */}
          <Link
            href="/flutter/dart-base"
            className="group relative bg-[#1a1a24] border border-[#2a2a38] rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,214,160,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-8xl">📱</span>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-2xl">
                FL
              </div>
              <h2 className="text-3xl font-bold group-hover:text-emerald-400 transition-colors">
                Flutter Expert
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dart, Widgets, Estado y Arquitectura. De cero a convertirte en un Senior Developer.
              </p>
              <div className="pt-4 flex items-center text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform">
                Comenzar <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>

        <footer className="pt-20 text-gray-500 text-sm font-mono">
          90% NECESARIO PARA DESBLOQUEAR EL SIGUIENTE MÓDULO
        </footer>
      </div>
    </main>
  );
}
