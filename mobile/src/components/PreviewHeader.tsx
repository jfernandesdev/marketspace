import { VStack, Heading, Text } from "@gluestack-ui/themed";

export function PreviewHeader() {
  return(
    <VStack justifyContent="center" alignItems="center" pt="$12" pb="$4" bg="$brand400">
     <Heading fontFamily="$heading" color="$gray100" fontSize="$md">
      Pré visualização do anúncio
    </Heading>
    <Text fontFamily="$body" color="$gray100" fontSize="$sm">
      É assim que seu produto vai aparecer!
    </Text>
    </VStack>
  );
}