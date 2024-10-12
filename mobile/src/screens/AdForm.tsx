import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@hooks/useAuth";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ProductImagesDto } from "@dtos/ProductImages";
import { PaymentMethodsDto } from "@dtos/PaymentMethods";

import { Label } from "@components/Label";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Button } from "@components/Button";
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

interface FormData {
  name: string;
  description: string;
  price: number;
}

const schema = yup.object({
  name: yup.string().required("Informe o título do anúncio"),
  description: yup.string().required("Informe a descrição do produto"),
  price: yup.number().required("Informe o valor do produto").positive("O valor deve ser positivo")
}).required();

export function AdForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ProductImagesDto[]>([]);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string>("novo");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsDto[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();
  const toast = useToast();
  const route = useRoute();

  const { type } = route.params as { type: "ADD" | "EDIT" };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleNext = (data: FormData) => {
    try {
      setIsLoading(true);
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

      const formData = {
        ...data,
        is_new: selectedCondition === "novo",
        accept_trade: acceptTrade,
        payment_methods: paymentMethods,
        product_images: selectedImages, 
        is_active: true,
        user_id: user.id
      };

      navigation.navigate("adStack", {
        screen: "adDetails",
        params: {
          adData: formData,
          isEditFlow: true
        }
      });

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const resetForm = ()  => {
    reset();
    setAcceptTrade(false);
    setSelectedCondition("novo");
  }

  const handleCancel = () => {
    resetForm();
    navigation.navigate("home");
  }
  
  return (
    <VStack flex={1} justifyContent="space-between" pb="$4">
      <ScreenHeader title={type === "EDIT" ? "Editar anúncio" : "Criar anúncio"} showBackButton />

      <ScrollView flex={1} px="$8" mb="$4">
        {/* Imagens */}
        <Box mb="$4">
          <Label text="Imagens" fontSize="$md" />
          <Text fontFamily="$body" fontSize="$sm" color="$gray500" pb="$2">
            Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
          </Text>
          <ImagePickerCard onImagesSelected={setSelectedImages} />
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
              <Radio label="Produto novo" value="novo" aria-label="Novo" />
              <Radio label="Produto usado" value="usado" aria-label="Usado" />
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
          <PaymentMethodsCheckbox onSelect={setPaymentMethods} />
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
          title="Avançar"
          w="48%"
          bgVariant="dark"
          onPress={handleSubmit(handleNext)}
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  );
}