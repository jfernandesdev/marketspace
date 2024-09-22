import { useState, useRef, ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

import { Eye, EyeOff, SlidersVertical, Search } from "lucide-react-native";

import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Icon,
  View,
  HStack
} from "@gluestack-ui/themed";

import { FilterModal } from "@components/FilterModal";

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
  isPasswordField?: boolean;
  showIconSearch?: boolean;
  showIconFilter?: boolean;
}

export function Input({
  isReadOnly = false,
  isInvalid = false,
  errorMessage = null,
  isPasswordField = false,
  showIconSearch = false,
  showIconFilter = false,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(isPasswordField);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const inputRef = useRef<any>(null);

  const invalid = !!errorMessage || isInvalid;

  const handleSearchFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOpenFilter = () => {
    console.log("Open Filter");
    setShowFilterModal(true);
  };

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
          ref={inputRef}
          bg="$gray100"
          px="$4"
          color="$gray700"
          fontFamily="$body"
          placeholderTextColor="$gray400"
          secureTextEntry={showPassword}
          {...rest}
        />

        <HStack alignItems="center" position="absolute" right="$4" top="$0" bottom="$0">
          {/* Ícone de busca */}
          {showIconSearch && (
            <TouchableOpacity onPress={handleSearchFocus}>
              <Icon as={Search} size="xl" color="$gray600" />
            </TouchableOpacity>
          )}

          {/* Divisor vertical */}
          {showIconSearch && showIconFilter && <View width="$px" height="$6" mx="$2" bg="$gray300"/>}

          {/* Ícone de filtro */}
          {showIconFilter && (
            <TouchableOpacity onPress={handleOpenFilter}>
              <Icon as={SlidersVertical} size="xl" color="$gray600" />
            </TouchableOpacity>
          )}
        </HStack>

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

      <FilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />

    </FormControl>
  );
}