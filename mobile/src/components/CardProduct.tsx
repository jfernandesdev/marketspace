import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";

import { Avatar } from "@components/Avatar";

import { ProductDto } from "@dtos/ProductDto";

import { formatPrice } from "@utils/formatPrice";
import { useAd } from "@hooks/useAd";

type CardProductProps = {
  product: ProductDto;
};

const DisabledOverlay = () => (
  <>
    <Box
      position="absolute"
      top="$0"
      left="$0"
      right="$0"
      bottom="$0"
      bg="$gray700"
      opacity={0.45}
      zIndex={0}
      rounded="$md"
    />
    <Box
      position="absolute"
      top="$0"
      left="$0"
      right="$0"
      bottom="$0"
      justifyContent="flex-end"
      alignItems="center"
      zIndex={1}
      rounded="$md"
    >
      <Text color="$white" fontSize="$xs" mb="$2">ANÚNCIO DESATIVADO</Text>
    </Box>
  </>
);

export function CardProduct({ product }: CardProductProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { saveEditedAdData } = useAd();

  const handleSeeDetailsAd = async (productId: string) => {
    try {
      const response = await api.get(`/products/${productId}`);
      const productData = response.data as ProductDto;
      saveEditedAdData(productData);
      navigation.navigate("adStack", { screen: "adDetails", params: { previewAd: false}});
    } catch (error) {
      console.error("Erro ao buscar os detalhes do produto no card:", error);
    }
  };

  const getConditionColor = () => (product.is_new ? "$brand500" : "$black");
  const getTextColor = () => (product.is_active ? "$gray600" : "$gray400");

  const userAvatar = product.user?.avatar
    ? `${api.defaults.baseURL}/images/${product.user.avatar}`
    : null;

  const productImage = product.product_images?.[0]?.path
    ? `${api.defaults.baseURL}/images/${product.product_images[0].path}`
    : null;

  return (
    <TouchableOpacity onPress={() => product && product.id && handleSeeDetailsAd(product.id)}>
      <Box position="relative" mb="$1" w={165}>

        <HStack
          position="absolute"
          zIndex={1}
          w="$full"
          p="$1"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {userAvatar ? (
            <Avatar
              image={userAvatar}
              size="xs"
              borderWidth={1}
              borderColor="$white"
            />
          ) : <Box />}
          <Box
            bg={getConditionColor()}
            rounded="$2xl"
            px="$2"
            py="$1"
            opacity={product.is_active ? 1 : 0.45}
          >
            <Text color="$white" fontSize="$2xs">
              {product.is_new ? "NOVO" : "USADO"}
            </Text>
          </Box>
        </HStack>
        
        {productImage ? (
          <Image
            source={{ uri: productImage }}
            alt="Thumbnail Produto"
            h={100}
            w="$full"
            rounded="$md"
            objectFit="cover"
          />
        ) : (
          <Box h={100} w="$full" bg="$brand100" rounded="$md" />
        )}

        {!product.is_active && <DisabledOverlay />}
      </Box>
      <VStack>
        <Text
          fontFamily="$body"
          fontSize="$sm"
          color={getTextColor()}
          numberOfLines={1}
          maxWidth="$40"
        >
          {product.name}
        </Text>
        <HStack space="xs" alignItems="flex-end">
          <Text
            fontFamily="$heading"
            fontSize="$xs"
            color={getTextColor()}
          >
            R$
          </Text>
          <Text
            fontFamily="$heading"
            fontSize="$md"
            color={getTextColor()}
          >
            {formatPrice(product.price)}
          </Text>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
