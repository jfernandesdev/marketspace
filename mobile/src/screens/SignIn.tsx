import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native"; 
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { AppError } from "@utils/AppError";

import { Box, ScrollView, Text, VStack, useToast } from "@gluestack-ui/themed";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

import Logo from "@assets/logo.svg";

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe sua senha").min(6, "A senha deve ter no mínimo 6 dígitos")
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  })

  const navigationAuth = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const toast = useToast();

  const handleNewAccount = () => {
    navigationAuth.navigate("signUp");
  };

  const handleSignIn = async ({ email, password }: FormDataProps ) => {
   try {
     setIsLoading(true);
     await signIn(email, password);
   } catch (error) {
    const isAppError = error instanceof AppError;
    const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente.";

    return toast.show({
      placement: "top",
      render: ({ id }) => (
        <ToastMessage id={id} action="error" title={title} align="center" />
      )
    })
   } finally {
    setIsLoading(false);
   }
  };

  const Header = () => (
    <VStack>
      <Box alignSelf="center"><Logo /></Box>
      <Text fontFamily="$body" color="$gray500" mt="$2" textAlign="center">Seu espaço de compra e venda</Text>
    </VStack>
  );

  const Footer = () => (
    <VStack justifyContent="center" alignContent="center" px="$10" py="$10">
      <Text fontFamily="$body" color="$gray600" mb="$6" textAlign="center">Ainda não tem acesso?</Text>
      <Button 
        title="Criar uma conta" 
        bgVariant="secondary"
        onPress={handleNewAccount} 
      />
    </VStack>
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="$white">
        <Box flex={1} w="100%" bg="$gray200" py="$16" px="$10" borderBottomLeftRadius={24} borderBottomRightRadius={24}>
          <Header />

          <VStack mt="$16">
            <Text fontFamily="$body" color="$gray600" my="$4" textAlign="center">Acesse sua conta</Text>

            <Controller 
              control={control}
              name="email"
              render={({field: { onChange, value }}) => (
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
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Senha" 
                  isPasswordField
                  returnKeyType="send"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                />
              )}
            />

            <Button 
              title="Entrar" 
              mt="$4" 
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </VStack>
        </Box>
        <Footer />
      </VStack>
    </ScrollView>
  );
}