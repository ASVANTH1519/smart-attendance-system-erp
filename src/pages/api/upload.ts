import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'POST'){
    // Accept base64 image and return data URL
    const { name, content } = req.body || {};
    if(!content) return res.status(400).json({ error: 'Missing content' });
    // In a real app you'd store the file; here we echo back a data URL
    const url = content.startsWith('data:') ? content : `data:image/png;base64,${content}`;
    return res.status(201).json({ data: { url } });
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
