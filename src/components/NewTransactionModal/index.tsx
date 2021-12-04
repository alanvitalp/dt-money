import Modal from 'react-modal';

import * as styles from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useContext, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal ({ isOpen, onRequestClose }: NewTransationModalProps) {
  const { createTransaction } = useTransactions()
  
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      type,
      category,
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit');

    onRequestClose()
   
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        className="react-modal-close"
        onClick={onRequestClose}>
          <img src={closeImg} alt="Fechar modal" />
      </button>

      <styles.Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input placeholder="Titulo"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input type="number" placeholder="Valor" 
        value={amount} 
        onChange={(event) => setAmount(Number(event.target.value))}/>

        <styles.TransactionTypeContainer>
          <styles.RadioBox 
            type="button" 
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </styles.RadioBox >
          <styles.RadioBox  
            type="button" 
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </styles.RadioBox >
        </styles.TransactionTypeContainer>
        <input placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)}/>
        <button type="submit">Cadastrar</button>
      </styles.Container>
    </Modal>
  )
}