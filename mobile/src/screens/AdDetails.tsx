import { useState, useEffect } from "react";
import { TouchableOpacity, Linking } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ArrowLeft, Power, Tag, Trash } from "lucide-react-native";

import { useAuth } from "@hooks/useAuth";
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

import { 
  HStack, 
  VStack, 
  Text, 
  Badge, 
  BadgeText, 
  Heading, 
  ScrollView, 
  Box, 
  Icon, 
  Modal, 
  useToast, 
  ModalBackdrop 
} from "@gluestack-ui/themed";
import { AppError } from "@utils/AppError";
import { useAd } from "@hooks/useAd";

// Detalhes do anúncio
export function AdDetails() {
  const route = useRoute<RouteProp<AdStackRoutes, 'adDetails'>>();
  const { previewAd } = route.params;

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const { user } = useAuth();
  const { editedAdData, saveEditedAdData, clearAdData } = useAd();

  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isActive, setIsActive] = useState(editedAdData?.is_active);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExcluding, setIsExcluding] = useState(false);
  const [isLongText, setIsLongText] = useState(false);

  const toggleExpandDescription = () => setExpandedDescription(!expandedDescription);

  const handleTextLayout = ({ nativeEvent: { lines } }: any) => setIsLongText(lines.length > 3);

  const handleGoBackEdit = () => {
    if (editedAdData) {
      saveEditedAdData(editedAdData);
    }
    navigation.navigate("adForm", { type: "ADD" })
  };

  const uploadImages = async (productId: string) => {
    const formData = new FormData();
    formData.append('product_id', productId);
      editedAdData && editedAdData.product_images.forEach(image => {
        formData.append('images', {
          uri: image.uri,
          name: image.name,
          type: image.type,
        } as any);
      });
  
    await api.post('/products/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  // Criar anúncio
  const publishAd = async () => {
    try {
      setIsSubmitting(true);

      const requestData = {
        name: editedAdData?.name,
        description: editedAdData?.description,
        is_new: editedAdData?.is_new,
        price: editedAdData?.price,
        accept_trade: editedAdData?.accept_trade,
        payment_methods: editedAdData && editedAdData.payment_methods && 
          editedAdData.payment_methods.map(method => method.key
        ),
      }

      const response = await api.post('/products', requestData);

      const productId = response.data.id;

      if (productId) {
        await uploadImages(productId);
      }

      clearAdData();
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
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível cria anúncio. Tente novamente.";
      
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            align="center"
          />
        )
      });
      console.error("Erro ao publicar o anúncio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirecionar para o whatsapp
  const handleContactSeller = () => {
    if (!editedAdData?.user || !editedAdData?.user.tel) {
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

    const message = `Olá ${editedAdData?.user.name}, vi seu anúncio "${editedAdData?.name} - R$ ${formatPrice(editedAdData?.price)}" no Marketspace. Ainda está disponível?`;
    const whatsappUrl = `https://wa.me/${editedAdData?.user.tel}?text=${encodeURIComponent(message)}`;

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

  // Ativar/desativar anúncio
  const toggleAdStatus = async () => {
    try {
      setIsSubmitting(true);
      const newStatus = !isActive;
      await api.patch(`/products/${editedAdData?.id}`, { is_active: newStatus });
      
      setIsActive(newStatus);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title={`Anúncio ${newStatus ? "ativado" : "desativado"} com sucesso!`}
            align="center"
          />
        )
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao atualizar o status. Tente novamente.";

      console.error("Erro ao atualizar o status do anúncio:", error);
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            align="center"
          />
        )
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Excluir anúncio
  const handleDeleteAd = async () => {
    setIsExcluding(true);
    try {
      if (editedAdData && editedAdData.id) {
        await api.delete(`/products/${editedAdData?.id}`);
        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="success"
              title="Anúncio excluído com sucesso!"
              align="center"
            />
          )
        });
  
        clearAdData();
        navigation.navigate("myAds");
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao excluir anúncio. Tente novamente.";

      console.error("Erro ao excluir o anúncio:", error);
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            align="center"
          />
        )
      });
    } finally {
      setIsExcluding(false);
      setShowDeleteModal(false);
    }
  };

  //Editar anúncio
  const handleEditPress = () => {
    if (editedAdData) {
      saveEditedAdData(editedAdData);
    }
    navigation.navigate("adStack", { screen: "adForm", params: { type: "EDIT"}});
  };

  useEffect(() => {
    setIsActive(editedAdData?.is_active);
  }, [editedAdData]);

  return (
    <VStack flex={1} justifyContent="space-between" pb="$6">
      {previewAd !== undefined && previewAd
        ? <PreviewHeader /> 
        : <ScreenHeader 
            showBackButton 
          showEditButton={user.id === editedAdData?.user_id} 
          onEditPress={handleEditPress}
          />}

      <VStack flex={1}>
        <ImageSlider images={editedAdData ? editedAdData.product_images : []} isActive={isActive} />

        <ScrollView px="$8">
          <HStack alignItems="center" space="sm" py="$3">
            <Avatar
              image={`${api.defaults.baseURL}/images/${editedAdData?.user?.avatar || user.avatar}`}
              textFallback={editedAdData?.user?.name || user.name}
              size="sm"
            />
            <Text>{editedAdData?.user?.name || user.name}</Text>
          </HStack>

          <Badge size="sm" bg="$gray300" rounded="$full" w={50} justifyContent="center">
            <BadgeText color="$gray600" fontSize="$2xs">{editedAdData?.is_new ? "NOVO" : "USADO"}</BadgeText>
          </Badge >

          <HStack alignItems="center" justifyContent="space-between" mt="$1" mb="$2">
            <Heading fontFamily="$heading" fontSize="$xl" color="$gray700">{editedAdData?.name}</Heading>
            <Text fontFamily="$heading" fontSize="$xl" color="$brand400">
              <Text fontFamily="$heading" fontSize="$sm" color="$brand400">R$ </Text>
              {editedAdData && editedAdData.price && formatPrice(editedAdData?.price) }
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
              {editedAdData?.description}
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
              {editedAdData?.accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>

          <VStack mt="$1">
            <Label text="Meios de pagamento:" />
            <PaymentMethodsList paymentMethods={editedAdData && editedAdData?.payment_methods ? editedAdData?.payment_methods : []} />
          </VStack>

        </ScrollView>
      </VStack>

      <VStack px="$8" mt="$2">
        {!previewAd && (
          user.id === editedAdData?.user_id ? (
            <>
              <Button
                title={isActive ? "Desativar anúncio" : "Reativar anúncio"}
                bgVariant={isActive ? "dark" : "primary"}
                btnIcon={Power}
                onPress={toggleAdStatus}
                isLoading={isSubmitting}
              />
              <Button
                title="Excluir anúncio"
                bgVariant="secondary"
                btnIcon={Trash}
                mt="$2"
                onPress={() => setShowDeleteModal(true)}
                disabled={isSubmitting}
              />
            </>
          ) : (
            <Button
              title="Entrar em contato"
              bgVariant="primary"
              btnIcon={WhatsappIcon}
              onPress={handleContactSeller}
            />
          )
        )}

        {/* Fluxo cadastro/edição ad */}
        {previewAd && (
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

      <Modal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
      >
        <ModalBackdrop />
        <Modal.Content p="$2">
          <Heading py="$2" textAlign="center">Confirmação</Heading>
          <Modal.Body px="$0" mb="$3">
            <Text textAlign="center">Você está prestes a excluir este anúncio. Esta decisão não poderá ser desfeita. Deseja continuar?</Text>
          </Modal.Body>
          <HStack py="$2" justifyContent="space-between">
            <Button 
              title="Cancelar"
              bgVariant="secondary"
              w="48%"
              onPress={() => setShowDeleteModal(false)}
              disabled={isExcluding}
            />
            <Button 
              title="Sim, excluir"
              bgVariant="dark"
              w="48%"
              btnIcon={Trash}
              onPress={handleDeleteAd} 
              isLoading={isExcluding}
            />
          </HStack>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}