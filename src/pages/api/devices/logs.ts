import type { NextApiRequest, NextApiResponse } from 'next';
import { deviceLogs } from '../../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    // optional query deviceId
    const { deviceId } = req.query;
    const data = deviceId ? deviceLogs.filter(l => l.deviceId === deviceId) : deviceLogs;
    return res.status(200).json({ data });
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
