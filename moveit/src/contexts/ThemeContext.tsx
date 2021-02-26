import { createContext, useContext, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextData {
  isDark: boolean;
  changeTheme(): void;
}

const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {

  const [isDark, setIsDark] = useState(true);

  function changeTheme() {
    setIsDark(!isDark);
    
    const body = document.querySelector('body');
    
    if(isDark) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');  
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        changeTheme
      }}
    > 
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext);
}