import {useState, useContext} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import { SearchQueryProvider } from './context/SearchQueryProvider.jsx'
import TokenContext from './context/TokenContext.js'
import Header from './components/Header.jsx'
import FilterBar from './components/FilterBar.jsx'
import TransactionsList from './components/TransactionsList.jsx'
import Login from './components/Login.jsx'
import './App.css'


function App() {
//user creation form
  const {token, setToken} = useContext(TokenContext);
  const [transactions, setTransactions] = useState([]);
  const [transactionsError, setTransactionsError] = useState(null);
 
if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className='containter'>
        <header>
          <Header setToken={setToken} />
        </header>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <SearchQueryProvider>
          <FilterBar token={token.token} setTransactions={setTransactions} setTransactionsError={setTransactionsError} />
          <TransactionsList token={token.token} transactions={transactions} setTransactions={setTransactions} transactionsError={transactionsError} setTransactionsError={setTransactionsError} />
        </SearchQueryProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
