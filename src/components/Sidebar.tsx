import React, { useState } from 'react';
import clsx from 'clsx';

type NavItem = { key: string; label: string; href: string; icon?: React.ReactNode };

export function Sidebar({ items }: { items: NavItem[] }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={clsx('flex flex-col h-screen transition-all duration-300 bg-transparent', collapsed ? 'w-20' : 'w-72')}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-card-1">S</div>
          {!collapsed && <div className="text-lg font-semibold text-[var(--text-primary)]">SmartERP</div>}
        </div>
        <button className="p-2 rounded-md hover:bg-[var(--muted)]" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle navigation">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
      <nav className="flex-1 overflow-auto px-2 py-3">
        {items.map(i => (
          <a key={i.key} href={i.href} className={clsx('flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--muted)] transition-colors', collapsed ? 'justify-center' : '')}>
            <span className="w-8 h-8 flex items-center justify-center text-[var(--primary-500)]">{i.icon}</span>
            {!collapsed && <span className="text-sm text-[var(--text-primary)]">{i.label}</span>}
          </a>
        ))}
      </nav>
      <div className="p-3 border-t border-[var(--slate-300)]">
        <button className="w-full py-2 rounded-lg bg-[var(--primary-500)] text-white">Quick Action</button>
      </div>
    </aside>
  );
}
