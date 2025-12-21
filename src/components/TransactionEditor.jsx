import '../App.css'
import {useState, useContext} from 'react'
import { updateTransaction, getTransactions } from '../services/transactionService';
import SearchQueryContext from '../context/SearchQueryContext';
import ErrorNotification from './ErrorNotification';

export default function TransactionEditor({token, transaction, setTransactions, setIsInEditing,setTransactionsError}) {

    const [newTitle, setNewTitle] = useState(transaction.title);
    const [newAmount, setNewAmount] = useState(transaction.amount);
    const {query, setQuery} = useContext(SearchQueryContext);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        updateTransaction(token, { id: transaction.id, title: newTitle, amount: newAmount })
            .then(() => {
                getTransactions(token, { title: query.searchPhrase, transactionType: query.filter })
                    .then((data) => {
                        setTransactions(data);
                        setIsInEditing(false);
                    })
                    .catch(err => setTransactionsError(err.message))
                setError(null);
            })
            .catch(err => setError(err.message));
    }
    return(
        <form className='transaction-editor-form' onSubmit={handleSubmit}>
            {error && <ErrorNotification message={error}></ErrorNotification>}
            <div className='transaction-editor-title'>
                <label>Title</label>
                <textarea value={newTitle} onChange={(event) => setNewTitle(event.target.value)}></textarea>
            </div>
            <div className='transaction-editor-amount'>
                <label>Amount</label>
                <input value={newAmount} onChange={(event) => setNewAmount(event.target.value)}></input>
            </div>
            <div className='transaction-editor-button-panel'>
                <button type="submit">Submit</button>
                <button onClick={() => setIsInEditing(false)}>Cancel</button>
            </div>  
        </form>
    )
}