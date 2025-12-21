import '../App.css'
import {useContext} from 'react'
import {getTransactions} from '../services/transactionService';
import SearchQueryContext from '../context/SearchQueryContext';

export default function FilterBar({token, setTransactions,setTransactionsError}){
    const {query, setQuery} = useContext(SearchQueryContext);

    const buttons = [
        { label: "All", value: "all" },
        { label: "Income", value: "income" },
        { label: "Expenses", value: "expenses" },
    ];
    const processQuery = (title, transactionType) => {

        getTransactions(token, { title: title, transactionType: transactionType })
            .then((data) => setTransactions(data))
            .catch(error => setTransactionsError(error.message));

    }
    const handleFilterChange = (value) => {
        if(value!==query.filter){
            setQuery({...query,filter:value});
            processQuery(query.searchPhrase, value);
        } 
    }

    const handleSearch = () => {
        processQuery(query.searchPhrase,query.filter);
    }

    return(
        <div className="filter-bar">
        <div className="filter-bar-search-panel">
            <input className="filter-bar-search" type="search" onChange={(event) => setQuery({...query, searchPhrase:event.target.value})}></input>
            <button onClick={handleSearch}>Search</button>
        </div>
            
            <div className="filter-bar-buttons-panel">
                {buttons.map(({ label, value }) => (
                    <button
                        key={value}
                        className={`filter-bar-button ${query.filter === value ? "filter-bar-selected-button" : ""
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