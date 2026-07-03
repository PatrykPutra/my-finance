import {getUserTransactions, addUserTransaction, updateUserTransaction, deleteUserTransaction, addUser} from './storage'


export async function getTransactions(token, queryParams) {
    const response = getUserTransactions(token)
    if(!response) throw new Error("Could not fetch data from server.");
    let transactions = response;
    // filtering
    if (queryParams) {
        if (queryParams.transactionType === "income") {
            transactions = transactions.filter(t => t.amount > 0);
        }
        if (queryParams.transactionType === "expenses") {
            transactions = transactions.filter(t => t.amount < 0);
        }
        if (queryParams.title) {
            transactions = transactions.filter(t => t.title.includes(queryParams.title));
        }
    }
    return transactions;
}

export async function addTransaction(token,newTransaction) {
    const transaction = {...newTransaction, userId: token}
    const response = addUserTransaction(transaction)
    if(!response) throw new Error("Could not add transaction.");
    return response;
}

export async function updateTransaction(token,newTransaction) {
    const transaction = {...newTransaction, userId: token}
    const response = updateUserTransaction(transaction)
    if(!response) throw new Error("Could not update transaction.");

    return response;
}

export async function deleteTransaction(token, id) {
    deleteUserTransaction(token,id);
}