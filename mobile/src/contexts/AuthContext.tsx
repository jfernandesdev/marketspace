import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "@services/api";

import { storageAuthTokenSave, storageAuthTokenGet } from "@storage/storageAuthToken";
import { storageUserSave, storageUserGet } from "@storage/storageUser";

import { UserDto } from "@dtos/UserDto";

export type AuthContextDataProps = {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContentProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContentProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const signIn = async(email: string, password: string) =>  {
    try {
      setIsLoadingUserStorageData(true);
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token && data.refresh_token) { 
        await storageUserSave(data.user);
        await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token }); 
        
        updateUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signOut = async () => {
    console.log("TODO SIGN OUT");
  };

  const updateUserAndToken = (userData: UserDto, token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();
      
      if(userLogged && token) {
        updateUserAndToken(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLoadingUserStorageData
    }}>
      { children }
    </AuthContext.Provider>
  )
}