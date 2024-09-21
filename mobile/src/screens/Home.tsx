import { ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { HeaderHome } from "@components/HeaderHome";
import { MyAdsCard } from "@components/MyAdsCard";

export function Home() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="$gray200" py="$16" px="$6">
        <HeaderHome />

        <VStack space="md" mt="$8">
          <Text fontFamily="$body" fontSize="$sm" color="$gray500">Seus produtos anunciados para venda</Text>
          <MyAdsCard />

          <Text fontFamily="$body" fontSize="$sm" color="$gray500">Compre produtos variados</Text>

    
        </VStack>
      </VStack>
    </ScrollView>
  )
}