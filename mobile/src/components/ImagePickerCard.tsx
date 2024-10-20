import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Icon, HStack, Image } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';

import { Plus, X } from 'lucide-react-native';
import { ProductImagesDto } from '@dtos/ProductImages';

interface ImagePickerCardProps {
  onImagesSelected: (images: ProductImagesDto[]) => void;
  selectedImages?: ProductImagesDto[];
}

export function ImagePickerCard({ onImagesSelected, selectedImages = []}: ImagePickerCardProps) {
  const [images, setImages] = useState<ProductImagesDto[]>([]); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      const imageInfo: ProductImagesDto = {
        uri: selectedImage.uri,
        name: (selectedImage.fileName || `photo-${selectedImage.assetId}`).replace(/\s+/g, '-'),
        type: selectedImage.mimeType || 'image/jpeg'
      };

      const updatedImages = [...images, imageInfo];
      setImages(updatedImages);
      onImagesSelected(updatedImages); // Envia as imagens para o componente pai
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    onImagesSelected(newImages);
  };

  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(selectedImages)) {
      setImages(selectedImages);
    }
  }, [selectedImages]);

  return (
    <HStack space="md">
      {images.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => removeImage(index)}>
          <Center bg="$gray300" h={100} w={100} rounded="$md" position="relative">
            {image.uri ? (
              <>
                <Image
                  source={{ uri: image.uri }}
                  alt={`Imagem ${index + 1}`}
                  h="$full"
                  w="$full"
                  rounded="$md"
                />
                <Icon
                  as={X}
                  color="$gray100"
                  bg="$gray600"
                  rounded="$full"
                  size="sm"
                  position="absolute"
                  top="$1"
                  right="$1"
                />
              </>
            ) : (
              <Icon as={Plus} size="xl" color="$gray400" />
            )}
          </Center>
        </TouchableOpacity>
      ))}

      {images.length < 3 && (
        <TouchableOpacity onPress={pickImage}>
          <Center bg="$gray300" h={100} w={100} rounded="$md">
            <Icon as={Plus} size="xl" color="$gray400" />
          </Center>
        </TouchableOpacity>
      )}
    </HStack>
  );
};
