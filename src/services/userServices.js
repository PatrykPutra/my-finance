import {addUser, modifyUser, removeUser, getUserById} from './storage'

export async function createUser(newUser) {
  addUser(newUser);
}

export async function updateUser(token, newPassword, oldPassword) {
  const user = getUserById(token);
  if(!user) throw new Error("Could not find user."); 
  if(user.password !== oldPassword) throw new Error("Authentication failed."); 
  modifyUser({id: token, token: token, password: newPassword});
}

export async function deleteUser(token,password){
    const user = getUserById(token);
  if(!user) throw new Error("Could not find user."); 
  if(user.password !== oldPassword) throw new Error("Authentication failed."); 
  removeUser(token);

}