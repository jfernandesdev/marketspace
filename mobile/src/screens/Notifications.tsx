import { VStack, Text } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/ScreenHeader";
import { NotificationCard } from "@components/NotificationCard";

export function Notifications() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Notificações" showBackButton />

      <VStack flex={1} bg="$gray200" py="$8" px="$10" alignItems="center">
        <NotificationCard
          title="Promoção Relâmpago!"
          description="Você tem 20% de desconto na sua próxima compra. 🤩"
          timestamp="2 horas atrás"
        />
        <NotificationCard
          title="Novo Produto Disponível"
          description="Um produto que você está monitorando está disponível!"
          timestamp="5 horas atrás"
        />

      </VStack>

      <Text color="$brand500" fontSize="$md" fontFamily="$heading" textAlign="center" py="$8">
        Marcar tudo como lido
      </Text>
    </VStack>
  );
}
