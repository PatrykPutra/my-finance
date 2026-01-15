import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();

function AuthenticationProvider({children}) {

    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem("token") || ""); 
    const navigate = useNavigate();

    const loginAction = async (credentials) => {
        const response = await fetch(`${API_URL}/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (data.token) {
            //setUser
            setToken(data.token);
            sessionStorage.setItem("token", data.token);
            navigate("/");
            return;
        }
        throw new Error(data.error);

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