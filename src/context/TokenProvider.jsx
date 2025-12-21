import TokenContext from "./TokenContext";
import { useState } from "react";

export default function TokenProvider({children}) {
    const [token, setToken] = useState();

    return (
    <TokenContext.Provider value={{token,setToken}}>
        {children}
    </TokenContext.Provider>)
}