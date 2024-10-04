import { createContext, ReactNode, useState } from "react";

import { api } from "@services/api";

import { UserDto } from "@dtos/UserDto";

export type AuthContextDataProps = {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContentProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContentProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto);

  const signIn = async (email: string, password: string) =>  {
    try {
      const { data } = await api.post('sessions', { email, password });

      console.log("USER ==>", data);

    } catch (error) {
      throw error;
    }
  }

  const signOut = async () => {
    console.log("TODO SIGN OUT");
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  )
}