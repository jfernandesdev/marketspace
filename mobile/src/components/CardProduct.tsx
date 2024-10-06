import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Avatar } from "@components/Avatar";

import { formatPrice } from "@utils/formatPrice";
import { api } from "@services/api";

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
      screen: "adDetails",
      params: {
        adData: {
          id: "12345",
          user_id: "12345",
          accept_trade: false,
          description: "Tênis esportivo tamanho 34",
          images: [
            {
              name: "2993cd7f-b1ad-42c5-a458-b1d244394e9b.jpeg",
              type: "image/jpeg",
              uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmarketspace-400b9d22-655d-4894-8d3e-dfae9f95f482/ImagePicker/2993cd7f-b1ad-42c5-a458-b1d244394e9b.jpeg",
            },
          ],
          is_new: true,
          name: "Tênis esportivo",
          payment_methods: ["boleto"],
          price: 100,
          is_active: true
        }
      }
    });
  };

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
              image={`${api.defaults.baseURL}/images/a2fa96a67ec315d1d31b-1663158098820.jpg`}
              textFallback="Jeferson Fernandes"
              size="xs"
              borderWidth={1}
              borderColor="$white"
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
            {formatPrice(price)}
          </Text>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
