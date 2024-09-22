import { ComponentProps } from "react";
import { 
  Checkbox as GluestackCheckbox,
  CheckboxIcon, 
  CheckboxLabel,
  CheckboxIndicator,
  HStack,
  CheckIcon
} from "@gluestack-ui/themed";

type CheckboxProps = ComponentProps<typeof GluestackCheckbox> & {
  label: string;
  value: string;
};

export function Checkbox({ label, value, ...rest }: CheckboxProps) {
  return (
    <GluestackCheckbox
      size="md" 
      value={value}
      {...rest}
    >
      <HStack space="md" py="$2">
        <CheckboxIndicator $checked-backgroundColor="$brand400" $checked-borderColor="$brand400">
          <CheckboxIcon as={CheckIcon} color="$white" />
        </CheckboxIndicator>
        <CheckboxLabel>{label}</CheckboxLabel>
      </HStack>
    </GluestackCheckbox>
  );
}