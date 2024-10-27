import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from '@services/api';

import { useAd } from "@hooks/useAd";
import { useAuth } from "@hooks/useAuth";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ProductImagesDto } from "@dtos/ProductImages";
import { PaymentMethodsDto } from "@dtos/PaymentMethods";

import { Label } from "@components/Label";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { ToastMessage } from "@components/ToastMessage";
import { ImagePickerCard } from "@components/ImagePickerCard";
import { PaymentMethodsCheckbox } from "@components/PaymentMethodsCheckbox";

import {
  VStack,
  HStack,
  Text,
  ScrollView,
  Switch,
  RadioGroup,
  Box,
  Textarea,
  TextareaInput,
  useToast
} from "@gluestack-ui/themed";
import { ProductDto } from "@dtos/ProductDto";

const schema = yup.object({
  name: yup.string().required("Informe o título do anúncio"),
  description: yup.string().required("Informe a descrição do produto"),
  price: yup.number().required("Informe o valor do produto").positive("O valor deve ser positivo")
}).required();

type FormData = yup.InferType<typeof schema>;

// Formulário de adicionar/editar anuncio
export function AdForm() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();
  const { editedAdData, saveEditedAdData, clearAdData } = useAd();
  const toast = useToast();
  
  const route = useRoute();
  const { type } = route.params as { type: "ADD" | "EDIT" };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
 
  const [selectedImages, setSelectedImages] = useState<ProductImagesDto[]>([]);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string>("new");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsDto[]>([]);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
    },
  });

  const handleNext = (data: FormData) => {
    try {
      setIsSubmitting(true);
      if (selectedImages.length === 0) {
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              title="Pelo menos uma imagem deve ser selecionada!"
              align="center"
            />
          )
        });
      }

      if (paymentMethods.length === 0) {
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              title="Pelo menos um meio de pagamento deve ser selecionado!"
              align="center"
            />
          )
        })
      }

      const formData: ProductDto = {
        ...data,
        is_new: selectedCondition === "new",
        accept_trade: acceptTrade,
        payment_methods: paymentMethods,
        product_images: selectedImages, 
        is_active: true,
        user_id: user.id
      };

      saveEditedAdData(formData);
      
      //Preview da nova publicação
      navigation.navigate("adStack", { screen: "adDetails", params: { previewAd: true } });

    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetForm = ()  => {
    reset({
      name: "",
      description: "",
      price: undefined,
    });
    setAcceptTrade(false);
    setSelectedCondition("new");
    setSelectedImages([]);
    setPaymentMethods([]);
  }

  const handleCancel = () => {
    clearAdData();
    resetForm();
    navigation.navigate("home");
  }

  const handleUpdateAd = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const requestData = {
        ...data,
        is_new: selectedCondition === "new",
        accept_trade: acceptTrade,
        payment_methods: paymentMethods.map(method => method.key),
        is_active: true,
      }

      if (editedAdData && editedAdData.product_images) {
        await api.put(`/products/${editedAdData.id}`, requestData);

        // Encontrar imagens removidas (existentes antes mas não mais na lista)
        const removedImages = editedAdData.product_images
          .filter((image: ProductImagesDto) => 
            !selectedImages.some((img: ProductImagesDto) => img.id === image.id))
          .map((image: ProductImagesDto) => image.id);
  
        if (removedImages.length > 0) {
          await api.delete(`/products/images`, {
            data: { productImagesIds: removedImages },
          });
        }
  
        // Fazer upload de novas imagens (aquelas sem ID)
        const newImages = selectedImages.filter(image => !image.id);
  
        if (newImages.length > 0 && editedAdData.id) {
          const formData = new FormData();
          formData.append("product_id", editedAdData.id);
  
          newImages.forEach(image => {
            formData.append('images', {
              uri: image.uri,
              name: image.name,
              type: image.type,
            } as any);
          });
  
          await api.post(`/products/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
  
        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="success"
              title="Anúncio editado com sucesso!"
              align="center"
            />
          )
        });
  
        navigation.navigate("myAds");
      }

    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao tentar editar o anúncio."
            align="center"
          />
        )
      });
      console.error("Erro ao atualizar o produto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    setIsLoadingPage(true);
    try {
      if (editedAdData && Object.keys(editedAdData).length > 0) {
        reset({
          name: editedAdData.name,
          description: editedAdData.description,
          price: editedAdData.price,
        });
        setAcceptTrade(editedAdData.accept_trade);
        setSelectedCondition(editedAdData.is_new ? "new" : "used");
        setPaymentMethods(editedAdData.payment_methods);

        if (editedAdData && Array.isArray(editedAdData.product_images) && editedAdData.product_images.length > 0) {
          const formattedImages = editedAdData.product_images.map((image: ProductImagesDto) => {
            if (image.id) {
              return {
                uri: `${api.defaults.baseURL}/images/${image.path}`,
                id: image.id,
              };
            } else {
              return {
                uri: image.uri,
                name: image.name,
                type: image.type,
              };
            }
          });

          setSelectedImages(formattedImages);
        }
      } else {
        resetForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPage(false);
    }
  }, [editedAdData, reset]);

  
  if (isLoadingPage) {
    return <Loading />
  }

  return (
    <VStack flex={1} justifyContent="space-between" pb="$4">
      <ScreenHeader 
        title={type === "EDIT" ? "Editar anúncio" : "Criar anúncio"} 
        showBackButton 
        onResetForm={resetForm}
      />

      <ScrollView flex={1} px="$8" mb="$4">
        {/* Imagens */}
        <Box mb="$4">
          <Label text="Imagens" fontSize="$md" />
          <Text fontFamily="$body" fontSize="$sm" color="$gray500" pb="$2">
            Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
          </Text>
          <ImagePickerCard 
            onImagesSelected={setSelectedImages}
            selectedImages={selectedImages}
          />
        </Box>

        {/* Sobre o produto */}
        <Box mb="$4">
          <Label text="Sobre o produto" fontSize="$md" />

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título do anúncio"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <>
                <Textarea bg="$gray100" borderWidth="$0" mt={-5}>
                  <TextareaInput
                    placeholder="Descrição do produto"
                    onChangeText={onChange}
                    value={value}
                    color="$gray700"
                    fontFamily="$body"
                    placeholderTextColor="$gray400"
                    fontSize="$md"
                    rounded="$md"
                    px="$4"
                    borderWidth={1}
                    aria-invalid={!!errors?.description}
                    borderColor={!!errors?.description ? "$red500" : "transparent"}
                    $focus={{
                      borderWidth: 1,
                      borderColor: !!errors?.description ? "$red500" : "$brand500"
                    }}
                  />
                </Textarea>
                {errors.description && (
                  <Text color="$red400" fontSize="$xs" marginLeft="auto" py="$2">
                    {errors.description.message}
                  </Text>
                )}
              </>
            )}
          />

          <RadioGroup value={selectedCondition} onChange={setSelectedCondition}>
            <HStack space="4xl" alignItems="center" pt="$2">
              <Radio label="Produto novo" value="new" aria-label="Novo" />
              <Radio label="Produto usado" value="used" aria-label="Usado" />
            </HStack>
          </RadioGroup>
        </Box>

        {/* Venda */}
        <Box mt="$2">
          <Label text="Venda" fontSize="$md" />
          <Box>
            <Text position="absolute" zIndex={1} left="$4" top="$3" color="$gray700">R$</Text>

            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Valor do produto"
                  onChangeText={(text) => {
                    // Mantendo a entrada como texto e substituir a vírgula por um ponto
                    const formattedText = text.replace(',', '.');

                    //Atualizando o valor no estado quando o texto não é vazio
                    if (formattedText === '') {
                      onChange(null);
                    } else {
                      onChange(formattedText); 
                    }
                  }}
                  value={value !== undefined ? String(value).replace('.', ',') : ""}
                  errorMessage={errors.price?.message}
                  pl="$12"
                  keyboardType="decimal-pad"
                />
              )}
            />
          </Box>

          {/* Aceita troca? */}
          <HStack space="xs" alignItems="center" mt={-10}>
            <Label text="Aceita troca?" fontSize="$sm" onPress={() => { setAcceptTrade(!acceptTrade) }} />
            <Switch value={acceptTrade} onValueChange={setAcceptTrade} />
          </HStack>
        </Box>

        {/* Meios de pagamento */}
        <Box mb="$4">
          <Label text="Meios de pagamento aceitos" fontSize="$md" />
          <PaymentMethodsCheckbox 
            onSelect={setPaymentMethods} 
            selectedMethods={paymentMethods}
          />
        </Box>
      </ScrollView>

      <HStack space="md" px="$8">
        <Button
          title="Cancelar"
          w="48%"
          bgVariant="secondary"
          onPress={handleCancel}
        />
        <Button
          title={type === 'EDIT' ? "Salvar edição" : "Avançar"}
          w="48%"
          bgVariant="dark"
          onPress={type === 'EDIT' ? handleSubmit(handleUpdateAd) : handleSubmit(handleNext)}
          isLoading={isSubmitting}
        />
      </HStack>
    </VStack>
  );
}