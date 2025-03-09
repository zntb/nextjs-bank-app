'use client';
import Link from 'next/link';
import {
  ArrowRight,
  CreditCard,
  DollarSign,
  Download,
  Plus,
  Send,
  Settings,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/navbar';

export default function DashboardPage() {
  const accounts = [
    {
      id: '1',
      name: 'Main Checking',
      number: '****4567',
      balance: 5840.5,
      type: 'checking',
    },
    {
      id: '2',
      name: 'Savings Account',
      number: '****7890',
      balance: 12750.75,
      type: 'savings',
    },
    {
      id: '3',
      name: 'Credit Card',
      number: '****2345',
      balance: 1250.0,
      limit: 5000.0,
      type: 'credit',
    },
  ];

  const recentTransactions = [
    {
      id: 't1',
      description: 'Grocery Store',
      amount: -85.32,
      date: 'Today',
      category: 'Shopping',
    },
    {
      id: 't2',
      description: 'Monthly Salary',
      amount: 3200.0,
      date: 'Yesterday',
      category: 'Income',
    },
    {
      id: 't3',
      description: 'Electric Bill',
      amount: -124.79,
      date: 'Mar 3, 2025',
      category: 'Utilities',
    },
    {
      id: 't4',
      description: 'Restaurant',
      amount: -64.25,
      date: 'Mar 2, 2025',
      category: 'Dining',
    },
    {
      id: 't5',
      description: 'Online Transfer',
      amount: -500.0,
      date: 'Mar 1, 2025',
      category: 'Transfer',
    },
  ];

  const upcomingPayments = [
    {
      id: 'p1',
      description: 'Rent Payment',
      amount: 1200.0,
      dueDate: 'Mar 10, 2025',
    },
    {
      id: 'p2',
      description: 'Car Insurance',
      amount: 145.5,
      dueDate: 'Mar 15, 2025',
    },
    {
      id: 'p3',
      description: 'Internet Bill',
      amount: 79.99,
      dueDate: 'Mar 18, 2025',
    },
  ];

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar isLoggedIn={true} />
      <main className='flex-1 bg-muted/40'>
        <div className='container py-6'>
          <div className='mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
              <p className='text-muted-foreground'>Welcome back, John Doe</p>
            </div>
            <div className='flex items-center gap-2'>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                New Transfer
              </Button>
            </div>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {accounts.map(account => (
              <Card key={account.id}>
                <CardHeader className='pb-2'>
                  <div className='flex items-start justify-between'>
                    <div>
                      <CardTitle>{account.name}</CardTitle>
                      <CardDescription>{account.number}</CardDescription>
                    </div>
                    {account.type === 'credit' ? (
                      <Badge variant='outline' className='bg-muted'>
                        Credit
                      </Badge>
                    ) : (
                      <Badge variant='outline' className='bg-muted capitalize'>
                        {account.type}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    $
                    {account.balance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  {account.type === 'credit' && (
                    <div className='mt-2'>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-muted-foreground'>
                          Credit Limit: $
                          {account.limit?.toLocaleString() ?? 'N/A'}
                        </span>
                        <span>
                          {account.limit
                            ? Math.round(
                                (account.balance / account.limit) * 100,
                              )
                            : 0}
                          % used
                        </span>
                      </div>
                      <Progress
                        value={(account.balance / (account.limit ?? 1)) * 100}
                        className='mt-1'
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className='pt-2'>
                  <Button variant='outline' size='sm' className='w-full'>
                    View Details
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className='mt-6 grid gap-6 md:grid-cols-2'>
            <Card className='col-span-1'>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {recentTransactions.map(transaction => (
                    <div
                      key={transaction.id}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-4'>
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            transaction.amount > 0 ? 'bg-green-100' : 'bg-muted'
                          }`}
                        >
                          {transaction.amount > 0 ? (
                            <DollarSign className='h-5 w-5 text-green-600' />
                          ) : (
                            <CreditCard className='h-5 w-5 text-muted-foreground' />
                          )}
                        </div>
                        <div>
                          <p className='font-medium'>
                            {transaction.description}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {transaction.date} · {transaction.category}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`text-right ${
                          transaction.amount > 0 ? 'text-green-600' : ''
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : ''}$
                        {Math.abs(transaction.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant='outline' size='sm' className='w-full'>
                  View All Transactions
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </CardFooter>
            </Card>

            <div className='col-span-1 grid gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {upcomingPayments.map(payment => (
                      <div
                        key={payment.id}
                        className='flex items-center justify-between'
                      >
                        <div>
                          <p className='font-medium'>{payment.description}</p>
                          <p className='text-xs text-muted-foreground'>
                            Due {payment.dueDate}
                          </p>
                        </div>
                        <div className='text-right'>
                          $
                          {payment.amount.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant='outline' size='sm' className='w-full'>
                    Manage Payments
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                    <Button
                      variant='outline'
                      className='h-auto flex-col items-center justify-center py-4'
                    >
                      <Send className='mb-2 h-5 w-5' />
                      <span>Transfer</span>
                    </Button>
                    <Button
                      variant='outline'
                      className='h-auto flex-col items-center justify-center py-4'
                    >
                      <Download className='mb-2 h-5 w-5' />
                      <span>Deposit</span>
                    </Button>
                    <Button
                      variant='outline'
                      className='h-auto flex-col items-center justify-center py-4'
                    >
                      <User className='mb-2 h-5 w-5' />
                      <span>Profile</span>
                    </Button>
                    <Button
                      variant='outline'
                      className='h-auto flex-col items-center justify-center py-4'
                    >
                      <Settings className='mb-2 h-5 w-5' />
                      <span>Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className='border-t py-4'>
        <div className='container flex flex-col items-center justify-between gap-4 md:flex-row'>
          <p className='text-center text-sm text-muted-foreground'>
            © {new Date().getFullYear()} SecureBank. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <Link
              href='#'
              className='text-xs text-muted-foreground hover:underline'
            >
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-xs text-muted-foreground hover:underline'
            >
              Terms of Service
            </Link>
            <Link
              href='#'
              className='text-xs text-muted-foreground hover:underline'
            >
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
