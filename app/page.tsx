import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar isLoggedIn={false} />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
              <div className='space-y-4'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Banking that works for you
                </h1>
                <p className='text-muted-foreground md:text-xl'>
                  Secure, simple, and smart banking solutions for your everyday
                  financial needs.
                </p>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Link href='/register'>
                    <Button size='lg'>
                      Get Started
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </Link>
                  <Link href='/learn-more'>
                    <Button variant='outline' size='lg'>
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='rounded-lg border bg-background p-8 shadow-sm'>
                <div className='flex flex-col space-y-4'>
                  <div className='space-y-2'>
                    <h3 className='text-xl font-bold'>Quick Access</h3>
                    <p className='text-sm text-muted-foreground'>
                      Log in to access your accounts
                    </p>
                  </div>
                  <div className='grid gap-4'>
                    <Link href='/login'>
                      <Button className='w-full'>Online Banking</Button>
                    </Link>
                    <Link href='/mobile'>
                      <Button variant='outline' className='w-full'>
                        Mobile Banking
                      </Button>
                    </Link>
                    <Link href='/atm-locator'>
                      <Button variant='outline' className='w-full'>
                        ATM Locator
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  Our Services
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl'>
                  Comprehensive banking solutions designed to meet your
                  financial goals.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8'>
              {[
                {
                  title: 'Checking Accounts',
                  description:
                    'Everyday banking with no monthly fees and free online bill pay.',
                  icon: '💳',
                },
                {
                  title: 'Savings Accounts',
                  description:
                    'Competitive rates to help your money grow faster.',
                  icon: '💰',
                },
                {
                  title: 'Mobile Banking',
                  description:
                    'Bank on the go with our secure and easy-to-use mobile app.',
                  icon: '📱',
                },
                {
                  title: 'Personal Loans',
                  description:
                    'Flexible loan options with competitive rates for your needs.',
                  icon: '📝',
                },
                {
                  title: 'Mortgages',
                  description:
                    'Home financing solutions with personalized guidance.',
                  icon: '🏠',
                },
                {
                  title: 'Investment Services',
                  description:
                    'Expert advice to help you build and manage your portfolio.',
                  icon: '📈',
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'
                >
                  <div className='text-4xl'>{service.icon}</div>
                  <h3 className='text-xl font-bold'>{service.title}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.title
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    <Button variant='link' className='mt-2'>
                      Learn more
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full border-t bg-background py-6'>
        <div className='container px-4 md:px-6'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>Products</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Checking
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Savings
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Loans
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>Resources</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Financial Education
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Rates
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>Company</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>Legal</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:underline'
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-8 border-t pt-6'>
            <p className='text-center text-xs text-muted-foreground'>
              © {new Date().getFullYear()} SecureBank. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
