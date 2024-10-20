import { VStack } from "@gluestack-ui/themed";

import { api } from "@services/api";

import { ScreenHeader } from "@components/ScreenHeader";
import { useAuth } from "@hooks/useAuth";
import { Avatar } from "@components/Avatar";
import { Input } from "@components/Input";

export function Profile() {
  const { user } = useAuth();

  return (
    <VStack flex={1} >
      <ScreenHeader title="Meu perfil" />

      <VStack flex={1} bg="$gray200" py="$8" px="$10" alignItems="center">
        <Avatar
          image={`${api.defaults.baseURL}/images/${user?.avatar}`}
          textFallback={user?.name}
          size="2xl"
          mb="$8"
        />

          <Input placeholder="Nome" value={user?.name} isReadOnly />
          <Input placeholder="E-mail" value={user?.email} isReadOnly />
          <Input placeholder="Telefone" value={user?.tel} isReadOnly />
      </VStack>
    </VStack>
  )
}