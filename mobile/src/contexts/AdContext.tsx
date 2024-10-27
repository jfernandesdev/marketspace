import { createContext, ReactNode, useState } from "react";

import { ProductDto } from "@dtos/ProductDto";

export type AdContextDataProps = {
  editedAdData: ProductDto | null;
  saveEditedAdData: (adData: ProductDto) => void;
  clearAdData: () => void;
}

type AdContentProviderProps = {
  children: ReactNode;
}

export const AdContext = createContext<AdContextDataProps>({} as AdContextDataProps);

export function AdContextProvider({ children }: AdContentProviderProps) {
  const [editedAdData, setEditedAdData] = useState<ProductDto | null>({} as ProductDto);
  
  const saveEditedAdData = (adData: any) => {
    setEditedAdData(adData);
 }

  const clearAdData = () => {
    setEditedAdData(null);
  }

  return (
    <AdContext.Provider value={{
      editedAdData,
      saveEditedAdData,
      clearAdData
    }}>
      { children }
    </AdContext.Provider>
  )
}