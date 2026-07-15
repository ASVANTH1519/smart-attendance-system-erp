import type { NextApiRequest, NextApiResponse } from 'next';
import { mockUsers } from '../../../lib/users';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simple /api/auth/me for demo: accept token in header
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing token' });
    return;
  }
  const token = auth.replace('Bearer ', '');
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [id] = decoded.split(':');
    const user = mockUsers.find(u => u.id === id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    return res.status(200).json({ data: { id: user.id, name: user.name, role: user.role, username: user.username } });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
