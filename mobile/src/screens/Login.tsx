import { Box, Text, VStack } from "@gluestack-ui/themed";

import { Button } from "@components/Button";

import Logo from "@assets/logo.svg";

const Header = () => (
  <VStack>
    <Box alignSelf="center"><Logo /></Box>
    <Text fontFamily="$body" color="$gray500" mt="$2" textAlign="center">Seu espaço de compra e venda</Text>
  </VStack>
);

const Footer = () => (
  <VStack h="$56" justifyContent="center" alignContent="center" px="$8">
    <Text fontFamily="$body" color="$gray600" mb="$6" textAlign="center">Ainda não tem acesso?</Text>
    <Button title="Criar uma conta" bgVariant="secondary" />
  </VStack>
);

export function Login() {
  return (
    <VStack flex={1} bg="$white">
      <Box flex={1} w="100%" bg="$gray200" py="$16" px="$8" borderBottomLeftRadius={24} borderBottomRightRadius={24}>
        <Header />

        <VStack mt="$16">
          <Text fontFamily="$body" color="$gray600" my="$4" textAlign="center">Acesse sua conta</Text>
          <Button title="Entrar" />
        </VStack>
      </Box>
      <Footer />
    </VStack>
  );
}