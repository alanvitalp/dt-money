import { useTransactions } from '../../hooks/useTransactions'
import * as styles from './styles'



interface Transaction {
  id: number
  title: string
  amount: number;
  type: string;
  category: string;
  createdAt: string
}

export const TransactionsTable = () => {
  const { transactions } = useTransactions()
  return (
    <styles.Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: Transaction) => {
            return (
              <tr key={transaction.id}>
                <td>
                  {transaction.title}
                </td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
              </tr>
            )
          })}
        </tbody>

      </table>
    </styles.Container>
  )
}
