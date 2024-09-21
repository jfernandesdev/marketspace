import { ComponentProps } from "react";

import {
  Avatar as GluestackAvatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";

type AvatarProps = ComponentProps<typeof GluestackAvatar> & {
  image: string;
  textFallback?: string;
}

export function Avatar({ image, textFallback, ...rest}: AvatarProps) {
  return (
    <GluestackAvatar borderWidth={2} borderColor="$brand400" {...rest}>
      <AvatarFallbackText >{textFallback}</AvatarFallbackText>
      <AvatarImage source={{ uri: image}} alt="Foto Perfil" />
    </GluestackAvatar>
  );
}