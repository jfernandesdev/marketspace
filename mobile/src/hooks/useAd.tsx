import { useContext } from "react";

import { AdContext } from "@contexts/AdContext";

export function useAd() {
  const context = useContext(AdContext);

  return context;
}