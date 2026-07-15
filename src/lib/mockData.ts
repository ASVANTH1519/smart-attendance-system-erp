// Extended mock data with tags and device logs
export const students = [
  { id: 's1', name: 'A. Kumar', roll: 'CS102', department: 'Computer Science', year: '2', avatar: '' },
  { id: 's2', name: 'S. Rao', roll: 'EE301', department: 'Electrical', year: '3', avatar: '' },
  { id: 's3', name: 'M. Singh', roll: 'ME201', department: 'Mechanical', year: '2', avatar: '' }
];

export const devices = [
  { id: 'd1', name: 'Gate RFID Reader - Main', location: 'Main Gate', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'd2', name: 'Block A Reader', location: 'Block A', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'd3', name: 'Block B Reader', location: 'Block B', status: 'offline', lastSeen: new Date(Date.now()-1000*60*60).toISOString() }
];

export const tags: { id: string; tagId: string; studentId?: string }[] = [
  { id: 't1', tagId: 'TAG-1001', studentId: 's1' },
  { id: 't2', tagId: 'TAG-1002', studentId: 's2' }
];

export const deviceLogs: { id: string; deviceId: string; message: string; level: 'info' | 'warn' | 'error'; timestamp: string }[] = [
  { id: 'l1', deviceId: 'd1', message: 'Heartbeat received', level: 'info', timestamp: new Date().toISOString() },
  { id: 'l2', deviceId: 'd3', message: 'Connection lost', level: 'warn', timestamp: new Date(Date.now()-1000*60*60).toISOString() }
];

export const notifications = [
  { id: 'n1', to: 'parent1@example.com', type: 'sms', status: 'sent', message: 'A. Kumar marked absent today', createdAt: new Date().toISOString() }
];
