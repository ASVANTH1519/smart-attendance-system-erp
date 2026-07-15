import React from 'react';

type Row = {
  id: string;
  student: string;
  class: string;
  status: 'present' | 'absent' | 'late';
  time?: string;
};

export function AttendanceTable({ data }: { data: Row[] }) {
  return (
    <div className="overflow-auto rounded-xl frosted p-3">
      <table className="min-w-full">
        <thead className="sticky top-0">
          <tr>
            <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Student</th>
            <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Class</th>
            <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Status</th>
            <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Time</th>
            <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="hover:bg-[var(--muted)]">
              <td className="py-3 px-3">{r.student}</td>
              <td className="py-3 px-3">{r.class}</td>
              <td className="py-3 px-3">
                <div className={`inline-block px-2 py-1 rounded-md text-sm ${r.status === 'present' ? 'bg-emerald-100 text-emerald-700' : r.status === 'late' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                  {r.status}
                </div>
              </td>
              <td className="py-3 px-3">{r.time}</td>
              <td className="py-3 px-3"><button className="text-primary-500">Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
