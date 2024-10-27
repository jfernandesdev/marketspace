import { TouchableOpacity } from "react-native";
import { Text, VStack, HStack, Icon } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ArrowRight, Tag } from "lucide-react-native";

interface QuantityAdsWrapperProps {
  activeCount: number;
}

export function QuantityAdsWrapper({ activeCount }: QuantityAdsWrapperProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const goToMyAds = () => {
    navigation.navigate("myAds");
  }

  return (
    <TouchableOpacity onPress={goToMyAds}>
      <HStack bg="$brand100" p="$4" justifyContent="space-between" alignItems="center" rounded="$md" mb="$6">
        <HStack space="md" alignItems="center">
          <Icon as={Tag} color="$brand500" size="xl" />
          <VStack>
            <Text fontFamily="$heading" fontSize="$xl" color="$gray600">{activeCount}</Text>
            <Text fontFamily="$body" fontSize="$xs" color="$gray600">anúncios ativos</Text>
          </VStack>
        </HStack>

        <HStack space="xs">
          <Text fontFamily="$heading" fontSize="$xs" color="$brand500">Meus anúncios</Text>
          <Icon as={ArrowRight} color="$brand500" />
        </HStack>
      </HStack>
    </TouchableOpacity>
  )
}