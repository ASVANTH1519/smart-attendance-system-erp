import React, { useEffect, useState } from 'react';

export default function DeviceLogs(){
  const [logs, setLogs] = useState<any[]>([]);
  const [deviceId, setDeviceId] = useState('');

  useEffect(()=>{ load(); },[]);

  async function load(){
    const q = deviceId ? `?deviceId=${deviceId}` : '';
    const res = await fetch('/api/devices/logs' + q);
    const d = await res.json(); setLogs(d.data || []);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Device Logs</h1>
        <div className="flex gap-2">
          <input value={deviceId} onChange={e=>setDeviceId(e.target.value)} placeholder="device id (e.g. d1)" className="p-2 rounded-lg bg-[var(--panel)]" />
          <button onClick={load} className="px-3 py-2 bg-[var(--primary-500)] text-white rounded-lg">Filter</button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl frosted p-3">
        <ul className="space-y-2">
          {logs.map(l=> (
            <li key={l.id} className="p-3 rounded-lg bg-[var(--panel)] flex justify-between items-start">
              <div>
                <div className="font-medium">{l.message}</div>
                <div className="text-sm text-[var(--text-secondary)]">{l.deviceId} • {new Date(l.timestamp).toLocaleString()}</div>
              </div>
              <div className={`text-sm px-2 py-1 rounded ${l.level==='error'?'bg-red-100 text-red-700': l.level==='warn' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>{l.level}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
