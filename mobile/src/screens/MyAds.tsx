import { VStack, HStack, Text } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { CardProduct } from "@components/CardProduct";
import { FlatList } from "react-native";

import data from "@storage/mock-products";

export function MyAds() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Meus anúncios" showAddButton />

      <VStack p="$6">
        <HStack justifyContent="space-between" mb="$8">
          <Text>9 anúncios</Text>
          <Text>Select </Text>
        </HStack>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <CardProduct {...item} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </VStack>
    </VStack>
  );
}