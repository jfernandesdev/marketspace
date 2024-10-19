import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Text, VStack } from "@gluestack-ui/themed";

import { api } from "@services/api";

import { ProductDto } from "@dtos/ProductDto";

import { HeaderHome } from "@components/HeaderHome";
import { QuantityAdsWrapper } from "@components/QuantityAdsWrapper";
import { Input } from "@components/Input";
import { CardProduct } from "@components/CardProduct";
import { Loading } from "@components/Loading";

export function Home() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [activeProductsCount, setActiveProductsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Função para buscar os produtos
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params: any = {
        query: searchQuery, // Termo de busca
      };

      const response = await api.get('/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para buscar a quantidade de anúncios ativos do usuário logado
  const fetchActiveProductsCount = async () => {
    try {
      const response = await api.get('users/products/active/count');
      setActiveProductsCount(response.data.activeProductsCount);
    } catch (error) {
      console.error("Erro ao buscar a quantidade de produtos ativos", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchProducts();
      fetchActiveProductsCount();
    }, [searchQuery])
  );

  return (
    <VStack flex={1} bg="$gray200" pt="$16" px="$6">
      <HeaderHome />

      <VStack space="md" mt="$8">
        <Text fontFamily="$body" fontSize="$sm" color="$gray500">Seus produtos anunciados para troca/venda</Text>
        <QuantityAdsWrapper activeCount={activeProductsCount} />

        <Text fontFamily="$body" fontSize="$sm" color="$gray500">Compre produtos variados</Text>

        <Input 
          placeholder="Buscar anúncio"
          returnKeyType="search"
          showIconSearch
          showIconFilter
          onSearch={setSearchQuery}
        />
      </VStack>

      {isLoading ? <Loading /> : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => (
            <CardProduct product={{ ...item, is_active: true }} />
          )}
          keyExtractor={(item, index) => item.id ? item.id : `${item.name}-${index}`}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16, marginTop: 8 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}
    </VStack>
  )
}