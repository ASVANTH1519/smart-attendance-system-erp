import type { NextApiRequest, NextApiResponse } from 'next';

export function requireRole(req: NextApiRequest, res: NextApiResponse, allowedRoles: string[]) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing token' });
    return null;
  }
  try {
    const token = auth.replace('Bearer ', '');
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [id] = decoded.split(':');
    // mapping demo ids to roles (kept in-memory for demo)
    const roleMap: Record<string, string> = {
      u_admin: 'Admin',
      u_hod: 'HOD',
      u_teacher: 'Teacher',
      u_parent: 'Parent'
    };
    const role = roleMap[id];
    if (!role) {
      res.status(401).json({ error: 'Invalid token' });
      return null;
    }
    if (!allowedRoles.includes(role)) {
      res.status(403).json({ error: 'Forbidden' });
      return null;
    }
    return { id, role };
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
}
