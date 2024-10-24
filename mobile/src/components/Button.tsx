import { ComponentProps } from "react";
import { Button as GluestackButton, Text, ButtonSpinner, Icon, HStack } from "@gluestack-ui/themed";
import { LucideProps } from "lucide-react-native";

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string;
  bgVariant?: "primary" | "secondary" | "dark";
  isLoading?: boolean;
  btnIcon?: React.ComponentType<LucideProps>;
  btnIconRight?: React.ComponentType<LucideProps>;
}

const backgroundMap = {
  primary: "$brand400",
  secondary: "$gray300",
  dark: "$gray700",
};

const textColorMap = {
  primary: "$gray100",
  secondary: "$gray600",
  dark: "$gray100",
};

export function Button({ title, bgVariant = "primary", isLoading = false, btnIcon, btnIconRight, ...rest }: ButtonProps) {
  const bgColor = backgroundMap[bgVariant];
  const textColor = textColorMap[bgVariant];
  const buttonOpacity = rest.disabled ? 0.5 : 1;

  return (
    <GluestackButton
      w="$full"
      h="$11"
      rounded="$md"
      bg={bgColor}
      disabled={isLoading}
      style={{ opacity: buttonOpacity }}
      {...rest}
    >
      {
        isLoading ?
        <ButtonSpinner color="$white" /> : (
          <HStack alignItems="center" space="xs">
            {btnIcon && <Icon as={btnIcon} size="xs" color={textColor} />}
            <Text fontFamily="$heading" fontSize="$sm" color={textColor}> {title}</Text>
            {btnIconRight && <Icon as={btnIconRight} size="xs" color={textColor} />}
          </HStack>
        )
      }
    </GluestackButton>
  );
}