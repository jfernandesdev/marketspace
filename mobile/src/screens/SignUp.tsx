import { Box, Heading, Text, VStack } from "@gluestack-ui/themed";

import { Button } from "@components/Button";

import LogoIcon from "@assets/logoIcon.svg";

const Header = () => (
  <VStack alignItems="center">
    <Box alignSelf="center"><LogoIcon /></Box>
    <Heading fontFamily="$heading" fontSize="$xl" color="$gray700">Boas vindas!</Heading>
    <Text fontFamily="$body" fontSize="$sm" color="$gray600" mt="$2" textAlign="center">Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
  </VStack>
);

const Footer = () => (
  <VStack h="$48" justifyContent="center" alignContent="center" px="$12">
    <Text fontSize="$sm" fontFamily="$body" color="$gray600" textAlign="center" mb="$6">Já tem uma conta?</Text>
    <Button title="Ir para o login" bgVariant="secondary" />
  </VStack>
);

export function SignUp() {
  return (
    <VStack flex={1} bg="$gray200">
      <Box flex={1} w="100%" bg="$gray200" py="$16" px="$12" borderBottomLeftRadius={24} borderBottomRightRadius={24}>
        <Header />

        <VStack mt="$16">
          <Button title="Criar" bgVariant="dark" />
        </VStack>
      </Box>
      <Footer />
    </VStack>
  );
}