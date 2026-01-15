import { createContext, useContext, useState} from "react";

const NotificationContext = createContext();

function NotificationProvider({children}) {
    const [notification, setNotification] = useState({type:"",message:"",audience:""});
    
    const requestNotification = (type, message, audience) => {
        setNotification({type:type, message:message, audience:audience})
    }

    const cancelNotification =(audience) => {
        if(notification.audience === audience) {
            setNotification({type:"", message:"",audience:""})
        }
    }

    return(
        <NotificationContext.Provider value={{notification, requestNotification, cancelNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}
export default NotificationProvider;

export const useNotification = () =>{
    return useContext(NotificationContext);
};