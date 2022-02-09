import { createContext, useEffect, useRef, useReducer } from "react";

export const UserContext = createContext();

function userReducer (state, action){
  switch (action.type){
    case 'set':
      return action.payload;
    case 'clear':
      return {};
    default:
      return state;
  }
}

export default function AuthProvider({ children, notify }) {
  
  const setCookie = (key, val, duration=(2*7*24*60*60)) => {
    document.cookie=`${key}=${val}; max-age=${duration}; path=/; SameSite=Strict`;
  }

  const getCookie = (key) => {
    if(typeof window !== 'undefined'){
      let ck = document.cookie.split(';').filter(cookie => cookie.trim().startsWith(`${key}=`));
      return ck[0]?.split('=')[1] || null;
    } else {
      return null;
    }
  }

  const clearCookie = (key) => {
    document.cookie=`${key}=; max-age=0; path=/; SameSite=Strict`;
  }

  const [user, updateUser] = useReducer(userReducer, {}, () => JSON.parse(getCookie('user')) || {})

  useEffect(() => {
    console.log(user)
    if(!user?._id){
      clearCookie('user');
    } else {
      setCookie('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}