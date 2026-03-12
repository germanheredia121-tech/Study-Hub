'use client';

import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('studyhub_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('studyhub_theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        flex items-center justify-center
        w-9 h-9 rounded-lg
        bg-[var(--surface-2)]
        border border-[var(--border)]
        text-[var(--text-2)]
        hover:text-[var(--accent)]
        hover:border-[var(--accent-border)]
        transition-all duration-200
        cursor-pointer
      "
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      <span className="material-icons text-xl">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
