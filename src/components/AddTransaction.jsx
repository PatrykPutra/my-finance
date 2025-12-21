import '../App.css'
import {useState} from 'react'
import {addTransaction} from '../services/transactionService.js'
import ErrorNotification from './ErrorNotification.jsx';

export default function AddTransaction({token,transactions, setTransactions}) {

    const [enableAdding, setEnableAdding] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);

    const clearForm =() => {
        setTitle("");
        setAmount("");
    };
    const handleCancel = () => {
        setEnableAdding(false);
        clearForm();
        setError(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            addTransaction(token,{title:title, amount:amount})
                .then(data => setTransactions([data, ...transactions]))
                .catch(error => setError(error.message));
            clearForm();
            setError(null);
        }
        catch (error) {
            setError(error.message)
        }
        
    }
    return(
        <div className='add-transaction'>
            {error && <ErrorNotification message={error}></ErrorNotification>}
            {!enableAdding && <button onClick={() => setEnableAdding(true)}>+</button>}
            {
                enableAdding && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title'>Title</label>
                        <textarea id='title' name='title' value={title} required={true} onChange={(event)=> setTitle(event.target.value)}></textarea>
                        <label htmlFor='amount'>Amount</label>
                        <input id='amount' name='amount' type='text' inputMode='numeric' value={amount} required={true} onChange={(event)=> setAmount(event.target.value)}></input>
                        <div className='add-transaction-button-panel'>
                            <button type="submit">Submit</button>
                            <button onClick={() => handleCancel()}>Cancel</button>   
                        </div>      
                    </form>
                )
            }
        </div>
    )
}