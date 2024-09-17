import { Center, Heading, Icon, Image } from "@gluestack-ui/themed";
import { PartyPopper } from "lucide-react-native";

import Logo from "@assets/logo.svg";

export function Home() {
  return (
    <Center flex={1} bg="$gray200">
      <Logo />

      <Icon as={PartyPopper} size="xl" />
      <Heading fontSize="$2xl">
        Home
        </Heading>
    </Center>
  )
}