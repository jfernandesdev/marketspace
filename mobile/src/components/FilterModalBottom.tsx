import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Label } from "@components/Label";
import { PaymentMethodsCheckbox } from "@components/PaymentMethodsCheckbox";

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
import { PaymentMethodsDto } from "@dtos/PaymentMethods";

export interface IFilterProps {
  conditions: string[],
  acceptTrade: boolean,
  paymentMethods: PaymentMethodsDto[],
}

type FilterActionsheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: IFilterProps) => void;
  filters?: IFilterProps;
};

export function FilterModalBottom({ isOpen, onClose, onApplyFilters, filters }: FilterActionsheetProps) {
  const [selectedCondition, setSelectedCondition] = useState<string[]>(filters?.conditions || []);
  const [acceptTrade, setAcceptTrade] = useState(filters?.acceptTrade || false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsDto[]>(filters?.paymentMethods || []);

  const handleConditionChange = (newValues: string[]) => {
    setSelectedCondition(newValues);
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        conditions: selectedCondition,
        acceptTrade,
        paymentMethods
      });
    }
    onClose(); 
  };

  const handleResetFilters = () => {
    setSelectedCondition([]); 
    setAcceptTrade(false);
    setPaymentMethods([]); 
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
              <Heading fontFamily="$heading" color="$gray700" fontSize="$xl" mb="$2">Filtrar anúncios</Heading>
              <TouchableOpacity onPress={onClose}>
                <Icon as={X} color="$gray400" size="xl" />
              </TouchableOpacity>
            </HStack>

            <VStack justifyContent="flex-start">
              <Label text="Condição" />
              <CheckboxGroup value={selectedCondition} onChange={handleConditionChange} mt="$2">
                <HStack space="lg" alignItems="center">
                  <Checkbox 
                    label="Novo" 
                    value="new" 
                    aria-label="Novo" 
                    type="custom"
                    isChecked={selectedCondition.includes("new")}
                  />
                  <Checkbox 
                    label="Usado" 
                    value="used" 
                    aria-label="Usado" 
                    type="custom"
                    isChecked={selectedCondition.includes("used")}
                  />
                </HStack>
              </CheckboxGroup> 

              <HStack space="xs" alignItems="center" my="$3">
                <Label text="Aceita troca?" onPress={() => { setAcceptTrade(!acceptTrade) }} />
                <Switch value={acceptTrade} onValueChange={setAcceptTrade} />
              </HStack>

              <Label text="Meios de pagamento aceitos" />
              <PaymentMethodsCheckbox 
                onSelect={setPaymentMethods} 
                selectedMethods={paymentMethods}
              />
            </VStack>
            
            <HStack space="md" pt="$10">
              <Button
                title="Resetar filtros"
                w="48%"
                bgVariant="secondary"
                onPress={handleResetFilters}
              />
              <Button
                title="Aplicar filtros"
                w="48%"
                bgVariant="dark"
                onPress={handleApplyFilters}
              />
            </HStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </KeyboardAvoidingView>
  );
}
