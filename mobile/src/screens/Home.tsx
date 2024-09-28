import { Text, VStack } from "@gluestack-ui/themed";

import { HeaderHome } from "@components/HeaderHome";
import { QuantityAdsWrapper } from "@components/QuantityAdsWrapper";
import { Input } from "@components/Input";
import { CardProduct } from "@components/CardProduct";

import data, { Product } from "@storage/mock-products";
import { FlatList } from "react-native";

export function Home() {
  return (
    <VStack flex={1} bg="$gray200" pt="$16" px="$6">
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

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <CardProduct {...item} showAvatar />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </VStack>
  )
}