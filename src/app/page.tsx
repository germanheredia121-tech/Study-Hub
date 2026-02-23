
import Link from 'next/link';
import StudyHubLogo from '@/components/StudyHubLogo';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in duration-1000">
        <header className="space-y-6 flex flex-col items-center">
          <StudyHubLogo size="lg" className="mb-4" />
          <p className="text-[#888888] text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
            Domina Algoritmos y Flutter con una ruta de aprendizaje estructurada y desafíos de validación.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
          {/* DSA Card */}
          <Link href="/dsa/big-o" className="group block h-full">
            <div className="h-full relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 p-8 transition-all duration-300 hover:border-white/20 hover:bg-[#111]">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-white font-mono text-sm">
                  DSA
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3 tracking-tight text-white group-hover:text-white transition-colors">
                LeetCode & DSA
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed mb-8">
                Desde Big O hasta Programación Dinámica. Todo lo necesario para pasar entrevistas técnicas en las mejores empresas.
              </p>

              <div className="mt-auto flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                Comenzar <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Flutter Card */}
          <Link href="/flutter/dart-base" className="group block h-full">
            <div className="h-full relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 p-8 transition-all duration-300 hover:border-white/20 hover:bg-[#111]">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-white font-mono text-sm">
                  FL
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3 tracking-tight text-white group-hover:text-white transition-colors">
                Flutter Expert
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed mb-8">
                Dart, Widgets, Estado y Arquitectura. De cero a convertirte en un Senior Developer construyendo apps reales.
              </p>

              <div className="mt-auto flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                Comenzar <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="pt-12">
          <p className="text-[#666] text-xs font-mono uppercase tracking-widest">
            99% necesario para desbloquear el siguiente módulo
          </p>
        </div>
      </div>
    </main>
  );
}
