import { useEffect, useState } from "react";
import { CheckboxGroup } from "@gluestack-ui/themed";

import { Checkbox } from "@components/Checkbox";

import { PaymentMethodsDto } from "@dtos/PaymentMethods";

interface PaymentMethodsCheckboxProps {
  onSelect: (selectedMethods: PaymentMethodsDto[]) => void;
  selectedMethods?: PaymentMethodsDto[];
}

const paymentMethods: PaymentMethodsDto[] = [
  { key: 'boleto', name: 'Boleto' },
  { key: 'pix', name: 'Pix' },
  { key: 'cash', name: 'Dinheiro' },
  { key: 'card', name: 'Cartão de Crédito' },
  { key: 'deposit', name: 'Depósito Bancário' },
];

export function PaymentMethodsCheckbox({ onSelect, selectedMethods = [] }: PaymentMethodsCheckboxProps) {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<PaymentMethodsDto[]>(selectedMethods || []);
  
  const handlePaymentMethodsChange = (newValues: string[]) => {
    const selectedMethods = paymentMethods.filter(method => newValues.includes(method.key));
    setSelectedPaymentMethods(selectedMethods);
    onSelect(selectedMethods);
  };

  useEffect(() => {
    if (JSON.stringify(selectedPaymentMethods) !== JSON.stringify(selectedMethods)) { 
      setSelectedPaymentMethods(selectedMethods || []);
    }
  }, [selectedMethods]);

  return (
    <CheckboxGroup 
      value={selectedPaymentMethods.map(method => method.key)} 
      onChange={handlePaymentMethodsChange} 
      mt="$2" 
      w="50%"
    >
      {paymentMethods.map(method => (
        <Checkbox
          key={method.key}
          label={method.name}
          value={method.key}
          aria-label={method.name}
        />
      ))}
    </CheckboxGroup>
  );
}