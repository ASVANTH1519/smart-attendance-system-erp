import React, { useEffect, useState } from 'react';
import StudentForm from '../../components/StudentForm';

export default function StudentsPage(){
  const [students, setStudents] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  async function load(){
    const res = await fetch('/api/students');
    const d = await res.json();
    setStudents(d.data || []);
  }

  useEffect(()=>{ load(); },[]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Students</h1>
        <div>
          <button onClick={()=>setShowCreate(true)} className="px-4 py-2 bg-[var(--primary-500)] text-white rounded-lg">Create Student</button>
        </div>
      </div>

      {showCreate && (
        <div className="mb-4 p-4 frosted rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">Create student</div>
            <button onClick={()=>setShowCreate(false)} className="text-sm">Close</button>
          </div>
          <StudentForm onSaved={() => { setShowCreate(false); load(); }} />
        </div>
      )}

      <div className="overflow-auto rounded-xl frosted p-3">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Name</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Roll</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Dept</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Year</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s=> (
              <tr key={s.id} className="hover:bg-[var(--muted)]">
                <td className="py-3 px-3">{s.name}</td>
                <td className="py-3 px-3">{s.roll}</td>
                <td className="py-3 px-3">{s.department}</td>
                <td className="py-3 px-3">{s.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
