import { Box, Heading, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";

import LogoIcon from "@assets/logoIcon.svg";

const Header = () => (
  <VStack alignItems="center">
    <Box alignSelf="center"><LogoIcon /></Box>
    <Heading fontFamily="$heading" fontSize="$xl" color="$gray700">Boas vindas!</Heading>
    <Text fontFamily="$body" fontSize="$sm" color="$gray600" mt="$2" textAlign="center">Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
  </VStack>
);

const Footer = () => (
  <VStack py="$8" justifyContent="center" alignContent="center">
    <Text fontSize="$sm" fontFamily="$body" color="$gray600" textAlign="center" mb="$6">Já tem uma conta?</Text>
    <Button title="Ir para o login" bgVariant="secondary" />
  </VStack>
);

export function SignUp() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="$gray200" py="$16" px="$12">
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

            <Button title="Criar" bgVariant="dark" mt="$4" />
      <Footer />
      </VStack>
    </ScrollView>
  );
}