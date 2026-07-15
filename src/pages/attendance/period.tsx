import React, { useEffect, useState } from 'react';

export default function AttendancePeriod(){
  const [from,setFrom] = useState(new Date(Date.now()-6*24*3600*1000).toISOString().slice(0,10));
  const [to,setTo] = useState(new Date().toISOString().slice(0,10));
  const [rows,setRows] = useState<any[]>([]);

  useEffect(()=>{
    // demo aggregated data per student
    const data = Array.from({ length: 12 }).map((_,i)=>({ student: `Student ${i+1}`, roll: `R${200+i}`, present: Math.floor(Math.random()*6), total: 7, percent: Math.floor(Math.random()*100) }));
    setRows(data);
  },[from,to]);

  function exportCsv(){
    if(rows.length===0) return;
    const headers = Object.keys(rows[0]);
    const csv = [headers.join(',')].concat(rows.map(r => headers.map(h => `"${(r[h] ?? '')}"`).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `attendance-period-${from}-${to}.csv`; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Period Attendance</h1>
        <div className="flex gap-3">
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="p-2 rounded-lg bg-[var(--panel)]" />
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="p-2 rounded-lg bg-[var(--panel)]" />
          <button onClick={exportCsv} className="px-3 py-2 bg-[var(--primary-500)] text-white rounded-lg">Export CSV</button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl frosted p-3">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Student</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Roll</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Present</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Total</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,idx)=> (
              <tr key={idx} className="hover:bg-[var(--muted)]">
                <td className="py-3 px-3">{r.student}</td>
                <td className="py-3 px-3">{r.roll}</td>
                <td className="py-3 px-3">{r.present}</td>
                <td className="py-3 px-3">{r.total}</td>
                <td className="py-3 px-3">{r.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
