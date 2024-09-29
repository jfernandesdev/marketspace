import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";
import { Label } from "@components/Label";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { ScreenHeader } from "@components/ScreenHeader";
import { PaymentMethodsCheckbox } from "@components/PaymentMethodsCheckbox";

import { Plus, X } from "lucide-react-native";

import {
  VStack,
  HStack,
  Text,
  ScrollView,
  Switch,
  RadioGroup,
  Center,
  Box,
  Icon,
  Textarea,
  TextareaInput,
  Image,
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

          <HStack space="md">
            <TouchableOpacity>
              <Center bg="$gray300" h={100} w={100} rounded="$md">
                <Image 
                  source={{uri: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2" }} 
                  alt="Imagem produto"
                  h="$full"
                  w="$full"
                  rounded="$md"
                />

                <Icon 
                  as={X} 
                  color="$gray100"
                  bg="$gray600" 
                  rounded="$full"
                  size="sm" 
                  position="absolute" 
                  top="$1" 
                  right="$1" 
                />
              </Center>
            </TouchableOpacity>

            <TouchableOpacity>
              <Center bg="$gray300" h={100} w={100} rounded="$md">
                <Image 
                  source={{ uri: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717" }} 
                  alt="Imagem produto"
                  h="$full"
                  w="$full"
                  rounded="$md" 
                />

                <Icon
                  as={X}
                  color="$gray100"
                  bg="$gray600"
                  rounded="$full"
                  size="sm"
                  position="absolute"
                  top="$1"
                  right="$1"
                />
              </Center>
            </TouchableOpacity>

            <TouchableOpacity>
              <Center bg="$gray300" h={100} w={100} rounded="$md">
                <Icon as={Plus} size="xl" color="$gray400" />
              </Center>
            </TouchableOpacity>
          </HStack>
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