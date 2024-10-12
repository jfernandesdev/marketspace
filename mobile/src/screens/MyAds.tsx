import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { VStack, HStack, Text } from "@gluestack-ui/themed";

import { api } from "@services/api";

import { ProductDto } from "@dtos/ProductDto";

import { ScreenHeader } from "@components/ScreenHeader";
import { CardProduct } from "@components/CardProduct";
import { Select } from "@components/Select";
import { Loading } from "@components/Loading";

export function MyAds() {
  const [myProducts, setMyProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/users/products');

        if (response && response.data.length > 0) {
          setMyProducts(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar meus anúncios", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Meus anúncios" showAddButton />

      {isLoading ? <Loading /> : (
        <VStack py="$2" px="$6">
          <HStack justifyContent="space-between" alignItems="center" mb="$6" zIndex={1}>
            <Text>{myProducts.length} anúncios</Text>

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
            data={myProducts}
            renderItem={({ item }) => (
              <CardProduct product={item} />
            )}
            keyExtractor={(item, index) => item.id ? item.id : `${item.name}-${index}`}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        </VStack>
      )}
    </VStack>
  )
}