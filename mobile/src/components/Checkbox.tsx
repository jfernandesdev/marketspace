import { ComponentProps } from "react";
import { Check } from "lucide-react-native";
import { 
  Checkbox as GluestackCheckbox,
  CheckboxIcon, 
  CheckboxLabel,
  CheckboxIndicator,
  HStack
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
        <CheckboxIndicator>
          <CheckboxIcon as={Check} color="$white" />
        </CheckboxIndicator>
        <CheckboxLabel>{label}</CheckboxLabel>
      </HStack>
    </GluestackCheckbox>
  );
}