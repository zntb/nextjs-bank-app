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

  const { fromAccountId, toAccountId, amount, type, description } = req.body;

  if (!fromAccountId || !amount || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const fromAccount = await prisma.bankAccount.findUnique({
      where: { id: fromAccountId },
      include: { user: true },
    });

    if (!fromAccount || fromAccount.user.email !== session.user?.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (fromAccount.balance < amount && type !== 'DEPOSIT') {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    const transaction = await prisma.transaction.create({
      data: {
        fromAccountId,
        toAccountId,
        amount,
        type,
        description,
        status: 'COMPLETED',
      },
    });

    // Update account balances
    if (type === 'WITHDRAWAL' || type === 'TRANSFER') {
      await prisma.bankAccount.update({
        where: { id: fromAccountId },
        data: { balance: { decrement: amount } },
      });
    }

    if (type === 'DEPOSIT') {
      await prisma.bankAccount.update({
        where: { id: fromAccountId },
        data: { balance: { increment: amount } },
      });
    }

    if (type === 'TRANSFER' && toAccountId) {
      await prisma.bankAccount.update({
        where: { id: toAccountId },
        data: { balance: { increment: amount } },
      });
    }

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Transaction creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
