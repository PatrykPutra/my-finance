import '../App.css'
import {useState, useContext} from 'react'
import { updateTransaction, getTransactions } from '../services/transactionService';
import { useSearchQuery } from '../context/SearchQueryProvider';
import Notification from './Notification';
import { useAuthentication } from '../context/AuthenticationProvider';
import { useNotification } from '../context/NotificationProvider';
import { isValidCharacter, isControlCharacter, isValidFormat} from '../assets/utilities/moneyFormatValidatior.js';

export default function TransactionEditor({ transaction, setTransactions, setIsInEditing}) {

    const [newTitle, setNewTitle] = useState(transaction.title);
    const [newAmount, setNewAmount] = useState(transaction.amount.toString());
    const searchQuery = useSearchQuery();
    const authentication = useAuthentication();
    const notification = useNotification();

    const handleSubmit = (event) => {
        event.preventDefault();

        updateTransaction(authentication.token, { id: transaction.id, title: newTitle, amount: newAmount })
            .then(() => {
                getTransactions(authentication.token, { title: searchQuery.query.searchPhrase, transactionType: searchQuery.query.filter })
                    .then((data) => {
                        setTransactions(data);
                        setIsInEditing(false);
                        notification.cancelNotification("TransactionsList")
                    })
                    .catch(error => notification.requestNotification("error", error.message, "TransactionsList"))
                notification.cancelNotification(`TransactionEditor-${transaction.id}`);
            })
            .catch(error => notification.requestNotification("error",error.message,`TransactionEditor-${transaction.id}`));
    }

    const handleCancel = () => {
        notification.cancelNotification(`TransactionEditor-${transaction.id}`);
        setIsInEditing(false);
    }

    const handleAmountChange = (event) => {
            if(isControlCharacter(event.key)){
                if(event.key==="Backspace") setNewAmount(newAmount.slice(0,newAmount.length-1));
            }
            if(!isValidCharacter(event.key)) return;
            if(!isValidFormat(newAmount+event.key)) return;
          
            setNewAmount(newAmount+event.key);
        }

    return(
        <form className='transaction-editor-form' onSubmit={handleSubmit}>
            {notification.notification.audience===`TransactionEditor-${transaction.id}` && 
                <Notification
                    type={notification.notification.type} 
                    message={notification.notification.message}
                />
            }
            <div className='transaction-editor-title'>
                <label>Title</label>
                <textarea value={newTitle} onChange={(event) => setNewTitle(event.target.value)}></textarea>
            </div>
            <div className='transaction-editor-amount'>
                <label>Amount</label>
                <input 
                    value={newAmount} 
                    onChange={() => setNewAmount(newAmount)}
                    onKeyUp={(event) => handleAmountChange(event) }>
                </input>
            </div>
            <div className='transaction-editor-button-panel'>
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>  
        </form>
    )
}