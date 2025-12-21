import '../App.css'
import {useEffect,useState} from 'react'
import AddTransaction from './AddTransaction.jsx'
import Transaction from './Transaction.jsx'
import {getTransactions} from '../services/transactionService.js'
import ErrorNotification from './ErrorNotification.jsx'

export default function TransactionsList({token,transactions,setTransactions,transactionsError, setTransactionsError}) {

    useEffect(() => {
        try {
            getTransactions(token)
                .then(data => setTransactions(data))
                .catch(error => setTransactionsError(error.message));
            setTransactionsError(null);
        }
        catch (error) {
            setTransactionsError(error.message);
        }
    },[]);

    return(
        <div>
            <AddTransaction token={token} transactions={transactions} setTransactions={setTransactions}></AddTransaction>
            {transactionsError && <ErrorNotification message={transactionsError}></ErrorNotification>}
            <ul className='transaction-list'>
                {
                    transactions.map(transaction => (
                        <Transaction key={transaction.id} transaction={transaction} token={token} setTransactions={setTransactions} setTransactionsError={setTransactionsError} />
                    ))
                }
            </ul>
        </div>
    )
}