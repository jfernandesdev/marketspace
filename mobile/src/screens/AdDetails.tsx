import { useState } from "react";
import { TouchableOpacity, Linking } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { HStack, VStack, Text, Badge, BadgeText, Heading, ScrollView, Box, Icon, useToast } from "@gluestack-ui/themed";
import { ArrowLeft, Power, Tag, Trash } from "lucide-react-native";

import { api } from '@services/api';

import { AdStackRoutes, AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { PreviewHeader } from "@components/PreviewHeader";
import { ImageSlider } from "@components/ImageSlider";
import { Avatar } from "@components/Avatar";
import { Label } from "@components/Label";
import PaymentMethodsList from "@components/PaymentMethodsList";
import { ToastMessage } from "@components/ToastMessage";

import { formatPrice } from "@utils/formatPrice";

import WhatsappIcon from "@assets/whatsapp-logo.svg";
import { useAuth } from "@hooks/useAuth";


export function AdDetails() {
  const route = useRoute<RouteProp<AdStackRoutes, 'adDetails'>>();
  const { adData, isEditFlow } = route.params;

  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLongText, setIsLongText] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const { user } = useAuth();

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

  const handleGoBackEdit = () => {
    navigation.navigate("adForm", { type: "ADD" });
  }

  const uploadImages = async (productId: string) => {
    const formData = new FormData();
    formData.append('product_id', productId);

    for (const image of adData.product_images) {
      const file = {
        uri: image.uri,
        name: image.name,
        type: image.type,
      };

      formData.append('images', file as any);
    }

    try {
      await api.post(`/products/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
    } catch (error) {
      console.error("Erro ao fazer upload das imagens:", error);
      throw error;
    }
  };

  const publishAd = async () => {
    try {
      setIsSubmitting(true);
      const response = await api.post('/products', {
        name: adData.name,
        description: adData.description,
        is_new: adData.is_new,
        price: adData.price,
        accept_trade: adData.accept_trade,
        payment_methods: adData.payment_methods.map(method => method.key),
      });

      const productId = response.data.id;

      if (productId) {
        await uploadImages(productId);
      }

      navigation.navigate("myAds");

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Anúncio publicado com sucesso!"
            align="center"
          />
        )
      });
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao publicar o anúncio."
            align="center"
          />
        )
      });
      console.error("Erro ao publicar o anúncio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSeller = () => {
    if (!adData.user || !adData.user.tel) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Número de telefone não disponível."
            align="center"
          />
        ),
      });
      return;
    }

    const message = `Olá ${adData.user.name}, vi seu anúncio "${adData.name} - R$ ${formatPrice(adData.price)}" no Marketspace. Ainda está disponível?`;
    const whatsappUrl = `https://wa.me/${adData.user.tel}?text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl).catch((error) => {
      console.error("Erro ao abrir o WhatsApp:", error);
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao tentar abrir o WhatsApp."
            align="center"
          />
        ),
      });
    });
  };

  return (
    <VStack flex={1} justifyContent="space-between" pb="$6">
      {isEditFlow ? <PreviewHeader /> : <ScreenHeader showBackButton showEditButton={user.id === adData.user_id} />}

      <VStack flex={1}>
        <ImageSlider images={adData.product_images} />

        <ScrollView px="$8">
          <HStack alignItems="center" space="sm" py="$3">
            <Avatar
              image={`${api.defaults.baseURL}/images/${adData.user?.avatar || user.avatar}`}
              textFallback={adData.user?.name || user.name}
              size="sm"
            />
            <Text>{adData.user?.name || user.name}</Text>
          </HStack>

          <Badge size="sm" bg="$gray300" rounded="$full" w={50} justifyContent="center">
            <BadgeText color="$gray600" fontSize="$2xs">{adData.is_new ? "NOVO" : "USADO"}</BadgeText>
          </Badge >

          <HStack alignItems="center" justifyContent="space-between" mt="$1" mb="$2">
            <Heading fontFamily="$heading" fontSize="$xl" color="$gray700">{adData.name}</Heading>
            <Text fontFamily="$heading" fontSize="$xl" color="$brand400">
              <Text fontFamily="$heading" fontSize="$sm" color="$brand400">R$ </Text>
              {formatPrice(adData.price)}
            </Text>
          </HStack>

          <Box mb="$1">
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
                <Text color="$brand500" fontSize="$sm">
                  {expandedDescription ? 'Mostrar menos' : 'Mostrar mais'}
                </Text>
              </TouchableOpacity>
            )}
          </Box>

          <HStack py="$1" space="md">
            <Label text="Aceita troca?" />
            <Text fontFamily="$body" color="$gray600" fontSize="$sm">
              {adData.accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>

          <VStack mt="$1">
            <Label text="Meios de pagamento:" />
            <PaymentMethodsList paymentMethods={adData.payment_methods} />
          </VStack>

        </ScrollView>
      </VStack>

      <VStack px="$8" mt="$2">
        {user.id === adData.user_id ? (
          <>
            <Button
              title="Desativar anúncio"
              bgVariant="dark"
              btnIcon={Power}
            />
            <Button
              title="Excluir anúncio"
              bgVariant="secondary"
              btnIcon={Trash}
              mt="$2"
            />
          </>
        ) : (
          <Button
            title="Entrar em contato"
            bgVariant="primary"
            btnIcon={WhatsappIcon}
            onPress={handleContactSeller}
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
              disabled={isSubmitting}
            />
            <Button
              w="48%"
              title="Publicar"
              bgVariant="primary"
              btnIcon={Tag}
              onPress={publishAd}
              isLoading={isSubmitting}
            />
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}