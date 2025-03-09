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

  if (req.method === 'POST') {
    const { id } = req.query;

    try {
      const updatedTransaction = await prisma.transaction.update({
        where: { id: id as string },
        data: { status: 'COMPLETED' },
      });

      // Update account balances based on the transaction type
      if (
        updatedTransaction.type === 'WITHDRAWAL' ||
        updatedTransaction.type === 'TRANSFER'
      ) {
        await prisma.bankAccount.update({
          where: { id: updatedTransaction.fromAccountId },
          data: { balance: { decrement: updatedTransaction.amount } },
        });
      }

      if (updatedTransaction.type === 'DEPOSIT') {
        await prisma.bankAccount.update({
          where: { id: updatedTransaction.fromAccountId },
          data: { balance: { increment: updatedTransaction.amount } },
        });
      }

      if (
        updatedTransaction.type === 'TRANSFER' &&
        updatedTransaction.toAccountId
      ) {
        await prisma.bankAccount.update({
          where: { id: updatedTransaction.toAccountId },
          data: { balance: { increment: updatedTransaction.amount } },
        });
      }

      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error('Approve transaction error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
