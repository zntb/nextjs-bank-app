'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import TransactionForm from '../../components/TransactionForm';
import type { BankAccount, Transaction } from '@prisma/client';

export default function Dashboard() {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchAccounts();
      fetchTransactions();
    }
  }, [session]);

  const fetchAccounts = async () => {
    const res = await fetch('/api/accounts');
    if (res.ok) {
      const data = await res.json();
      setAccounts(data);
    }
    setLoading(false);
  };

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    if (res.ok) {
      const data = await res.json();
      setTransactions(data);
    }
  };

  const handleTransactionComplete = () => {
    fetchAccounts();
    fetchTransactions();
  };

  if (!session) {
    return <div>Access Denied</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
      <p className='mt-2 text-gray-600'>Welcome, {session.user?.name}!</p>

      <div className='mt-6'>
        <h2 className='text-xl font-semibold text-gray-900'>Your Accounts</h2>
        {accounts.length === 0 ? (
          <p>You don&apos;t have any accounts yet.</p>
        ) : (
          <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {accounts.map(account => (
              <div key={account.id} className='bg-white shadow rounded-lg p-4'>
                <h3 className='text-lg font-medium'>{account.type} Account</h3>
                <p className='text-gray-500'>
                  Account Number: {account.accountNumber}
                </p>
                <p className='text-2xl font-bold mt-2'>
                  ${account.balance.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-gray-900'>New Transaction</h2>
        <TransactionForm
          accounts={accounts}
          onTransactionComplete={handleTransactionComplete}
        />
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Recent Transactions
        </h2>
        {transactions.length === 0 ? (
          <p>No recent transactions.</p>
        ) : (
          <div className='mt-4 bg-white shadow overflow-hidden sm:rounded-md'>
            <ul className='divide-y divide-gray-200'>
              {transactions.slice(0, 5).map(transaction => (
                <li key={transaction.id}>
                  <div className='px-4 py-4 flex items-center sm:px-6'>
                    <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                      <div>
                        <p className='text-sm font-medium text-indigo-600 truncate'>
                          {transaction.description || transaction.type}
                        </p>
                        <p className='mt-2 flex items-center text-sm text-gray-500'>
                          <span className='truncate'>
                            {new Date(
                              transaction.createdAt,
                            ).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <div className='mt-4 flex-shrink-0 sm:mt-0 sm:ml-5'>
                        <p
                          className={`text-sm font-medium ${
                            transaction.type === 'DEPOSIT'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'DEPOSIT' ? '+' : '-'}$
                          {transaction.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}
