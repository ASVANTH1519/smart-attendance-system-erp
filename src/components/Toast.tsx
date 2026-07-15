import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Toast({ items }: { items: { id: string; title: string; body?: string }[] }) {
  return (
    <div aria-live="polite" className="fixed right-6 top-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {items.map(i => (
          <motion.div key={i.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[var(--panel)] p-3 rounded-lg shadow-card-1 border border-[var(--slate-300)]">
            <div className="font-medium">{i.title}</div>
            {i.body && <div className="text-sm text-[var(--text-secondary)]">{i.body}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
