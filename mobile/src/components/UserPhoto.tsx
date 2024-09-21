import { TouchableOpacity } from "react-native";
import { Avatar, AvatarImage, Box, Icon } from "@gluestack-ui/themed";
import { PencilLine } from "lucide-react-native";

export function UserPhoto() {
  return (
    <TouchableOpacity activeOpacity={0.9}>
    <Avatar
      size="xl"
      alignSelf="center"
      my="$6"
      borderWidth={3}
      borderColor="$brand400"
      position="relative"
    >
      <AvatarImage
        source={{ uri: "https://github.com/jfernandesdev.png" }}
        alt="Foto de perfil"
      />
     
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
    </Avatar>
    </TouchableOpacity>
  );
}
