import React, { useEffect, useState } from 'react';

function exportCsv(rows: any[], filename = 'attendance.csv'){
  if(rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(',')].concat(rows.map(r => headers.map(h => `"${(r[h] ?? '')}"`).join(','))).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function AttendanceDaily(){
  const [date,setDate] = useState(new Date().toISOString().slice(0,10));
  const [rows,setRows] = useState<any[]>([]);

  useEffect(()=>{
    // For demo we generate fake rows based on date
    const data = Array.from({ length: 20 }).map((_,i)=>({ student: `Student ${i+1}`, roll: `R${100+i}`, status: Math.random()>0.1? 'present' : 'absent', time: '09:0'+(i%6) }));
    setRows(data);
  },[date]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Daily Attendance</h1>
        <div className="flex gap-3">
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="p-2 rounded-lg bg-[var(--panel)]" />
          <button onClick={()=>exportCsv(rows, `attendance-${date}.csv`)} className="px-3 py-2 bg-[var(--primary-500)] text-white rounded-lg">Export CSV</button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl frosted p-3">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Student</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Roll</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Status</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,idx)=> (
              <tr key={idx} className="hover:bg-[var(--muted)]">
                <td className="py-3 px-3">{r.student}</td>
                <td className="py-3 px-3">{r.roll}</td>
                <td className="py-3 px-3">{r.status}</td>
                <td className="py-3 px-3">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
