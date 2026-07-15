import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import 'chart.js/auto';

export function ChartCard({ title, subtitle, data, options }: { title: string; subtitle?: string; data: any; options?: any }) {
  return (
    <motion.section whileHover={{ y: -4 }} className="rounded-xxl-24 p-5 frosted shadow-card-1">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm text-[var(--text-secondary)]">{title}</div>
          {subtitle && <div className="text-xs text-[var(--text-secondary)]">{subtitle}</div>}
        </div>
      </div>
      <div>
        <Line data={data} options={options} />
      </div>
    </motion.section>
  );
}
