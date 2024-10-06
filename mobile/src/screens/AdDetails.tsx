import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { HStack, VStack, Text, Badge, BadgeText, Heading, ScrollView, Box, Icon } from "@gluestack-ui/themed";
import { ArrowLeft, Power, Tag, Trash } from "lucide-react-native";

import { AdStackRoutes, AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { PreviewHeader } from "@components/PreviewHeader";
import { ImageSlider } from "@components/ImageSlider";
import { Avatar } from "@components/Avatar";
import { Label } from "@components/Label";
import PaymentMethodsList, { PaymentMethod } from "@components/PaymentMethodsList";

import { formatPrice } from "@utils/formatPrice";

import WhatsappIcon from "@assets/whatsapp-logo.svg";

export function AdDetails() {
  const route = useRoute<RouteProp<AdStackRoutes, 'adDetails'>>();
  const { adData, isEditFlow } = route.params; 

  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isLongText, setIsLongText] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toggleExpandDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length > 3) {
      setIsLongText(true); 
    } else {
      setIsLongText(false);
    }
  };

  const paymentMethods: PaymentMethod[] = ["boleto", "pix", "dinheiro", "cartaoCredito", "depositoBancario"];

  const handleGoBackEdit = () => {
    navigation.goBack();
  }

  return (
    <VStack flex={1} justifyContent="space-between" pb="$6">
      {isEditFlow ? <PreviewHeader /> : <ScreenHeader showBackButton showEditButton /> }

      <VStack flex={1}>
        <ImageSlider images={adData.images.map(image => image.uri)} />

        <ScrollView px="$8">
          <HStack alignItems="center" space="sm" py="$3">
            <Avatar 
              image="https://github.com/jfernandesdev.png" 
              textFallback="Jeferson Fernandes"
              size="sm"
            />
            <Text>Jeferson Fernandes</Text>
          </HStack>

          <Badge size="sm" bg="$gray300" rounded="$full" w={50} justifyContent="center">
            <BadgeText color="$gray600" fontSize="$2xs">{adData.is_new ? "NOVO" : "USADO"}</BadgeText>
          </Badge >

          <HStack alignItems="center"justifyContent="space-between" mt="$1" mb="$2">
            <Heading fontFamily="$heading" fontSize="$xl" color="$gray700">{adData.name}</Heading>
            <Text fontFamily="$heading" fontSize="$xl" color="$brand400">
              <Text fontFamily="$heading" fontSize="$sm" color="$brand400">R$ </Text>
              {formatPrice(adData.price)}
            </Text>
          </HStack>

          <Box mb="$2">
            <Text 
              numberOfLines={expandedDescription ? 0 : 3} 
              onTextLayout={handleTextLayout}
              fontFamily="$body" 
              fontSize="$sm"
              color="$gray600"
            >
              {adData.description}
            </Text>

            {isLongText && (
              <TouchableOpacity onPress={toggleExpandDescription}>
                <Text mt="$1" color="$brand500" fontSize="$sm" ml="auto">
                  {expandedDescription ? 'Mostrar menos' : 'Mostrar mais'}
                </Text>
              </TouchableOpacity>
            )}
          </Box>

          <HStack py="$2" space="md">
            <Label text="Aceita troca?" />
            <Text fontFamily="$body" color="$gray600" fontSize="$sm">
              {adData.accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>

          <VStack mt="$2">
            <Label text="Meios de pagamento:" />
            <PaymentMethodsList paymentMethods={paymentMethods} />
          </VStack>

        </ScrollView>
      </VStack>

      <VStack px="$8" mt="$2">
        {/* Opções meus anuncios */}
        {/* <Button 
          title="Desativar anúncio" 
          bgVariant="dark"
          btnIcon={Power} 
        />
        <Button 
          title="Excluir anúncio" 
          bgVariant="secondary" 
          btnIcon={Trash}
        /> */}

        {/* Opção anuncio terceiro */}
        {!isEditFlow && (
        <Button
          title="Entrar em contato"
          bgVariant="primary" 
          btnIcon={WhatsappIcon}
        />
        )}

        {/* Fluxo cadastro/edição ad */}
        {isEditFlow && (
          <HStack space="md">
            <Button 
              title="Voltar e editar" 
              bgVariant="secondary"
              btnIcon={ArrowLeft} 
              w="48%"
              onPress={handleGoBackEdit}
            />
            <Button 
              title="Publicar" 
              bgVariant="primary" 
              btnIcon={Tag}
              w="48%"
            />
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}