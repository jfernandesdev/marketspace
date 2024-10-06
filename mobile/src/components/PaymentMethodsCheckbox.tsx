import { useState } from "react";
import { CheckboxGroup } from "@gluestack-ui/themed";

import { Checkbox } from "@components/Checkbox";

interface PaymentMethodsCheckboxProps {
  onSelect: (selectedMethods: string[]) => void;
}

export function PaymentMethodsCheckbox({ onSelect }: PaymentMethodsCheckboxProps) {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  
  const handlePaymentMethodsChange = (newValues: string[]) => {
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
      <Checkbox label="Dinheiro" value="dinheiro" aria-label="Dinheiro" />
      <Checkbox label="Cartão de Crédito" value="cartaoCredito" aria-label="Cartão de Crédito" />
      <Checkbox label="Depósito Bancário" value="depositoBancario" aria-label="Depósito Bancário" />
    </CheckboxGroup>
  );
}