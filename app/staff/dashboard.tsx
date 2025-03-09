'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import type { Transaction } from '@prisma/client';

export default function StaffDashboard() {
  const { data: session } = useSession();
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === 'STAFF') {
      fetchPendingTransactions();
    }
  }, [session]);

  const fetchPendingTransactions = async () => {
    const res = await fetch('/api/staff/pending-transactions');
    if (res.ok) {
      const data = await res.json();
      setPendingTransactions(data);
    }
    setLoading(false);
  };

  const approveTransaction = async (transactionId: string) => {
    const res = await fetch(`/api/staff/approve-transaction/${transactionId}`, {
      method: 'POST',
    });
    if (res.ok) {
      fetchPendingTransactions();
    }
  };

  if (!session || session.user?.role !== 'STAFF') {
    return <div>Access Denied</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className='text-2xl font-semibold text-gray-900'>Staff Dashboard</h1>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Pending Transactions
        </h2>
        <div className='mt-4 flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        ID
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Amount
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Type
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Date
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {pendingTransactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>
                            {transaction.id}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-500'>
                            ${transaction.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-500'>
                            {transaction.type}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-500'>
                            {new Date(transaction.createdAt).toLocaleString()}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <button
                            onClick={() => approveTransaction(transaction.id)}
                            className='px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
