import { useState, ComponentProps } from "react";
import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText
} from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { Icon } from "@gluestack-ui/themed";

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
  isPasswordField?: boolean;
}

export function Input({
  isReadOnly = false, 
  isInvalid = false, 
  errorMessage = null, 
  isPasswordField = false,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(isPasswordField);
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GluestackInput
        isInvalid={isInvalid}
        h="$11"
        borderWidth="$0"
        borderRadius="$md"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$brand500"
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500"
        }} 
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}  
      >
        <InputField
          bg="$gray100"
          px="$4"
          color="$gray700"
          fontFamily="$body"
          placeholderTextColor="$gray400"
          secureTextEntry={showPassword} 
          {...rest}  
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 16, top: 12 }}
          >
            {!showPassword ? 
              <Icon as={Eye} size="xl" color="$gray400" /> :
              <Icon as={EyeOff} size="xl" color="$gray400" />
            } 
          </TouchableOpacity>
        )}
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red400" fontSize="$xs" fontFamily="$body" marginLeft="auto">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>

    </FormControl>
  );
}