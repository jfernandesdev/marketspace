import { HStack, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import { Plus } from "lucide-react-native";
import { getFirstName } from "@utils/firstName";

export function HeaderHome() {
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleCreateAd = () => {
    navigation.navigate("adStack", {
      screen: "adForm", 
      params: { type: "ADD" } 
    });
  }

  return (
    <HStack justifyContent="space-between">
      <HStack space="sm">
        <Avatar image={user?.avatar } textFallback={user.name} size="md" />

        <VStack space="xs">
          <Text fontSize="$md">Boas vindas,</Text>
          <Text fontFamily="$heading" fontSize="$md">{getFirstName("Jeferson Fernandes")}!</Text>
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