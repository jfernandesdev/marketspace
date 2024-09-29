import { ComponentProps } from "react";
import {  
  Radio as GluestackRadio, 
  RadioLabel, 
  RadioIndicator, 
  RadioIcon, 
  CircleIcon 
} from "@gluestack-ui/themed";

type RadioProps = ComponentProps<typeof GluestackRadio> & {
  label: string;
  value: string;
};

export function Radio({ label, value, ...rest }: RadioProps) {
  return (
    <GluestackRadio value={value} {...rest}>
      <RadioIndicator mr="$2">
      <RadioIcon as={CircleIcon} color="$brand400" size="2xs" />
      </RadioIndicator>
      <RadioLabel>{label}</RadioLabel>
    </GluestackRadio>
  );
}