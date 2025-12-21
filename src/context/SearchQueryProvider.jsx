import SearchQueryContext from './SearchQueryContext'
import { useState } from 'react'

export const SearchQueryProvider = ({ children }) => {

    const [query, setQuery] = useState({filter:"all", searchPhrase:""});
    
    return (
        <SearchQueryContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchQueryContext.Provider>
    )
}