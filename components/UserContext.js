import { createContext, useState, useEffect, useContext } from "react";
import { MessageContext } from './MessageContext';

export const UserContext = createContext({
  user: {},
  setAuthContext: () => {}
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const { notify } = useContext(MessageContext);

  useEffect(() => {
    retrieveSessionState();
  });

  const retrieveSessionState = async() => {
    if(getCookie('uid')){
      let sessionAuth = await fetch(`/api/auth`, {method: 'POST'});
      sessionAuth = await sessionAuth.json();
      if(sessionAuth.success){
        setUser(sessionAuth.data);
      } else if (sessionAuth.info){
        notify( sessionAuth.info , 'info');
      } else {
        console.log("Error re-entering session: " +sessionAuth.errors);
      }
    }
  }

  useEffect(() => {
    if(user.id){
      setCookie('uid', user._id);
    } else {
      clearCookie('uid');
    }
    
  }, [user]);

  const clearCookie = (key) => {
    document.cookie = `${key}=; max-age=0; path=/; SameSite=Strict`;
  }

  const getCookie = (key) => {
    let ck = document.cookie.split(';').filter(cookie => cookie.trim().startsWith(`${key}=`));
    return ck[0]?.split('=')[1] || null;
  }

  const setCookie = (key, val, duration=(2*7*24*60*60)) => {
    document.cookie = `${key}=${val}; max-age=${duration}; path=/; SameSite=Strict`;
  }

  const setAuthContext = (authUser) => {
    setUser(authUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setAuthContext
      }}
    >
      {children}
    </UserContext.Provider>
  );
}