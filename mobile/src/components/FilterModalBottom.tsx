import React, { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";

import { X } from "lucide-react-native";

import {
  Icon,
  Text,
  HStack,
  VStack,
  Heading,
  Switch,
  Actionsheet,
  CheckboxGroup,
  ActionsheetContent,
  ActionsheetBackdrop,
  KeyboardAvoidingView,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper
} from "@gluestack-ui/themed";

type FilterActionsheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FilterModalBottom({ isOpen, onClose }: FilterActionsheetProps) {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string[]>(["novo"]);
  const [acceptTrade, setAcceptTrade] = useState(false);

  const handleConditionChange = (newValues: string[]) => {
    setSelectedCondition(newValues);
    console.log("Condições:", newValues);
  };

  const handleAcceptTradeChange = (value: boolean) => {
    setAcceptTrade(value);
    console.log("Aceita troca?:", value);
  };

  const handlePaymentMethodsChange = (newValues: string[]) => {
    setSelectedPaymentMethods(newValues);
    console.log("Meios de pagamento:", newValues);
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
              <Text fontFamily="$heading" fontSize="$sm" color="$gray600" mt="$4" mb="$2">Condição</Text>
              <CheckboxGroup value={selectedCondition} onChange={handleConditionChange}>
                <HStack space="lg" alignItems="center">
                  <Checkbox 
                    label="Novo" 
                    value="novo" 
                    aria-label="Novo" 
                    type="custom"
                    isChecked={selectedCondition.includes("novo")}
                  />
                  <Checkbox 
                    label="Usado" 
                    value="usado" 
                    aria-label="Usado" 
                    type="custom"
                    isChecked={selectedCondition.includes("usado")}
                  />
                </HStack>
              </CheckboxGroup>

              <HStack space="xs" alignItems="center" my="$3">
                <Text fontFamily="$heading" fontSize="$sm" color="$gray600" onPress={() => { setAcceptTrade(!acceptTrade) }}>Aceita troca?</Text>
                <Switch value={acceptTrade} onValueChange={handleAcceptTradeChange} />
              </HStack>

              <Text fontFamily="$heading" fontSize="$sm" color="$gray600" py="$2">Meios de pagamento aceitos</Text>
              <CheckboxGroup value={selectedPaymentMethods} onChange={handlePaymentMethodsChange}>
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
