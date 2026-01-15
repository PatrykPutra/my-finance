import {useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route} from "react-router-dom"
import TransactionsPanel from './components/TransactionsPanel.jsx'
import Header from './components/Header.jsx'
import Settings from './components/Settings.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import AuthenticationProvider from './context/AuthenticationProvider.jsx'
import NotificationProvider from './context/NotificationProvider.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import './App.css'

//styling
function App() {

  const [transactions, setTransactions] = useState([]);
  return (
    <div className='containter'>
      <AuthenticationProvider>
        <NotificationProvider>
          <header>
            <Header />
          </header>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route
                  path="/"
                  element={
                    <TransactionsPanel
                      transactions={transactions}
                      setTransactions={setTransactions}
                    />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </ErrorBoundary>
        </NotificationProvider>
      </AuthenticationProvider>
    </div>
  )
}

export default App
