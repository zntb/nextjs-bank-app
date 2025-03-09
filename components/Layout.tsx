import type { ReactNode } from 'react';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  isLoggedIn?: boolean;
  className?: string;
}

export default function Layout({
  children,
  isLoggedIn = false,
  className,
}: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className={cn('flex-1 bg-muted/40', className)}>
        <div className='container py-6'>{children}</div>
      </main>
      <footer className='border-t py-4'>
        <div className='container flex flex-col items-center justify-between gap-4 md:flex-row'>
          <p className='text-center text-sm text-muted-foreground'>
            © {new Date().getFullYear()} SecureBank. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <a
              href='#'
              className='text-xs text-muted-foreground hover:underline'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-xs text-muted-foreground hover:underline'
            >
              Terms of Service
            </a>
            <a
              href='#'
              className='text-xs text-muted-foreground hover:underline'
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
