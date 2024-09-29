import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Label } from "@components/Label";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { ImagePickerCard } from "@components/ImagePickerCard";
import { PaymentMethodsCheckbox } from "@components/PaymentMethodsCheckbox";

import {
  VStack,
  HStack,
  Text,
  ScrollView,
  Switch,
  RadioGroup,
  Box,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";

export function AdForm() {
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string>("novo");

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();

  const { type } = route.params as { type: "ADD" | "EDIT" };

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleNext = () => {
    navigation.navigate("adStack", {
      screen: "adDetails"
    });
  }

  const handleConditionChange = (newValue: string) => {
    setSelectedCondition(newValue);
    console.log("Condição:", newValue);
  };

  return (
    <VStack flex={1} justifyContent="space-between" pb="$4">
      <ScreenHeader title={type === "EDIT" ? "Editar anúncio" : "Criar anúncio"} showBackButton />

      <ScrollView flex={1} px="$8" mb="$4">
        {/* Imagens */}
        <Box mb="$4">
          <Label text="Imagens" fontSize="$md" />
          <Text fontFamily="$body" fontSize="$sm" color="$gray500" pb="$2">
            Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
          </Text>
          <ImagePickerCard />
        </Box>

        {/* Sobre o produto */}
        <Box mb="$4">
          <Label text="Sobre o produto" fontSize="$md" />
          <Input placeholder="Título do anúncio" />
          <Textarea bg="$gray100" borderWidth="$0" mt={-5}>
            <TextareaInput
              placeholder="Descrição do produto"
              color="$gray700"
              fontFamily="$body"
              placeholderTextColor="$gray400"
              fontSize="$md"
            />
          </Textarea>

          <RadioGroup value={selectedCondition} onChange={handleConditionChange}>
            <HStack space="4xl" alignItems="center" pt="$2">
              <Radio label="Produto novo" value="novo" aria-label="Novo" />
              <Radio label="Produto usado" value="usado" aria-label="Usado" />
            </HStack>
          </RadioGroup>
        </Box>

        {/* Venda */}
        <Box mt="$2">
          <Label text="Venda" fontSize="$md" />
          <Box>
            <Text position="absolute" zIndex={1} left="$4" top="$3" color="$gray700">R$</Text>
            <Input placeholder="Valor do produto" pl="$12" keyboardType="decimal-pad" />
          </Box>

          {/* Aceita troca? */}
          <HStack space="xs" alignItems="center" mt={-10}>
            <Label text="Aceita troca?" fontSize="$sm" onPress={() => { setAcceptTrade(!acceptTrade) }} />
            <Switch value={acceptTrade} onValueChange={setAcceptTrade}/>
          </HStack>
        </Box>

        {/* Meios de pagamento */}
        <Box mb="$4">
          <Label text="Meios de pagamento aceitos" fontSize="$md" />
          <PaymentMethodsCheckbox />
        </Box>
      </ScrollView>

      <HStack space="md" px="$8">
        <Button
          title="Cancelar"
          w="48%"
          bgVariant="secondary"
          onPress={handleCancel}
        />
        <Button
          title="Avançar"
          w="48%"
          bgVariant="dark"
          onPress={handleNext}
        />
      </HStack>
    </VStack>
  );
}