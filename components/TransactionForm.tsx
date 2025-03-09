'use client';

import type React from 'react';

import { useState } from 'react';
import type { BankAccount } from '@prisma/client';

type TransactionFormProps = {
  accounts: BankAccount[];
  onTransactionComplete: () => void;
};

export default function TransactionForm({
  accounts,
  onTransactionComplete,
}: TransactionFormProps) {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('DEPOSIT');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/transactions/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromAccountId,
        toAccountId,
        amount: Number.parseFloat(amount),
        type,
        description,
      }),
    });

    if (response.ok) {
      onTransactionComplete();
      setAmount('');
      setDescription('');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
      <div>
        <label
          htmlFor='type'
          className='block text-sm font-medium text-gray-700'
        >
          Transaction Type
        </label>
        <select
          id='type'
          value={type}
          onChange={e => setType(e.target.value)}
          className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
        >
          <option value='DEPOSIT'>Deposit</option>
          <option value='WITHDRAWAL'>Withdrawal</option>
          <option value='TRANSFER'>Transfer</option>
        </select>
      </div>
      <div>
        <label
          htmlFor='fromAccount'
          className='block text-sm font-medium text-gray-700'
        >
          From Account
        </label>
        <select
          id='fromAccount'
          value={fromAccountId}
          onChange={e => setFromAccountId(e.target.value)}
          className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
        >
          <option value=''>Select an account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.type} - {account.accountNumber}
            </option>
          ))}
        </select>
      </div>
      {type === 'TRANSFER' && (
        <div>
          <label
            htmlFor='toAccount'
            className='block text-sm font-medium text-gray-700'
          >
            To Account
          </label>
          <select
            id='toAccount'
            value={toAccountId}
            onChange={e => setToAccountId(e.target.value)}
            className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          >
            <option value=''>Select an account</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.type} - {account.accountNumber}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label
          htmlFor='amount'
          className='block text-sm font-medium text-gray-700'
        >
          Amount
        </label>
        <input
          type='number'
          id='amount'
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          required
        />
      </div>
      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <input
          type='text'
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      <div>
        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Submit Transaction
        </button>
      </div>
    </form>
  );
}
