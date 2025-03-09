import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  if (!session || session.user?.role !== 'STAFF') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const pendingTransactions = await prisma.transaction.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(pendingTransactions);
    } catch (error) {
      console.error('Fetch pending transactions error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
