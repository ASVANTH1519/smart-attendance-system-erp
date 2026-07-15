import type { NextApiRequest, NextApiResponse } from 'next';
import { students } from '../../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query;
  const sid = Array.isArray(id) ? id[0] : id;
  const idx = students.findIndex(s => s.id === sid);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });

  if(req.method === 'GET'){
    return res.status(200).json({ data: students[idx] });
  }
  if(req.method === 'PUT'){
    const { name, roll, department, year } = req.body || {};
    const item = { ...students[idx], name, roll, department, year };
    students[idx] = item;
    return res.status(200).json({ data: item });
  }
  res.setHeader('Allow', ['GET','PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
