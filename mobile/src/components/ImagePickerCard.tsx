import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Icon, HStack, Image } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';

import { Plus, X } from 'lucide-react-native';

export function ImagePickerCard() {
  const [images, setImages] = useState<(string | null)[]>([]); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
      console.log('Imagem selecionada:', result.assets[0]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <HStack space="md">
      {images.map((imageUri, index) => (
        <TouchableOpacity key={index} onPress={() => removeImage(index)}>
          <Center bg="$gray300" h={100} w={100} rounded="$md" position="relative">
            {imageUri ? (
              <>
                <Image
                  source={{ uri: imageUri }}
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
