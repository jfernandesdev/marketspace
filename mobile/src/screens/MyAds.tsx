import { TouchableOpacity } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ScreenHeader } from "@components/ScreenHeader";

export function MyAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleSeeDetailsAd = () => {
    navigation.navigate("adDetails");
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Meus anúncios" showAddButton />
    
      <TouchableOpacity onPress={handleSeeDetailsAd}>
        <Text>Anuncio card</Text>
      </TouchableOpacity>
    </VStack>
  );
}