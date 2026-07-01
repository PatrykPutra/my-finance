import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {createUser} from '../services/userServices';
import Notification from './Notification';
import {useNotification} from '../context/NotificationProvider';


export default function Signup(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const notification = useNotification();

    const handleSubmit = async event => {
    event.preventDefault();
    if(!validatePassword()) return;
    try {
      await createUser({
        name,
        password
      });
      
      notification.requestNotification("success","New account created successfully.","Login");
      navigate("/login");
    }
    catch (error) {
      notification.requestNotification("error",error.message,"Signup");
    }
  }
  
function validatePassword() {
  if(password!==confirmPassword) {
    notification.requestNotification("error","Password doesn't match","Signup");
    return false;
  }
  if(password.length < 8){
    notification.requestNotification("error","Password should be longer than 7 characters.","Signup");
    return false;
  } 
  notification.cancelNotification("Signup");
  return true;
}
    return (
      <div className="signup">
        <div className="signup-container">
          <h2>Create new account</h2>
          {notification.notification.audience==="Signup" && 
            <Notification 
              type={notification.notification.type} 
              message={notification.notification.message}
            />
          }
          <form className="signup-form" onSubmit={event => handleSubmit(event)}>
            <div className="signup-form-input-panel">
              <label>Username:</label>
              <input placeholder="Enter username" onChange={(event) => setName(event.target.value)} value={name} required={true}></input>
              <label>Password:</label>
              <input placeholder="Enter password" type="password" onChange={(event) => setPassword(event.target.value)} value={password} required={true}></input>
              <label>Confirm password:</label>
              <input placeholder="Enter password" type="password" onChange={(event) => setConfirmPassword(event.target.value)} value={confirmPassword} required={true}></input>
            </div>
            <button className="signup-form-submit-button" type="submit">Submit</button>
          </form>
          <div className="login-signup">
            <p>Already have an account?</p>
            <Link to="/">Log in</Link>
          </div>
        </div>
      </div>
    )
}