import React, { useEffect, useState } from 'react';

export default function TagAssignment(){
  const [tags, setTags] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(()=>{
    fetch('/api/tags').then(r=>r.json()).then(d=>setTags(d.data || []));
    fetch('/api/students').then(r=>r.json()).then(d=>setStudents(d.data || []));
  },[]);

  async function assign(){
    if(!selectedTag || !selectedStudent) return alert('Select both');
    const res = await fetch('/api/tags', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token') || ''}` }, body: JSON.stringify({ tagId: selectedTag, studentId: selectedStudent }) });
    if(res.ok){ alert('Assigned'); const d = await res.json(); setTags(prev=>[...prev, d.data]); }
    else alert('Failed');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Tag Assignment</h1>
      <div className="mb-4 p-4 frosted rounded-lg">
        <div className="flex gap-3 items-center">
          <select value={selectedTag} onChange={e=>setSelectedTag(e.target.value)} className="p-2 rounded-lg bg-[var(--panel)]">
            <option value="">Select Tag</option>
            {tags.map(t=> <option key={t.id} value={t.tagId}>{t.tagId} {t.studentId? `(Assigned to ${t.studentId})` : ''}</option>)}
          </select>
          <select value={selectedStudent} onChange={e=>setSelectedStudent(e.target.value)} className="p-2 rounded-lg bg-[var(--panel)]">
            <option value="">Select Student</option>
            {students.map(s=> <option key={s.id} value={s.id}>{s.name} ({s.roll})</option>)}
          </select>
          <button onClick={assign} className="px-3 py-2 bg-[var(--primary-500)] text-white rounded-lg">Assign</button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl frosted p-3">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Tag</th>
              <th className="text-left text-sm text-[var(--text-secondary)] py-2 px-3">Student</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(t=> (
              <tr key={t.id} className="hover:bg-[var(--muted)]">
                <td className="py-3 px-3">{t.tagId}</td>
                <td className="py-3 px-3">{t.studentId || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
