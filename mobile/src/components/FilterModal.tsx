import React, { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";

import { X } from "lucide-react-native";

import {
  Icon,
  Text,
  HStack,
  Heading,
  Actionsheet,
  ActionsheetItem,
  ActionsheetContent,
  ActionsheetBackdrop,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  VStack,
  KeyboardAvoidingView,
  CheckboxGroup,
} from "@gluestack-ui/themed";

type FilterActionsheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FilterModal({ isOpen, onClose }: FilterActionsheetProps) {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]); 

  const handleCheckboxChange = (newValues: string[]) => {
    setSelectedPaymentMethods(newValues);
    console.log("Meios de pagamento ==>", newValues);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent bg="$gray200">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack w="$full" px="$6" py="$6">
            <HStack justifyContent="space-between" alignItems="center" mb="$2">
              <Heading fontFamily="$heading" color="$gray700" fontSize="$xl">Filtrar anúncios</Heading>
              <TouchableOpacity onPress={onClose}>
                <Icon as={X} color="$gray400" size="xl" />
              </TouchableOpacity>
            </HStack>

            <VStack justifyContent="flex-start">
              <Text fontFamily="$heading" fontSize="$sm" color="$gray600" py="$4">Condição</Text>
              <HStack space="md">
                <Text>NOVO</Text>
                <Text>USADO</Text>
              </HStack>

              <Text fontFamily="$heading" fontSize="$sm" color="$gray600" py="$4">Aceita troca?</Text>

              <Text fontFamily="$heading" fontSize="$sm" color="$gray600" py="$4">Meios de pagamento aceitos</Text>

              <CheckboxGroup value={selectedPaymentMethods} onChange={handleCheckboxChange}>
                <Checkbox label="Boleto" value="boleto" aria-label="Boleto" />
                <Checkbox label="Pix" value="pix" aria-label="PIX" />
                <Checkbox label="Dinheiro" value="dinheiro" aria-label="Dinheiro" />
                <Checkbox label="Cartão de Crédito" value="cartao-credito" aria-label="Cartão de Crédito" />
                <Checkbox label="Depósito Bancário" value="deposito-bancario" aria-label="Depósito Bancário" />
              </CheckboxGroup>

            </VStack>

            <HStack space="md" pt="$10">
              <Button
                title="Resetar filtros"
                w="48%"
                bgVariant="secondary"
                onPress={onClose}
              />
              <Button
                title="Aplicar filtros"
                w="48%"
                bgVariant="dark"
                onPress={onClose}
              />
            </HStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </KeyboardAvoidingView>
  );
}
