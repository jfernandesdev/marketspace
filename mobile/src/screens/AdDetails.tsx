import { VStack } from "@gluestack-ui/themed";
import { Power, Trash } from "lucide-react-native";

import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import ImageSlider from "@components/ImageSlider";

export function AdDetails() {
  return (
    <VStack flex={1} justifyContent="space-between" pb="$6">
      <ScreenHeader showBackButton showEditButton />

      <VStack flex={1} mt="$4">
        <ImageSlider images={
          [
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
            "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717",
            "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3"
          ]
        }/>
      </VStack>

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