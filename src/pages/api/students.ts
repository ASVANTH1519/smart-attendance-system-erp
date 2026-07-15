import type { NextApiRequest, NextApiResponse } from 'next';
import { students } from '../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    res.status(200).json({ data: students });
    return;
  }
  if(req.method === 'POST'){
    const { name, roll, department, year } = req.body || {};
    const id = `s_${Date.now()}`;
    const item = { id, name, roll, department, year };
    students.unshift(item);
    res.status(201).json({ data: item });
    return;
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
