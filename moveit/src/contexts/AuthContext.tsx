import { createContext, useContext, useState } from 'react';

import Cookies from 'js-cookie';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  logout(): void;
  isLogged: boolean;
  user: UserData;
  saveUserLogged(user: UserData, token: string);
  token: string;
}

interface UserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState<UserData>({} as UserData);
  

  function saveUserLogged(user: UserData, token: string) {
    Cookies.set('token', token);
    Cookies.set('user', JSON.stringify(user));

    setUser(user);
    setToken(token);
    setIsLogged(true);
  }

  function logout() {
    Cookies.remove('user');
    Cookies.remove('token');
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        isLogged,
        user,
        saveUserLogged,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}