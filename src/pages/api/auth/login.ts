import type { NextApiRequest, NextApiResponse } from 'next';
import { mockUsers } from '../../../lib/users';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const { username, password } = req.body || {};
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  // Create a simple token (not secure) for demo only
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
  res.status(200).json({ data: { token, user: { id: user.id, name: user.name, role: user.role, username: user.username } } });
}
