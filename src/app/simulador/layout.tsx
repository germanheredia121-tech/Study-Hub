'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SimuladorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/simulador';

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
        <Link
          href={isHome ? '/' : '/simulador'}
          className="text-[var(--text-2)] hover:text-[var(--text)] text-xs font-mono transition-colors flex items-center gap-1"
        >
          <span className="material-icons text-sm mr-1">arrow_back</span>
          {isHome ? 'INICIO' : 'VOLVER'}
        </Link>
        <span className="text-sm font-mono text-[var(--text-2)]">Simulador de Entrevista</span>
      </header>
      {children}
    </div>
  );
}
