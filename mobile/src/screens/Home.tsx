import { HStack, Icon, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HeaderHome } from "@components/HeaderHome";
import { QuantityAdsWrapper } from "@components/QuantityAdsWrapper";
import { Input } from "@components/Input";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="$gray200" py="$16" px="$6">
        <HeaderHome />

        <VStack space="md" mt="$8">
          <Text fontFamily="$body" fontSize="$sm" color="$gray500">Seus produtos anunciados para venda</Text>
          <QuantityAdsWrapper />

          <Text fontFamily="$body" fontSize="$sm" color="$gray500">Compre produtos variados</Text>

          <Input 
            placeholder="Buscar anúncio"
            returnKeyType="search"
            showIconSearch
            showIconFilter
          />

        </VStack>
      </VStack>
    </ScrollView>
  )
}