const API_URL = "https://localhost:7113/api";

export async function getTransactions(token, queryParams) {
    
    const url = queryParams ? `${API_URL}/Transaction?${new URLSearchParams({...queryParams})}`: `${API_URL}/Transaction`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    });
    
    if(!response.ok) throw new Error("Could not fetch data from server.");

    const data = await response.json();
    return data;
}

export async function addTransaction(token,newTransaction) {
    const url = `${API_URL}/Transaction`;
    const json = JSON.stringify(newTransaction);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: json
    });
 
    if(!response.ok) throw new Error("Operation failed.");

    const data = await response.json();
    return data;
}

export async function updateTransaction(token,newTransaction) {
    const url = `${API_URL}/Transaction/${newTransaction.id}`;
    const json = JSON.stringify(newTransaction);
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: json
    });

    if (!response.ok) throw new Error("Operation failed.");

    const data = await response.json();
    return data;

}

export async function deleteTransaction(token, id) {
    const url = `${API_URL}/Transaction/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) throw new Error("Operation failed.");

}