import '../App.css'
import {useState} from 'react'
import {deleteTransaction, getTransactions} from '../services/transactionService'
import TransactionEditor from './TransactionEditor'

export default function Transaction({token,transaction, setTransactions,setTransactionsError}) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isInEditing, setIsInEditing] = useState(false);

    const handleDelete = () => {

        deleteTransaction(token, transaction.id)
            .then(() => {
                getTransactions(token)
                    .then(data => setTransactions(data))
                    .catch(error => setTransactionsError(error.message));
                setTransactionsError(null);
            })
    }
    return (
        <>
            {
                !isInEditing &&
                <div key={transaction.id} className="transaction" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <div className="transaction-description">
                        <p>{transaction.date}</p>
                        <p>{transaction.title}</p>
                    </div>

                    <div className="transaction-finance">
                        <p>{transaction.amount}</p>
                        <p>{transaction.saldo}</p>
                    </div>
                    <div>
                        {
                            !isCollapsed &&
                            <div>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={()=>setIsInEditing(!isInEditing)}>Edit</button>
                            </div>
                        }
                    </div>
                </div>
            }
            {
                isInEditing &&
                <TransactionEditor  token={token} transaction={transaction} setTransactions={setTransactions} setIsInEditing={setIsInEditing} setTransactionsError={setTransactionsError}></TransactionEditor>

            }
        </>   
    )
}