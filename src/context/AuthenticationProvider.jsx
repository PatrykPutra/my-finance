import { useState, useContext, createContext } from "react";
import { getUserByName } from "../services/storage";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();

function AuthenticationProvider({children}) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem("token") || ""); 
    const navigate = useNavigate();

    const loginAction = async (credentials) => {
        const user = getUserByName(credentials.username);
        if(!user) throw new Error("Invalid credentials");
        if(user.password !== credentials.password) throw new Error("Invalid credentials");

        setToken(user.id);
        sessionStorage.setItem("token", user.id);
        navigate("/");
    };

    const logoutAction = () => {
        //setUser(null);
        setToken("");
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return(
        <AuthenticationContext.Provider value={{ token, loginAction, logoutAction }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider;

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};