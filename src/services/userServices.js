const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function createUser(newUser) {
  const response = await fetch(`${API_URL}/User`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  });
  
  if(!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  } 
}

export async function updateUser(token, newPassword, oldPassword) {
    const url = `${API_URL}/User`;
        const json = JSON.stringify({password:oldPassword, newPassword:newPassword});
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: json
        });

    if (!response.ok) {
        const error = await response.json();
      throw new Error(error.error);  
    } 
}

export async function deleteUser(token,password){
    const url = `${API_URL}/User`;
        const json = JSON.stringify({password:password});
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: json
        });

    if (!response.ok) {
        const error = await response.json();
      throw new Error(error.error);  
    } 
}