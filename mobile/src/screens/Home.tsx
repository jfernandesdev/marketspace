import { ScrollView, VStack  } from "@gluestack-ui/themed";

import { HeaderHome } from "@components/HeaderHome";

export function Home() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="$gray200" py="$16" px="$6">
        <HeaderHome />
      </VStack>
    </ScrollView>
  )
}