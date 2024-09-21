import { Box, Heading, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";

import LogoIcon from "@assets/logoIcon.svg";

export function SignUp() {
  const navigationAuth = useNavigation<AuthNavigatorRoutesProps>();
  
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

  const handleSignUp = () => {
    //todo
    console.log("handle sign up");
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="$gray200" py="$16" px="$10">
        <Header />
        <UserPhoto />

        <Input
          placeholder="Nome"
        />

        <Input
          placeholder="E-mail"
          keyboardType="email-address"
        />

        <Input
          placeholder="Telefone"
          keyboardType="phone-pad"
        />

        <Input
          placeholder="Senha"
          isPasswordField
        />

        <Input
          placeholder="Confirmar senha"
          isPasswordField
        />

        <Button 
          title="Criar" 
          bgVariant="dark" 
          mt="$2" 
          onPress={handleSignUp}
        />

        <Footer />
      </VStack>
    </ScrollView>
  );
}