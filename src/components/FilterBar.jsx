import '../App.css'
import {useContext} from 'react'
import {getTransactions} from '../services/transactionService';
import { useSearchQuery } from '../context/SearchQueryProvider';
import { useAuthentication } from '../context/AuthenticationProvider';
import { useNotification } from '../context/NotificationProvider';

export default function FilterBar({ setTransactions}){
    const searchQuery = useSearchQuery();
    const authenticate = useAuthentication();
    const notification = useNotification();
    const token = authenticate.token;
    const buttons = [
        { label: "All", value: "all" },
        { label: "Income", value: "income" },
        { label: "Expenses", value: "expenses" },
    ];
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
            <input className="filter-bar-search" type="search" onChange={(event) => searchQuery.setQuery({...searchQuery.query, searchPhrase:event.target.value})}></input>
            <button onClick={handleSearch}>Search</button>
        </div>
            
            <div className="filter-bar-buttons-panel">
                {buttons.map(({ label, value }) => (
                    <button
                        key={value}
                        className={`filter-bar-button ${searchQuery.query.filter === value ? "filter-bar-selected-button" : ""
                            }`}
                        onClick={() => handleFilterChange(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}