import { ComponentProps } from "react";

import {
  Avatar as GluestackAvatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";

import UserPhotoDefault from "@assets/avatar-default.png";

type AvatarProps = ComponentProps<typeof GluestackAvatar> & {
  image?: string;
  textFallback?: string;
  isPhotoDefault?: boolean;
}

export function Avatar({ image, textFallback, isPhotoDefault = false, ...rest }: AvatarProps) {
  return (
    <GluestackAvatar borderWidth={2} borderColor="$brand400" bg="$brand400" {...rest}>
      <AvatarFallbackText>{textFallback}</AvatarFallbackText>
      {image && (
        <AvatarImage
          source={isPhotoDefault ? UserPhotoDefault : { uri: image }}
          alt="Foto Perfil"
        />
      )}
    </GluestackAvatar>
  );
}