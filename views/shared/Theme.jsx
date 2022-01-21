import React, { useState, useLayoutEffect, useEffect } from "react";

export const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {}
});

export default function ThemeProvider({ children }) {
  let prefersDark
  useEffect(() => {
    prefersDark =  window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [])
  
  const [dark, setDark] = useState(prefersDark || false);
  useLayoutEffect(() => {
    applyTheme();
  }, [dark]);

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