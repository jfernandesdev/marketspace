import { FlatList } from "react-native";
import { VStack, HStack, Text } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { CardProduct } from "@components/CardProduct";
import { Select } from "@components/Select";

import data from "@storage/mock-products";

export function MyAds() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Meus anúncios" showAddButton />

      <VStack py="$2" px="$6">
        <HStack justifyContent="space-between" alignItems="center" mb="$6" zIndex={1}>
          <Text>9 anúncios</Text>
         
          <Select
            options={[
              { label: "Todos", value: "todos" },
              { label: "Ativos", value: "ativo" },
              { label: "Inativos", value: "inativo" }
            ]}
            initialValue="todos"
            onValueChange={(value) => console.log('Valor selecionado:', value)}
          />
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