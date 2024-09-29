import React, { useState, ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';
import { 
  Select as GluestackSelect, 
  Text, 
  VStack, 
  ScrollView, 
  SelectIcon, 
  ChevronDownIcon, 
  SelectTrigger, 
  ChevronUpIcon 
} from '@gluestack-ui/themed';

type OptionType = {
  label: string;
  value: string;
};

type SelectProps = ComponentProps<typeof GluestackSelect> & {
  options: OptionType[];
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

export function Select({ options, initialValue = "", onValueChange, ...rest }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const selectedLabel = options.find((option: OptionType) => option.value === selectedValue)?.label || "Selecione";

  return (
    <VStack>
      <SelectTrigger variant="outline" size="sm" px="$2" onPress={() => setIsOpen(!isOpen)} >
        <Text fontFamily='$body' color="$gray600" fontSize="$sm" mr="$4" minWidth="$14">{selectedLabel}</Text>
        {isOpen ? <SelectIcon as={ChevronUpIcon} /> : <SelectIcon as={ChevronDownIcon} />}
      </SelectTrigger>

      {isOpen && (
        <VStack 
          position="absolute"
          zIndex={9999}
          bg="$gray100"
          borderWidth={0}
          rounded="$md"
          top="$10"
          w="$full"
        >
          <ScrollView>
            {options.map((option: OptionType) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleValueChange(option.value)}
                style={{ padding: 10, width: '100%' }}
              >
                <Text
                  fontFamily={option.value === selectedValue ? '$heading' : '$body'}  
                  color="$gray600" 
                  fontSize="$sm"
                >{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </VStack>
      )}
    </VStack>
  );
}
