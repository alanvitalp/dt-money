import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface TransactionProviderProps {
    children: ReactNode
}

interface Transaction {
    id: number
    title: string
    amount: number;
    type: string;
    category: string;
    createdAt: string
}

interface TransactionContextData {
    transactions: Transaction[]
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

export const TransactionsContext = createContext({} as TransactionContextData);

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
      api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction (transaction: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transaction, createdAt: new Date()
        })
        setTransactions([...transactions, response.data.transaction])
    }
    
    return (
        <TransactionsContext.Provider 
          value={{ 
            transactions, 
            createTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}