import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Avatar } from "@components/Avatar";


type CardProductProps = {
  id: string;
  thumbnail: string;
  condition: "NOVO" | "USADO";
  title: string;
  price: number;
  ative?: boolean;
  showAvatar?: boolean;
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

export function CardProduct({ thumbnail, condition, title, price, ative, showAvatar = false }: CardProductProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleSeeDetailsAd = () => {
    navigation.navigate("adStack", {
      screen: "adDetails"
    });
  };

  const formattedPrice = price
    ? price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      signDisplay: 'never',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : "0,00";

  const getConditionColor = () => (condition === "NOVO" ? "$brand500" : "$black");
  const getTextColor = () => (ative ? "$gray600" : "$gray400");

  return (
    <TouchableOpacity onPress={handleSeeDetailsAd}>
      <Box position="relative" mb="$1" w={165}>

        <HStack
          position="absolute"
          zIndex={1}
          w="$full"
          p="$1"
          justifyContent="space-between"
          alignItems="flex-start"
          
        >
          {showAvatar ? (
            <Avatar
              image="https://github.com/jfernandesdev.png"
              size="xs"
              borderWidth={1}
              borderColor="$white"
              opacity={ative ? 1 : 0.45}
            />
          ): <Box />}
          <Box
            bg={getConditionColor()}
            rounded="$2xl"
            px="$2"
            py="$1"
            opacity={ative ? 1 : 0.45}
          >
            <Text color="$white" fontSize="$2xs">{condition}</Text>
          </Box>
        </HStack>
        <Image
          source={thumbnail}
          alt="Thumbnail Produto"
          h={100}
          w="$full"
          rounded="$md"
          objectFit="cover"
          
        />
        {!ative && <DisabledOverlay />}
      </Box>
      <VStack>
        <Text
          fontFamily="$body"
          fontSize="$sm"
          color={getTextColor()}
          numberOfLines={1}
          maxWidth="$40"
        >
          {title}
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
            {formattedPrice}
          </Text>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
