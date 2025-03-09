import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import speakeasy from 'speakeasy';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });

      if (!user || !user.twoFactorSecret) {
        return res.status(400).json({ message: 'Invalid request' });
      }

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
      });

      if (verified) {
        await prisma.user.update({
          where: { id: user.id },
          data: { twoFactorEnabled: true },
        });
        res.status(200).json({ message: 'Two-factor authentication enabled' });
      } else {
        res.status(400).json({ message: 'Invalid token' });
      }
    } catch (error) {
      console.error('Verify 2FA error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
