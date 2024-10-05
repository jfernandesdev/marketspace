import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { HStack, VStack, Text, Badge, BadgeText, Heading, ScrollView, Box, Icon } from "@gluestack-ui/themed";
import { ArrowLeft, Power, Tag, Trash } from "lucide-react-native";

import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { PreviewHeader } from "@components/PreviewHeader";
import { ImageSlider } from "@components/ImageSlider";
import { Avatar } from "@components/Avatar";
import { Label } from "@components/Label";
import PaymentMethodsList, { PaymentMethod } from "@components/PaymentMethodsList";

import WhatsappIcon from "@assets/whatsapp-logo.svg";

import { formatPrice } from "@utils/formatPrice";

export function AdDetails() {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isLongText, setIsLongText] = useState(false);

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

  return (
    <VStack flex={1} justifyContent="space-between" pb="$6">
      {/* <ScreenHeader showBackButton showEditButton /> */}
      <PreviewHeader />

      <VStack flex={1}>
        <ImageSlider images={
          [
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
            "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717",
            "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3"
          ]
        }/>

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
            <BadgeText color="$gray600" fontSize="$2xs">USADO</BadgeText>
          </Badge >

          <HStack alignItems="center"justifyContent="space-between" mt="$1" mb="$2">
            <Heading fontFamily="$heading" fontSize="$xl" color="$gray700">Tênis Masculino</Heading>
            <Text fontFamily="$heading" fontSize="$xl" color="$brand400">
              <Text fontFamily="$heading" fontSize="$sm" color="$brand400">R$ </Text>
              {formatPrice(120)}
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, sequi tempora beatae dignissimos veniam sapiente in. 
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
            <Text fontFamily="$body" color="$gray600" fontSize="$sm">Sim</Text>
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
        {/* <Button
          title="Entrar em contato"
          bgVariant="primary" 
          btnIcon={WhatsappIcon}
        /> */}

        {/* Opção fluxo cadastro ad */}
        <HStack space="md">
          <Button 
            title="Voltar e editar" 
            bgVariant="secondary"
            btnIcon={ArrowLeft} 
            w="48%"
          />
          <Button 
            title="Publicar" 
            bgVariant="primary" 
            btnIcon={Tag}
            w="48%"
          />
        </HStack>
      </VStack>
    </VStack>
  );
}