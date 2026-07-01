import { useState } from 'react';
import {Link} from "react-router-dom"
import Notification from './Notification';
import { useAuthentication } from '../context/AuthenticationProvider';
import { useNotification } from '../context/NotificationProvider';

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const authentication = useAuthentication();
  const notification = useNotification();

  const handleSubmit = async event => {
    event.preventDefault();

    try{
      await authentication.loginAction({username:username,password:password})
      notification.cancelNotification("Login")
    }
    catch(error)
    {
      notification.requestNotification("error",error.message,"Login")
    } 
  }

  return(
    <div className="login">
      <div className="login-container">
        <h2>Login to the application</h2>
        {notification.notification.audience === "Login" &&
          <Notification
            type={notification.notification.type}
            message={notification.notification.message}
          />
        }
        <form className="login-form" onSubmit={event=>handleSubmit(event)}>
          <label>
            <p>Username:</p>
            <input type="text" onChange={event => setUserName(event.target.value)} />
          </label>
          <label>
            <p>Password:</p>
            <input type="password" onChange={event => setPassword(event.target.value)} />
          </label>
          <button className='login-button' type="submit">Submit</button>
        </form>
        
        <div className="login-signup">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

