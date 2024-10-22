import { useState, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { VStack, HStack, Text } from "@gluestack-ui/themed";

import { api } from "@services/api";

import { ProductDto } from "@dtos/ProductDto";

import { ScreenHeader } from "@components/ScreenHeader";
import { CardProduct } from "@components/CardProduct";
import { Select } from "@components/Select";

type ProductStatus = 'todos' | 'ativo' | 'inativo';

export function MyAds() {
  const [myProducts, setMyProducts] = useState<ProductDto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);

  const [filterStatus, setFilterStatus] = useState<ProductStatus>('todos');
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users/products');
      const products = response.data || [];

      setMyProducts(products);
      filterProducts(products, filterStatus);
    } catch (error) {
      console.error("Erro ao buscar meus anúncios", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = (products: ProductDto[], status: ProductStatus) => {
    const filtered = status === 'todos'
      ? products
      : products.filter(product => product.is_active === (status === 'ativo'));

    setFilteredProducts(filtered);
  };

  const formatProductCountText = (count: number) => {
    return `${count} anúncio${count > 1 ? 's' : ''}`;
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  useEffect(() => {
    filterProducts(myProducts, filterStatus);
  }, [filterStatus, myProducts]); 

  return (
    <VStack flex={1} >
      <ScreenHeader title="Meus anúncios" />

      <HStack justifyContent="space-between" alignItems="center" mb="$6" zIndex={1} py="$2" px="$6">
        <Text>{formatProductCountText(filteredProducts.length)}</Text>

        <Select
          options={[
            { label: "Todos", value: "todos" },
            { label: "Ativos", value: "ativo" },
            { label: "Inativos", value: "inativo" }
          ]}
          initialValue="todos"
          onValueChange={(value) => {
            const status = value as ProductStatus;
            setFilterStatus(status);
            filterProducts(myProducts, status);
          }}
        />
      </HStack>
     
      <VStack px="$6">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredProducts}
          renderItem={({ item }) => (
            <CardProduct product={item} />
          )}
          keyExtractor={(item, index) => item.id ? item.id : `${item.name}-${index}`}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </VStack>
    </VStack>
  )
}