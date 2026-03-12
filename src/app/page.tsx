import Link from 'next/link';
import Navbar from '@/components/Navbar';

const GITHUB_URL = 'https://github.com';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Glow effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-glow) 0%, transparent 60%)',
        }}
      />

      <Navbar />

      <main className="relative pt-16">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-dim)] px-4 py-1.5 mb-8">
              <span className="text-[var(--accent)] text-xs font-bold uppercase tracking-wider">
                100% Gratuito · Open Source · Para developers ARG/LATAM
              </span>
            </div>

            <h1 className="font-black text-5xl md:text-7xl leading-tight mb-6">
              Preparate para tu
              <br />
              primera entrevista técnica
            </h1>

            <p className="text-xl text-[var(--text-2)] max-w-2xl mx-auto mb-10">
              Módulos de estudio interactivos, quizzes que realmente filtran si entendiste, ejercicios de código en el browser y simulador de entrevistas. Todo gratis, todo open source.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/dsa/big-o"
                className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:opacity-90 text-[#0F0F0F] font-semibold rounded-full h-14 px-8 shadow-lg transition-all"
              >
                Empezar gratis
                <span className="material-icons">arrow_forward</span>
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-medium rounded-full h-14 px-8 transition-all"
              >
                Ver en GitHub
                <span className="material-icons">open_in_new</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">3 Tracks</p>
                <p className="text-sm text-[var(--text-2)]">Algoritmos · Flutter · Full Stack Web</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">35+ Ejercicios</p>
                <p className="text-sm text-[var(--text-2)]">LeetCode con pistas y soluciones</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">100% requerido</p>
                <p className="text-sm text-[var(--text-2)]">Para pasar al siguiente módulo</p>
              </div>
            </div>
          </div>
        </section>

        {/* ¿QUÉ INCLUYE? */}
        <section id="features" className="max-w-6xl mx-auto px-4 md:px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-[var(--text)]">
            Todo lo que necesitás para conseguir empleo
          </h2>
            <p className="text-[var(--text-2)] text-center max-w-2xl mx-auto mb-16">
            No es otro curso de videos. Es una ruta de aprendizaje estructurada que termina cuando podés demostrar que sabés.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'psychology', title: 'Módulos con profundidad real', desc: 'Cada concepto explica el problema que resuelve antes de mostrar la solución. Sin definiciones vacías.' },
              { icon: 'quiz', title: 'Quiz que requiere 100%', desc: 'No podés avanzar al siguiente módulo hasta dominar el actual. Sin trampa, sin salteos.' },
              { icon: 'code', title: 'Ejercicios interactivos', desc: 'Editor de código embebido con tests automáticos. Escribís código real, no completás blancos.' },
              { icon: 'timer', title: 'Simulador de entrevista', desc: 'Timer de 25 minutos, sin pistas, con feedback de qué hubiera dicho el entrevistador.' },
              { icon: 'integration_instructions', title: '35 problemas LeetCode', desc: 'Easy, Medium y Hard con pistas progresivas, esqueleto de código y solución explicada.' },
              { icon: 'groups', title: 'Open Source', desc: 'Podés contribuir, corregir errores, agregar módulos. Es tuyo tanto como nuestro.' },
            ].map((f) => (
              <div
                key={f.icon}
                className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:shadow-lg hover:border-[var(--accent-border)] transition-all"
              >
                <span className="material-icons text-[var(--accent)] text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-semibold text-lg text-[var(--text)] mb-2">{f.title}</h3>
                <p className="text-[var(--text-2)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LOS 3 TRACKS */}
        <section id="tracks" className="max-w-6xl mx-auto px-4 md:px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 text-[var(--text)]">
            Elegí tu camino
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* DSA */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:shadow-lg hover:border-[var(--accent-border)] transition-all">
              <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold mb-4">DSA</span>
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">Algoritmos & LeetCode</h3>
              <p className="text-[var(--text-2)] text-sm mb-6">
                Desde Big O hasta Programación Dinámica. Todo lo necesario para pasar la prueba técnica en las mejores empresas.
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-2)] mb-6">
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> 8 módulos teóricos con quiz 100%</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> 35 ejercicios LeetCode con pistas</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Easy → Medium → Hard desbloqueables</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Solución explicada con complejidad</li>
              </ul>
              <Link
                href="/dsa/big-o"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] font-medium hover:bg-[var(--accent)] hover:text-[#0F0F0F] transition-all"
              >
                Comenzar
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Flutter */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:shadow-lg hover:border-[var(--accent-border)] transition-all">
              <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold mb-4">FL</span>
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">Flutter Expert</h3>
              <p className="text-[var(--text-2)] text-sm mb-6">
                Dart, Widgets, Estado y Arquitectura. De cero a Senior Developer construyendo apps reales.
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-2)] mb-6">
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> 17 módulos desde Dart hasta CI/CD</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Null safety, async, streams explicados</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Arquitectura limpia y patrones reales</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Quiz eliminatorio en cada módulo</li>
              </ul>
              <Link
                href="/flutter/dart-base"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] font-medium hover:bg-[var(--accent)] hover:text-[#0F0F0F] transition-all"
              >
                Comenzar
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Full Stack */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:shadow-lg hover:border-[var(--accent-border)] transition-all">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold mb-4">FS</span>
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">Full Stack Web</h3>
              <p className="text-[var(--text-2)] text-sm mb-6">
                JavaScript, TypeScript, React, Node y SQL. El stack completo para entrar a cualquier empresa de LATAM como junior o semi senior.
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-2)] mb-6">
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> 10 módulos de JS a Docker</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Ejercicios interactivos en el browser</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Simulador de entrevista por empresa</li>
                <li className="flex items-center gap-2"><span className="material-icons text-sm text-[var(--accent)]">check_circle</span> Preguntas reales de Naranja X y Globant</li>
              </ul>
              <Link
                href="/fullstack/js-fundamentals"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] font-medium hover:bg-[var(--accent)] hover:text-[#0F0F0F] transition-all"
              >
                Comenzar
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ¿POR QUÉ STUDYHUB? */}
        <section className="bg-[var(--surface)] py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-black text-4xl mb-6 text-[var(--text)]">
                  Diseñado para developers
                  <br />
                  que aprenden solos
                </h2>
                <p className="text-[var(--text-2)] mb-8 leading-relaxed">
                  La mayoría de los recursos están en inglés, cuestan dinero, o te enseñan con videos que olvidás a los 10 minutos. StudyHub está en español, es gratuito, y no podés avanzar hasta demostrar que realmente entendiste.
                </p>
                <ul className="space-y-4">
                  {[
                    'Sin videos que se olvidan — solo texto que obliga a pensar',
                    'Sin avance automático — el 100% en el quiz desbloquea el siguiente',
                    'Sin teoría sin práctica — cada concepto tiene ejercicio de código',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[var(--text-2)]">
                      <span className="material-icons text-[var(--accent)] text-xl shrink-0 mt-0.5">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '3 Tracks', label: 'Completos y en español' },
                  { num: '100%', label: 'Requerido para avanzar' },
                  { num: '35+', label: 'Ejercicios LeetCode' },
                  { num: '0$', label: 'Para siempre gratuito' },
                ].map((s) => (
                  <div key={s.num} className="p-4 rounded-xl bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)]">
                    <p className="text-2xl font-black text-[var(--accent)]">{s.num}</p>
                    <p className="text-sm text-[var(--text-2)]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 py-20">
          <div className="p-8 md:p-12 rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--accent-dim)] to-transparent text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text)]">¿Listo para empezar?</h2>
            <p className="text-[var(--text-2)] mb-8 max-w-xl mx-auto">
              No necesitás registrarte. No necesitás pagar. Solo abrís el primer módulo y empezás.
            </p>
            <Link
              href="/dsa/big-o"
              className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:opacity-90 text-[#0F0F0F] font-semibold rounded-full h-14 px-10 shadow-lg transition-all"
            >
              Abrir el primer módulo
              <span className="material-icons">arrow_forward</span>
            </Link>
            <p className="text-sm text-[var(--text-3)] mt-6">
              ¿Querés contribuir?{' '}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                Abrí un PR en GitHub
              </a>
              .
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-[var(--border)] py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className="material-icons text-[var(--accent)]">auto_awesome</span>
                <span className="font-bold text-[var(--text)]">StudyHub</span>
              </div>
              <p className="text-sm text-[var(--text-2)]">Hecho por y para developers de ARG/LATAM</p>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 text-sm">
              <Link href="/dsa/big-o" className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">DSA & LeetCode</Link>
              <Link href="/flutter/dart-base" className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">Flutter Expert</Link>
              <Link href="/fullstack/js-fundamentals" className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">Full Stack Web</Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">GitHub</a>
            </div>
            <p className="text-xs text-[var(--text-3)] mt-8">© 2026 StudyHub — Open Source bajo licencia MIT</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
