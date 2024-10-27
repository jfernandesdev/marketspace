import { HStack, Text, VStack } from "@gluestack-ui/themed";

import { useAuth } from "@hooks/useAuth";

import { api } from "@services/api";

import { Avatar } from "@components/Avatar";

import { getFirstName } from "@utils/firstName";
import { NotificationIcon } from "./NotificationIcon";

export function HeaderHome() {
  const { user } = useAuth();

  return (
    <HStack justifyContent="space-between">
      <HStack space="sm">
        <Avatar 
          image={`${api.defaults.baseURL}/images/${user?.avatar}`} 
          textFallback={user.name} 
          size="md" 
        />

        <VStack space="xs">
          <Text fontSize="$md">Boas vindas,</Text>
          <Text fontFamily="$heading" fontSize="$md">{getFirstName(user.name)}!</Text>
        </VStack>
      </HStack>

      <NotificationIcon notificationsCount={2} />
    </HStack>
  );
}