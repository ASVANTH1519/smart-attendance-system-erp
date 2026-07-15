import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type KpiCardProps = {
  title: string;
  value: number | string;
  delta?: number;
  icon?: React.ReactNode;
  className?: string;
};

export function KpiCard({ title, value, delta, icon, className }: KpiCardProps) {
  const deltaPositive = typeof delta === 'number' && delta >= 0;
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.28 }} className={clsx('rounded-xxl-24 p-5 frosted shadow-card-1 border border-transparent', className)} role="region" aria-label={title}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-[var(--text-secondary)]">{title}</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-2xl font-semibold text-[var(--text-primary)]">
              {typeof value === 'number' ? <CountUp end={value} duration={1.2} separator="," /> : value}
            </div>
            {delta !== undefined && (
              <div className={clsx('text-sm font-medium px-2 py-1 rounded-md', deltaPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>
                {deltaPositive ? '▲' : '▼'} {Math.abs(delta)}%
              </div>
            )}
          </div>
        </div>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr from-primary-400 to-primary-600">
          {icon ?? <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      </div>
    </motion.div>
  );
}
