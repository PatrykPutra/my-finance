import FilterBar from "./FilterBar"
import TransactionsList from "./TransactionsList"
import { SearchQueryProvider } from '../context/SearchQueryProvider.jsx'

export default function TransactionsPanel({transactions, setTransactions}){

    return(
        <SearchQueryProvider>
            <div className="transaction-panel">
                <FilterBar setTransactions={setTransactions} />
                <TransactionsList transactions={transactions} setTransactions={setTransactions} />
            </div> 
        </SearchQueryProvider>
    )
}