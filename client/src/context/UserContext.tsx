import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  token: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading?: boolean;
}

export const UserContext = createContext<AuthContextType | undefined>(undefined);


export const UserProvider = ({children}: any) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setisloading] = useState<boolean>(false);

    useEffect(() =>{
      setisloading(true)
     const storedUser = localStorage.getItem('auth_user')
        if(storedUser){
         try {
           setUser(JSON.parse(storedUser))
         } catch (error: unknown) {
          console.log('Failed to parse stored user data', error);
          localStorage.removeItem(storedUser)
         }
        }
        setisloading(false);
    }, []);

    const login = (userData: User) => {
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
    }

    const logout = () => {
      setUser(null);
      localStorage.removeItem('auth_user');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('userLastName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRoleId');
    }

  return  <UserContext.Provider value={{user, login, logout, isLoading}}>{children}</UserContext.Provider>
}

export const userAuth = (): AuthContextType => {
    const context = useContext(UserContext);
    if(!context){
      throw new Error('useAuth must be used within an AuthProvider');
    }

    return context
}
