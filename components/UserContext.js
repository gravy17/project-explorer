import { createContext, useState, useEffect, useContext, useRef, useCallback } from "react";
import { MessageContext } from './MessageContext';

export const UserContext = createContext({
  user: {},
  setAuthContext: () => {}
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const { notify } = useContext(MessageContext);
  const controller = useRef();

  const retrieveSessionState = useCallback(async() => {
    controller.current = new AbortController();
    let validCookie = getCookie('uid');
    if(validCookie){
      try{
        let sessionAuth = await fetch(`/api/auth`, {method: 'POST', signal: controller.current.signal});
        sessionAuth = await sessionAuth.json();
        if(sessionAuth?.success){
          setUser(sessionAuth.data);
        } else if (sessionAuth?.info){
          notify( sessionAuth.info , 'info');
          clearCookie('uid');
        } else {
          console.log("Error re-entering session: " +sessionAuth.errors);
        }
        controller.current = null;
      } catch (err) {
        console.log(err);
      }
    }
  }, [notify])
  
  useEffect(() => {
    console.log("Mounting Auth Provider...")
    retrieveSessionState();
    return () => {
      controller.current?.abort();
    }
  }, [retrieveSessionState]);

  useEffect(() => {
    if(user?._id){
      setCookie('uid', user._id);
    }
  }, [user]);

  const clearCookie = (key) => {
    document.cookie=`${key}=; max-age=0; path=/; SameSite=Strict`;
  }

  const getCookie = (key) => {
    let ck = document.cookie.split(';').filter(cookie => cookie.trim().startsWith(`${key}=`));
    return ck[0]?.split('=')[1] || null;
  }

  const setCookie = (key, val, duration=(2*7*24*60*60)) => {
    document.cookie=`${key}=${val}; max-age=${duration}; path=/; SameSite=Strict`;
  }

  const setAuthContext = (authUser) => {
    if(!authUser?._id){
      clearCookie('uid');
      setUser({})
    } else {
      setUser(authUser);
    }
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