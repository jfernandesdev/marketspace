import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { ScrollView, Box, HStack, Image, Text, Center } from '@gluestack-ui/themed';

import { api } from '@services/api';
import { ProductImagesDto } from '@dtos/ProductImages';

interface ImageSliderProps {
  images: ProductImagesDto[];
  isActive?: boolean;
}

const { width } = Dimensions.get('window');

export function ImageSlider({ images, isActive = true }: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  return (
    <Box h={280} w="$full">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => {
          const imageUrl = image.uri ? image.uri : `${api.defaults.baseURL}/images/${image.path}`;

          return (
            <Image
              key={index}
              alt="Imagem Produto"
              source={{ uri: imageUrl }}
              resizeMode="cover"
              h={280}
              style={{ width }}
            />
          );
        })}
      </ScrollView>
      <HStack position="absolute" bottom="$2" w="$full" justifyContent="space-between" px="$2">
        {images.map((_, index) => (
          <Box
            key={index}
            h={3}
            flex={1}
            rounded="$md"
            bg={index === activeIndex ? "$white" : "$gray100"}
            opacity={index === activeIndex ? 1 : 0.50}
            marginHorizontal={2}
          />
        ))}
      </HStack>

      {!isActive && (
        <Center
          position="absolute"
          w="$full"
          h="$full"
          backgroundColor="rgba(26, 24, 27, 0.5)"
        >
          <Text color="$gray100" fontSize="$sm" fontFamily="$heading">
            ANÚNCIO DESATIVADO
          </Text>
        </Center>
      )}
    </Box>
  );
}