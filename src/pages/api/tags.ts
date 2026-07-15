import type { NextApiRequest, NextApiResponse } from 'next';
import { tags } from '../../lib/mockData';
import { requireRole } from '../_utils/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    return res.status(200).json({ data: tags });
  }
  if(req.method === 'POST'){
    // assign tag to student
    const auth = requireRole(req, res, ['Admin','HOD']);
    if(!auth) return;
    const { tagId, studentId } = req.body || {};
    const id = `t_${Date.now()}`;
    const item = { id, tagId, studentId };
    tags.push(item);
    return res.status(201).json({ data: item });
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
