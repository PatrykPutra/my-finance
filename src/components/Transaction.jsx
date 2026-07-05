import '../App.css'
import {useState} from 'react'
import {deleteTransaction, getTransactions} from '../services/transactionService'
import TransactionEditor from './TransactionEditor'
import { useAuthentication } from '../context/AuthenticationProvider'
import { useNotification } from '../context/NotificationProvider'
import {Button} from 'antd'

export default function Transaction({transaction, setTransactions}) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isInEditing, setIsInEditing] = useState(false);
    const authentication = useAuthentication();
    const notification = useNotification();

    const handleDelete = () => {

        deleteTransaction(authentication.token, transaction.id)
            .then(() => {
                getTransactions(authentication.token)
                    .then(data => setTransactions(data))
                    .catch(error => notification.requestNotification("error",error.message, "TransactionsList"));
                notification.cancelNotification("TransactionsList");
            })
    }
    return (
        <>
            {
                !isInEditing &&
                <div key={transaction.id} className="transaction" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <div className='transaction-body'>
                        <div className="transaction-description">
                            <p>{transaction.date}</p>
                            <h3>{transaction.title}</h3>
                        </div>

                        <div className="transaction-finance">
                            <p className={transaction.amount < 0 ? 'transaction-expense' : 'transaction-income'}>{transaction.amount}</p>
                            <p>Balance: {transaction.saldo}</p>
                        </div>
                    </div>

                    <div>
                        {
                            !isCollapsed &&
                            <div className='transaction-buttons'>
                                <Button onClick={handleDelete}>Delete</Button>
                                <Button onClick={() => setIsInEditing(!isInEditing)}>Edit</Button>
                            </div>
                        }
                    </div>
                </div>
            }
            {
                isInEditing &&
                <TransactionEditor
                    transaction={transaction}
                    setTransactions={setTransactions}
                    setIsInEditing={setIsInEditing}
                />
            }
        </>
    )
}