import { ComponentProps } from "react";
import { Button as GluestackButton, Text, ButtonSpinner } from "@gluestack-ui/themed";

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string;
  bgVariant?: "primary" | "secondary" | "dark";
  isLoading?: boolean;
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

export function Button({ title, bgVariant = "primary", isLoading = false, ...rest }: ButtonProps) {
  const bgColor = backgroundMap[bgVariant];
  const textColor = textColorMap[bgVariant];

  return (
    <GluestackButton
      w="$full"
      h="$14"
      rounded="$md"
      bg={bgColor}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ?
        <ButtonSpinner color="$white" /> : (
          <Text
            color={textColor}
            fontFamily="$heading"
            fontSize="$sm"
          >{title} </Text>
        )
      }
    </GluestackButton>
  );
}