'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const nextIsDark = saved ? saved === 'dark' : prefersDark;
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle('dark', nextIsDark);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-brand/60 hover:text-brand transition"
        >
            <span className="text-base">{mounted && isDark ? '🌙' : '☀️'}</span>
            <span className="hidden sm:inline">{mounted && isDark ? 'Dark' : 'Light'}</span>
        </button>
    );
}
