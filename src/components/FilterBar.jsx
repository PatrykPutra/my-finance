import '../App.css'
import {useContext} from 'react'
import {getTransactions} from '../services/transactionService';
import { useSearchQuery } from '../context/SearchQueryProvider';
import { useAuthentication } from '../context/AuthenticationProvider';
import { useNotification } from '../context/NotificationProvider';
import { Input, Space, Segmented } from 'antd';

const { Search } = Input;

export default function FilterBar({ setTransactions}){
    const searchQuery = useSearchQuery();
    const authenticate = useAuthentication();
    const notification = useNotification();
    const token = authenticate.token;

    const processQuery = (title, transactionType) => {

        getTransactions(token, { title: title, transactionType: transactionType })
            .then((data) => setTransactions(data))
            .catch(error => notification.requestNotification("error", error.message, "TransactionsList"));
        notification.cancelNotification("TransactionsList"); 
    }
    const handleFilterChange = (value) => {
        if(value!==searchQuery.query.filter){
            searchQuery.setQuery({...searchQuery.query,filter:value});
            processQuery(searchQuery.query.searchPhrase, value);
        } 
    }

    const handleSearch = () => {
        processQuery(searchQuery.query.searchPhrase,searchQuery.query.filter);
    }

    return(
        <div className="filter-bar">
        <div className="filter-bar-search-panel">
            <Search 
                onChange={(event) => searchQuery.setQuery({...searchQuery.query, searchPhrase:event.target.value})} 
                onSearch={handleSearch} 
                enterButton="Search" 
                size="large"
            />
        </div>
            <div className="filter-bar-buttons-panel">
                <Segmented
                    options={['All', 'Income', 'Expenses']}
                    size='large'
                    onChange={value => handleFilterChange(value)
                    }
                />
            </div>
        </div>
    )
}