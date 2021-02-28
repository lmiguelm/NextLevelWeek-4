import { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

interface UserData {
  githubId: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
  token: string;
  user: UserData;
}

interface AuthContextData {
  logout(): void;
  user: UserData;
  token: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children, ...rest }: AuthProviderProps) {

  const [token, setToken] = useState(rest.token ?? null);
  const [user, setUser] = useState<UserData>(rest.user ?? {} as UserData);
  
  useEffect(() => {
    if(token && user) {
      Cookies.set('token', token.toString());
      Cookies.set('user', JSON.stringify(user));
    }
  }, [token, user]);
  
  function logout() {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('currentExperience');
    Cookies.remove('challengesCompleted');
    Cookies.remove('level');
    Cookies.remove('totalExperience');
    setToken(null);
    setUser({} as UserData);
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        user,
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