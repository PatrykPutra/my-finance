import '../App.css'
import {useEffect,useState} from 'react'
import AddTransaction from './AddTransaction.jsx'
import Transaction from './Transaction.jsx'
import {getTransactions} from '../services/transactionService.js'
import Notification from './Notification.jsx'
import { useAuthentication } from '../context/AuthenticationProvider.jsx'
import { useNotification } from '../context/NotificationProvider.jsx'

export default function TransactionsList({transactions,setTransactions}) {

const notification = useNotification();
const authentication = useAuthentication();
const token = authentication.token;
    useEffect(() => {
        try {
            getTransactions(token)
                .then(data => setTransactions(data))
                .catch(error => notification.requestNotification("error",error,"TransactionsList"));
            notification.cancelNotification("TransactionsList");
        }
        catch (error) {
            notification.requestNotification("error",error,"TransactionsList");
        }
    },[]);

    return(
        <div>
            <AddTransaction 
                transactions={transactions} 
                setTransactions={setTransactions}
            />
            {notification.notification.audience==="TransactionsList" && 
                <Notification 
                    type={notification.notification.type} 
                    message={notification.notification.message}
                />
            }
            <ul className='transaction-list'>
                {
                    transactions.map(transaction => (
                        <Transaction 
                            key={transaction.id} 
                            transaction={transaction} 
                            setTransactions={setTransactions} 
                        />
                    ))
                }
            </ul>
        </div>
    )
}