'use client';

import { useState } from 'react';

export default function TwoFactorSetup() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const setupTwoFactor = async () => {
    const res = await fetch('/api/user/setup-2fa', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      setQrCodeDataUrl(data.qrCodeDataUrl);
      setSecret(data.secret);
    }
  };

  const verifyTwoFactor = async () => {
    const res = await fetch('/api/user/verify-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      setIsEnabled(true);
    } else {
      alert('Invalid token. Please try again.');
    }
  };

  return (
    <div className='mt-6'>
      <h2 className='text-lg font-medium text-gray-900'>
        Two-Factor Authentication
      </h2>
      {!isEnabled ? (
        <>
          {!qrCodeDataUrl ? (
            <button
              onClick={setupTwoFactor}
              className='mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Set up Two-Factor Authentication
            </button>
          ) : (
            <div className='mt-4'>
              <p className='text-sm text-gray-600'>
                Scan this QR code with your authenticator app:
              </p>
              <img
                src={qrCodeDataUrl || '/placeholder.svg'}
                alt='2FA QR Code'
                className='mt-2'
              />
              <p className='mt-2 text-sm text-gray-600'>
                Or enter this code manually: {secret}
              </p>
              <div className='mt-4'>
                <label
                  htmlFor='token'
                  className='block text-sm font-medium text-gray-700'
                >
                  Enter the 6-digit code from your authenticator app:
                </label>
                <input
                  type='text'
                  id='token'
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <button
                  onClick={verifyTwoFactor}
                  className='mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Verify and Enable
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className='mt-2 text-sm text-green-600'>
          Two-Factor Authentication is enabled.
        </p>
      )}
    </div>
  );
}
