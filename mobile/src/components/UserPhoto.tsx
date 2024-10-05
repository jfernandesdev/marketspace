import { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { Box, Icon, View } from "@gluestack-ui/themed";
import * as ImagePicker from 'expo-image-picker';
import { PencilLine } from "lucide-react-native";

import { Avatar } from "@components/Avatar";
import UserPhotoDefault from "@assets/avatar-default.png";

interface UserPhotoProps {
  setUserPhoto: (photo: ImagePicker.ImagePickerAsset | null) => void;
}

export function UserPhoto({ setUserPhoto }: UserPhotoProps) {
  const [userPhoto, setLocalUserPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  
  async function handlePickImage() {
    // Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    // Abrir a galeria para selecionar a imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedPhoto = result.assets[0];
      setLocalUserPhoto(selectedPhoto); 
      setUserPhoto(selectedPhoto); // estado do componente pai 
    }
  }
  
  return (
    <View alignSelf="center" my="$6" rounded="$full">
      <Avatar
        image={userPhoto && userPhoto.uri ? userPhoto.uri : UserPhotoDefault}
        size="xl"
        borderWidth={3}
        bg="$gray200"
        isPhotoDefault={!userPhoto}
      />
      <TouchableOpacity activeOpacity={0.9} onPress={handlePickImage}>
        <Box
          bg="$brand400"
          h={36}
          w={36}
          rounded="$full"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          bottom={-10}
          right={-10}
        >
          <Icon as={PencilLine} color="$gray200" size="md" />
        </Box>
      </TouchableOpacity>
    </View>
  );
}
