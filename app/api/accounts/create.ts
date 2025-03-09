import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { type } = req.body;

  if (!type) {
    return res.status(400).json({ message: 'Account type is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accountNumber = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, '0');

    const account = await prisma.bankAccount.create({
      data: {
        userId: user.id,
        accountNumber,
        type,
      },
    });

    res.status(201).json(account);
  } catch (error) {
    console.error('Account creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
