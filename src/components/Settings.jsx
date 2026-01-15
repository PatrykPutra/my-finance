import { useState,useEffect } from "react"
import { useAuthentication } from '../context/AuthenticationProvider.jsx';
import { useNotification } from "../context/NotificationProvider.jsx";
import { updateUser, deleteUser } from "../services/userServices.js";
import Notification from "./Notification.jsx";

export default function Settings(){
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password,setPassword] = useState("");
    const authentication = useAuthentication();
    const notification = useNotification();

    useEffect(()=>{
        notification.cancelNotification("Settings")
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateInput()) {
            notification.requestNotification("error","New password confirmation doesn't match.","Settings")
            return
        }
        try {
            await updateUser(authentication.token, newPassword, oldPassword)
            notification.requestNotification("success","Password changed sucessfully","Settings")
        }
        catch(error){
            notification.requestNotification("error",error.message,"Settings")
        }
    }

const validateInput = () => {
    return newPassword === confirmNewPassword;
}

const handleDelete = async (event) => {
    event.preventDefault();
    try {
        await deleteUser(authentication.token, password);
        notification.requestNotification("success","Account has been deleted.","Login");
        authentication.logoutAction();
    }
    catch(error){
        notification.requestNotification("error",error.message,"Settings")
    }
}

return(
    <div className="settings">
        {notification.notification.audience==="Settings" &&
            <Notification
                type={notification.notification.type}
                message={notification.notification.message}
            />    
        }
        <div className="settings-update">
        <h3>Change your password</h3>
        <form className="settings-update-form" onSubmit={event => handleSubmit(event)}>

            <label>New password:</label>
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
            />
            <label>Confirm new password:</label>
            <input
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
            <label>Old password:</label>
            <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        </div>
        <div className="settings-delete">
            <h3>Delete account</h3>
            <form className="settings-delete-form" onSubmit={(event) => handleDelete(event)}>

                <label>Current password:</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Delete</button>

            </form>
        </div>
    </div>
)
}