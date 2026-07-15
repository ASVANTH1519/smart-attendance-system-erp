import React, { useState } from 'react';

export default function StudentForm({ onSaved }: { onSaved?: () => void }){
  const [name,setName]=useState('');
  const [roll,setRoll]=useState('');
  const [department,setDepartment]=useState('');
  const [year,setYear]=useState('1');
  const [saving,setSaving]=useState(false);

  async function submit(e: React.FormEvent){
    e.preventDefault();
    setSaving(true);
    try{
      const res = await fetch('/api/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, roll, department, year }) });
      if(res.ok){
        setName(''); setRoll(''); setDepartment(''); setYear('1');
        onSaved?.();
      }
    }catch(err){
      console.error(err);
    }finally{ setSaving(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block">
        <div className="text-sm text-[var(--text-secondary)] mb-1">Name</div>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-lg p-2 bg-[var(--panel)]" required />
      </label>
      <label className="block">
        <div className="text-sm text-[var(--text-secondary)] mb-1">Roll</div>
        <input value={roll} onChange={e=>setRoll(e.target.value)} className="w-full rounded-lg p-2 bg-[var(--panel)]" required />
      </label>
      <label className="block">
        <div className="text-sm text-[var(--text-secondary)] mb-1">Department</div>
        <input value={department} onChange={e=>setDepartment(e.target.value)} className="w-full rounded-lg p-2 bg-[var(--panel)]" />
      </label>
      <label className="block">
        <div className="text-sm text-[var(--text-secondary)] mb-1">Year</div>
        <select value={year} onChange={e=>setYear(e.target.value)} className="w-full rounded-lg p-2 bg-[var(--panel)]">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </label>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-[var(--primary-500)] text-white rounded-lg" disabled={saving}>{saving? 'Saving...':'Create Student'}</button>
      </div>
    </form>
  );
}
