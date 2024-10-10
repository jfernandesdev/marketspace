import { useState } from "react";
import { CheckboxGroup } from "@gluestack-ui/themed";

import { Checkbox } from "@components/Checkbox";
import { EnumPaymentMethod } from "./PaymentMethodsList";

interface PaymentMethodsCheckboxProps {
  onSelect: (selectedMethods: EnumPaymentMethod[]) => void;
}

export function PaymentMethodsCheckbox({ onSelect }: PaymentMethodsCheckboxProps) {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<EnumPaymentMethod[]>([]);
  
  const handlePaymentMethodsChange = (newValues: EnumPaymentMethod[]) => {
    setSelectedPaymentMethods(newValues);
    onSelect(newValues);
  };

  return (
    <CheckboxGroup 
      value={selectedPaymentMethods} 
      onChange={handlePaymentMethodsChange} 
      mt="$2" 
      w="50%"
    >
      <Checkbox label="Boleto" value="boleto" aria-label="Boleto" />
      <Checkbox label="Pix" value="pix" aria-label="PIX" />
      <Checkbox label="Dinheiro" value="cash" aria-label="Dinheiro" />
      <Checkbox label="Cartão de Crédito" value="card" aria-label="Cartão de Crédito" />
      <Checkbox label="Depósito Bancário" value="deposit" aria-label="Depósito Bancário" />
    </CheckboxGroup>
  );
}