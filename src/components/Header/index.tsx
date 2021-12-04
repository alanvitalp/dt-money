import logoImg from '../../assets/logo.svg'

import * as styles from './styles'

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header ({ onOpenNewTransactionModal }: HeaderProps) {

  return (
    <styles.Container>
      <styles.Content>
        <img src={logoImg} alt="dt money" />
        <button onClick={onOpenNewTransactionModal} type="button">
          Nova transação
        </button>
      </styles.Content>
    </styles.Container>
  )
}