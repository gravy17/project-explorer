import { createContext, useState, useLayoutEffect, useEffect, useRef } from "react";

export const ThemeContext = createContext({
  dark: false,
  toggle: () => {}
});

export default function ThemeProvider({ children }) {
  const prefersDark = useRef();
  useEffect(() => {
    prefersDark.current = localStorage.getItem('prefersDark');
    if(!prefersDark.current) {
      prefersDark.current = matchMedia("(prefers-color-scheme: dark)").matches;  
    }
  }, [])
  
  const [dark, setDark] = useState(prefersDark.current || false);
  if(typeof window !== "undefined"){
  useLayoutEffect(() => {
    applyTheme();
    localStorage.setItem('prefersDark', dark);
  });
  }

  const applyTheme = () => {
    const root = document.getElementsByTagName("body")[0];
    
    if (dark) {
      root.classList.remove(lightTheme);
      root.classList.add(darkTheme);
    }
    if (!dark) {
      root.classList.remove(darkTheme);
      root.classList.add(lightTheme);
    }
  };

  const toggle = () => {
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const lightTheme = 'light-theme';
const darkTheme = 'dark-theme';