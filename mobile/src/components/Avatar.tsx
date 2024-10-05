import { ComponentProps } from "react";
import { api } from "@services/api";

import {
  Avatar as GluestackAvatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";

type AvatarProps = ComponentProps<typeof GluestackAvatar> & {
  image?: string;
  textFallback?: string;
}

export function Avatar({ image, textFallback, ...rest }: AvatarProps) {
  return (
    <GluestackAvatar borderWidth={2} borderColor="$brand400" bg="$brand400" {...rest}>
      <AvatarFallbackText>{textFallback}</AvatarFallbackText>
      {image && (
        <AvatarImage
          source={{ uri: `${api.defaults.baseURL}/images/${image}` }}
          alt="Foto Perfil"
        />
      )}
    </GluestackAvatar>
  );
}