import React from 'react';
import { ScanBarcode, ScanQrCode, CircleDollarSign, CreditCard, Landmark } from 'lucide-react-native'; 
import { HStack, Icon, Text } from '@gluestack-ui/themed';

export type PaymentMethod = 'boleto' | 'pix' | 'dinheiro' | 'cartaoCredito' | 'depositoBancario';

const PaymentIcons = {
  boleto: ScanBarcode,
  pix: ScanQrCode,
  dinheiro: CircleDollarSign,
  cartaoCredito: CreditCard,
  depositoBancario: Landmark,
};

const PaymentLabels = {
  boleto: "Boleto",
  pix: "PIX",
  dinheiro: "Dinheiro",
  cartaoCredito: "Cartão de Crédito",
  depositoBancario: "Depósito Bancário",
};

interface PaymentMethodsListProps {
  paymentMethods: PaymentMethod[];
}

const PaymentMethodsList = ({ paymentMethods }: PaymentMethodsListProps) => {
  return (
    <>
      {paymentMethods.map((method) => (
        <HStack key={method} mt="$0" space="md">
          <Icon as={PaymentIcons[method]} />
          <Text fontFamily="$body" color="$gray600" fontSize="$sm">
            {PaymentLabels[method]}
          </Text>
        </HStack>
      ))}
    </>
  );
};

export default PaymentMethodsList;
