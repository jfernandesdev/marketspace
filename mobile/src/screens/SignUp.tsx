import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from 'expo-image-picker';
import * as yup from "yup";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { api } from "@services/api";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ToastMessage } from "@components/ToastMessage";

import {
  Box,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast
} from "@gluestack-ui/themed";

import LogoIcon from "@assets/logoIcon.svg";

import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  passwordConfirmation: string;
}

const signUpSchema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().required("Informe seu melhor e-mail").email("E-mail inválido"),
  tel: yup
    .string()
    .required("Informe seu telefone")
    .matches(/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/, "Número de telefone inválido"),
  password: yup.string().required("Crie uma senha").min(6, "A senha deve ter no mínimo 6 dígitos"),
  passwordConfirmation: yup.string()
    .required("Confirme sua senha")
    .oneOf([yup.ref('password'), ""], "As senhas não correspondem")
})

export function SignUp() {
  const [userPhoto, setUserPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigationAuth = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const toast = useToast();

  const Header = () => (
    <VStack alignItems="center">
      <Box alignSelf="center"><LogoIcon /></Box>
      <Heading fontFamily="$heading" fontSize="$xl" color="$gray700">Boas vindas!</Heading>
      <Text fontFamily="$body" fontSize="$sm" color="$gray600" mt="$2" textAlign="center">Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
    </VStack>
  );

  const Footer = () => (
    <VStack mt="$10" justifyContent="center" alignContent="center">
      <Text fontSize="$sm" fontFamily="$body" color="$gray600" textAlign="center" mb="$4">Já tem uma conta?</Text>
      <Button
        title="Ir para o login"
        bgVariant="secondary"
        onPress={handleBackToSignIn}
      />
    </VStack>
  );

  const handleBackToSignIn = () => {
    navigationAuth.navigate("signIn");
  }

  const handleSignUp = async (data: FormDataProps) => {
    try {
      setIsLoading(true);
      const { name, email, tel, password } = data;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('tel', tel);
      formData.append('password', password);

      if (userPhoto) {
        formData.append('avatar', {
          uri: userPhoto.uri,
          name: (userPhoto.fileName || `photo-${name}`).replace(/\s+/g, '-'),
          type: userPhoto.mimeType || 'image/jpeg'
        } as any);
      }

      await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await signIn(email, password);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Conta criada com sucesso!"
            align="center"
          />
        )
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível cria a conta. Tente novamente.";

      return toast.show({
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
      setIsLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="$gray200" py="$16" px="$10">
        <Header />
        <UserPhoto setUserPhoto={setUserPhoto} />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="tel"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Telefone"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.tel?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              isPasswordField
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirmar senha"
              isPasswordField
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirmation?.message}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
            />
          )}
        />

        <Button
          title="Criar e acessar"
          bgVariant="dark"
          mt="$2"
          isLoading={isLoading}
          onPress={handleSubmit(handleSignUp)}
        />

        <Footer />
      </VStack>
    </ScrollView>
  );
}