import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

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
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const secret = speakeasy.generateSecret({ name: 'SecureBank' });
      const otpauthUrl = secret.otpauth_url;

      const qrCodeDataUrl = await qrcode.toDataURL(otpauthUrl as string);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorSecret: secret.base32,
          twoFactorEnabled: false,
        },
      });

      res.status(200).json({ qrCodeDataUrl, secret: secret.base32 });
    } catch (error) {
      console.error('Setup 2FA error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
