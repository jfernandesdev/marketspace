import { ComponentProps } from "react";
import { 
  Checkbox as GluestackCheckbox,
  CheckboxIcon, 
  CheckboxLabel,
  CheckboxIndicator,
  HStack,
  CheckIcon,
  Icon
} from "@gluestack-ui/themed";
import { CircleX } from "lucide-react-native";

type CheckboxProps = ComponentProps<typeof GluestackCheckbox> & {
  label: string;
  value: string;
  isChecked?: boolean;
  type?: "custom" | "default";
};

export function Checkbox({ label, value, isChecked = false, type = "default", ...rest }: CheckboxProps) {
  
  return (
    <GluestackCheckbox
      size="md"
      value={value}
      isChecked={isChecked}
      {...rest}
    >
      <HStack
        p="$2"
        minWidth={type === "custom" ? 90 : 0}
        justifyContent="center"
        space="xs"
        bg={type === 'custom' ? (isChecked  ? "$brand400" : "$gray300") : undefined}
        borderRadius="$full"
        alignItems="center"
      >
        {type === 'default' && (
          <CheckboxIndicator
            $checked-backgroundColor="$brand400"
            $checked-borderColor="$brand400"
          >
            <CheckboxIcon as={CheckIcon} color="$white" />
          </CheckboxIndicator>
        )}

        <CheckboxLabel color={type === 'custom' && isChecked  ? "$gray100" : "$gray600"}>
          {label}
        </CheckboxLabel>

        {type === 'custom' && isChecked  && (
          <Icon as={CircleX} color="$brand400" fill="$gray100" size="sm" />
        )}
      </HStack>
    </GluestackCheckbox>
  );
}
