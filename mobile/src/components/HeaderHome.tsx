import { HStack, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import { Plus } from "lucide-react-native";

export function HeaderHome() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleCreateAd = () => {
    navigation.navigate("adForm", { type: "ADD"});
  }

  return (
    <HStack justifyContent="space-between">
      <HStack space="sm">
        <Avatar image="https://github.com/jfernandesdev.png" textFallback="Jeferson" size="md" />

        <VStack space="xs">
          <Text fontSize="$md">Boas vindas,</Text>
          <Text fontFamily="$heading" fontSize="$md">Jeferson!</Text>
        </VStack>
      </HStack>

      <Button 
        title="Criar anúncio" 
        btnIcon={Plus}
        bgVariant="dark"
        onPress={handleCreateAd} 
        w={139} 
      />
    </HStack>
  );
}