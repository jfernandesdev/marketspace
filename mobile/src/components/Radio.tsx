import { ComponentProps } from "react";
import {  Radio as GluestackRadio, RadioLabel, HStack, Icon } from "@gluestack-ui/themed";

import { CircleX } from "lucide-react-native";

type RadioProps = ComponentProps<typeof GluestackRadio> & {
  label: string;
  value: string;
  isChecked?: boolean;
};

export function Radio({ label, value, isChecked, ...rest }: RadioProps) {
  return (
    <GluestackRadio value={value} {...rest}>
      <HStack
        p="$2"
        minWidth={90}
        justifyContent="center"
        space="xs"
        bg={isChecked ? "$brand400" : "$gray300"}
        borderRadius="$full"
        alignItems="center"
      >
        <RadioLabel color={isChecked ? "$gray100" : "$gray600"}>
          {label}
        </RadioLabel>
        {isChecked && <Icon as={CircleX} color="$brand400" fill="$gray100" size="sm"/>}
      </HStack>
    </GluestackRadio>
  );
}