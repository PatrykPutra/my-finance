import { useState } from 'react';

async function loginUser(credentials) {
  const API_URL = "https://localhost:7113/api";
  const response = await fetch(`${API_URL}/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if(!response.ok) throw new Error(data.message);
  
  return data;
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState({isFailed: false, errorMessage: ""})

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const token = await loginUser({
        username,
        password
      });
      setToken(token);
      setLoginError({
        isFailed: false,
        errorMessage: ""
      })
    }
    catch (error) {
      setLoginError({
        isFailed: true,
        errorMessage: "login failed"
      })
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {loginError.isFailed && <h4>{loginError.errorMessage}</h4>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={event => setUserName(event.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={event => setPassword(event.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

