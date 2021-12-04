import { Summary } from '../Summary'
import { TransactionsTable } from '../TransactionsTable'
import * as styles from './styles'

export function Dashboard () {
  return (
    <styles.Container>
      <Summary />
      <TransactionsTable/>
    </styles.Container>
  )
}