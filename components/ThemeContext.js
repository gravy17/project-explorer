import { createContext, useState, useLayoutEffect, useCallback, useRef } from "react";

export const ThemeContext = createContext({
  dark: null,
  toggle: () => {}
});

export default function ThemeProvider({ children }) {
  const prefersDark = useRef('false');

  // eslint-disable-next-line
  useLayoutEffect(() => {
    console.log("Mounting ThemeProvider");
    if(!localStorage || !localStorage.getItem('prefersDark')) {
      prefersDark.current = matchMedia("(prefers-color-scheme: dark)").matches;  
    } else {
      prefersDark.current = localStorage.getItem('prefersDark');
    }
    setDark(prefersDark.current==='true');
  }, [])
  
  const [dark, setDark] = useState(prefersDark.current==='true');
  const applyTheme = useCallback(() => {
    const root = document.getElementsByTagName("body")[0];
    
    if (dark) {
      root.classList.remove(lightTheme);
      root.classList.add(darkTheme);
    }
    if (!dark) {
      root.classList.remove(darkTheme);
      root.classList.add(lightTheme);
    }
  }, [dark]);

  // eslint-disable-next-line
  useLayoutEffect(() => {
    applyTheme();
    localStorage.setItem('prefersDark', dark);
  }, [dark, applyTheme]);
  
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