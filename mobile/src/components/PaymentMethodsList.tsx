import React from 'react';
import { ScanBarcode, ScanQrCode, CircleDollarSign, CreditCard, Landmark } from 'lucide-react-native'; 
import { HStack, Icon, Text } from '@gluestack-ui/themed';

import { PaymentMethodsDto } from '@dtos/PaymentMethods';

const PaymentIcons = {
  boleto: ScanBarcode,
  pix: ScanQrCode,
  cash: CircleDollarSign,
  card: CreditCard,
  deposit: Landmark,
};

interface PaymentMethodsListProps {
  paymentMethods: PaymentMethodsDto[];
}

const PaymentMethodsList = ({ paymentMethods }: PaymentMethodsListProps) => {
  return (
    <>
      {paymentMethods.map((method) => {
        const IconComponent = PaymentIcons[method.key as keyof typeof PaymentIcons];

        return (
          <HStack key={method.key} mt="$2" space="md">
            {IconComponent && <Icon as={IconComponent} />}
            <Text fontFamily="$body" color="$gray600" fontSize="$sm">
              {method.name}
            </Text>
          </HStack>
        );
      })}
    </>
  );
};

export default PaymentMethodsList;
