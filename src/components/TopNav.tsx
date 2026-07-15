import React from 'react';

export function TopNav() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[var(--slate-300)] bg-transparent">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-[var(--muted)]" aria-label="open sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </button>
        <div className="relative w-[420px] max-w-[50vw]">
          <input type="search" placeholder="Search students, staff, device ID, etc. (Press ⌘K)" className="w-full rounded-xl border-none py-3 px-4 bg-[var(--panel)] shadow-card-1 focus:outline-none text-[var(--text-primary)]" aria-label="Global search"/>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-[var(--muted)]" aria-label="notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 17H9v-6a3 3 0 0 1 6 0v6z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </button>
        <div className="flex items-center gap-3">
          <img src="/avatar.jpg" alt="Profile" className="w-9 h-9 rounded-full border-2 border-white shadow-sm"/>
          <div className="hidden md:block text-sm">
            <div className="font-medium text-[var(--text-primary)]">A. Patel</div>
            <div className="text-xs text-[var(--text-secondary)]">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
