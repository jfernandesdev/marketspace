import { Center, Text, VStack } from "@gluestack-ui/themed";

import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { Power, Trash } from "lucide-react-native";

export function AdDetails() {
  return (
    <VStack flex={1} justifyContent="space-between" pb="$6">
      <ScreenHeader showBackButton showEditButton />

      <VStack px="$8">
        <Button 
          title="Desativar anúncio" 
          bgVariant="dark"
          btnIcon={Power} 
          mb="$2" 
        />
        <Button 
          title="Excluir anúncio" 
          bgVariant="secondary" 
          btnIcon={Trash} 
          mb="$2" 
        />
      </VStack>
    </VStack>
  );
}