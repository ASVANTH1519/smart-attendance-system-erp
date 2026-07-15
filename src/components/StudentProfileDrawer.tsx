import React, { useState } from 'react';

export default function StudentProfileDrawer({ student, onSaved, onClose }: { student: any; onSaved?: () => void; onClose: () => void }){
  const [editing,setEditing] = useState(false);
  const [name,setName] = useState(student?.name || '');
  const [roll,setRoll] = useState(student?.roll || '');
  const [department,setDepartment] = useState(student?.department || '');
  const [year,setYear] = useState(student?.year || '1');
  const [avatar,setAvatar] = useState(student?.avatar || '');

  async function save(){
    // basic validation
    if(!name || !roll) return alert('Name and roll required');
    const payload: any = { name, roll, department, year };
    if(avatar.startsWith('data:')) payload.avatar = avatar;
    const res = await fetch(`/api/students/${student.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token') || ''}` }, body: JSON.stringify(payload) });
    if(res.ok){ onSaved?.(); setEditing(false); }
    else alert('Failed to save');
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const r = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: file.name, content: base64 }) });
      const d = await r.json();
      if(r.ok){ setAvatar(d.data.url); }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="fixed right-0 top-0 h-full w-[420px] bg-[var(--bg)] shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Profile</h3>
        <div className="flex gap-2">
          <button onClick={onClose} className="text-sm">Close</button>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img src={avatar || '/avatar.jpg'} alt="avatar" className="w-16 h-16 rounded-full" />
          <div>
            <div className="font-medium">{student.name}</div>
            <div className="text-sm text-[var(--text-secondary)]">{student.roll}</div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-2">
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 rounded-lg bg-[var(--panel)]" />
            <input value={roll} onChange={e=>setRoll(e.target.value)} className="w-full p-2 rounded-lg bg-[var(--panel)]" />
            <input value={department} onChange={e=>setDepartment(e.target.value)} className="w-full p-2 rounded-lg bg-[var(--panel)]" />
            <select value={year} onChange={e=>setYear(e.target.value)} className="w-full p-2 rounded-lg bg-[var(--panel)]">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <label className="block">
              <div className="text-sm text-[var(--text-secondary)] mb-1">Upload avatar</div>
              <input type="file" accept="image/*" onChange={handleUpload} />
            </label>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setEditing(false)} className="px-3 py-1 rounded-lg">Cancel</button>
              <button onClick={save} className="px-3 py-1 rounded-lg bg-[var(--primary-500)] text-white">Save</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-sm text-[var(--text-secondary)]">Department</div>
            <div className="font-medium mb-3">{student.department}</div>
            <div className="text-sm text-[var(--text-secondary)]">Year</div>
            <div className="font-medium">{student.year}</div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>setEditing(true)} className="px-3 py-1 rounded-lg bg-[var(--primary-500)] text-white">Edit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
