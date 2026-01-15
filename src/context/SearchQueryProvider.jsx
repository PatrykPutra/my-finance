
import { createContext, useContext, useState} from "react";

const SearchQueryContext = createContext();

export const SearchQueryProvider = ({ children }) => {

    const [query, setQuery] = useState({filter:"all", searchPhrase:""});
    
    return (
        <SearchQueryContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchQueryContext.Provider>
    )
}


export const useSearchQuery= () => {
    return useContext(SearchQueryContext);
}