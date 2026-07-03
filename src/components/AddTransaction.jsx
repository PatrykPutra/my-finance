import '../App.css'
import {useState} from 'react'
import {addTransaction} from '../services/transactionService.js'
import Notification from './Notification.jsx';
import { useAuthentication } from '../context/AuthenticationProvider.jsx';
import { useNotification } from '../context/NotificationProvider.jsx';
import { isValidCharacter, isControlCharacter, isValidFormat} from '../assets/utilities/moneyFormatValidatior.js';
import {Button} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'

export default function AddTransaction({transactions, setTransactions}) {

    const [enableAdding, setEnableAdding] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const authentication = useAuthentication();
    const notification = useNotification();

    const clearForm =() => {
        setTitle("");
        setAmount("");
    };

    const handleCancel = () => {
        setEnableAdding(false);
        clearForm();
        notification.cancelNotification("AddTransaction");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            addTransaction(authentication.token,{title:title, amount:amount})
                .then(data => setTransactions([data, ...transactions]))
                .catch(error => notification.requestNotification("error",error.message,"AddTransaction"));
            clearForm();
            notification.cancelNotification("AddTransaction");
        }
        catch (error) {
            notification.requestNotification("error",error.message,"AddTransaction")
        } 
    }

    const handleAmountChange = (event) => {
        if(isControlCharacter(event.key)){
            if(event.key==="Backspace") setAmount(amount.slice(0,amount.length-1));
        }
        if(!isValidCharacter(event.key)) return;
        if(!isValidFormat(amount+event.key)) return;
      
        setAmount(amount+event.key);
    }

    return(
        <div className='add-transaction'>
            {notification.notification.audience==="AddTransaction" &&
                <Notification
                type={notification.notification.type}
                message={notification.notification.message}
                />
            }
            {!enableAdding && <Button icon={<PlusCircleOutlined />} block onClick={() => setEnableAdding(true)}></Button>}
            {
                enableAdding && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title'>Title</label>
                        <textarea id='title' name='title' value={title} required={true} onChange={(event)=> setTitle(event.target.value)}></textarea>
                        <label htmlFor='amount'>Amount</label>
                        <input 
                            id='amount' 
                            name='amount' 
                            type='text' 
                            inputMode='decimal' 
                            value={amount} 
                            required={true} 
                            onKeyUp={(event)=>handleAmountChange(event)}
                            onChange={()=>setAmount(amount)}>
                        </input>
                        <div className='add-transaction-button-panel'>
                            <Button htmlType="submit">Submit</Button>
                            <Button onClick={() => handleCancel()}>Cancel</Button>   
                        </div>      
                    </form>
                )
            }
        </div>
    )
}