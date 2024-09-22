import { Center, Text, VStack, HStack } from "@gluestack-ui/themed";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";

export function AdForm() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();

  const { type } = route.params as { type: "ADD" | "EDIT"};

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleNext = () => {
    navigation.navigate("adDetails");
  }

  return (
    <VStack flex={1} justifyContent="space-between">
      <ScreenHeader 
        title={type === "EDIT" ? "Editar anúncio" : "Criar anúncio" } 
        showBackButton 
      />

    <HStack space="md" px="$8" py="$4">
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