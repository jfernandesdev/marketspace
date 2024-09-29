import { ComponentProps } from "react";
import { Text } from "@gluestack-ui/themed";

type LabelProps = ComponentProps<typeof Text> & {
  text: string;
}

export function Label({ text, ...rest }: LabelProps) {
  return (
    <Text 
      fontFamily="$heading" 
      fontSize="$sm" 
      color="$gray600"
      mb="$1.5"
      {...rest}
    >{text}</Text>
  );
}