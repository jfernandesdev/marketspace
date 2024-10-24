import React, { useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Box, Text, Image, VStack } from "@gluestack-ui/themed";
import { Button } from '@components/Button';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Boas-vindas ao Marketspace!',
    text: 'Sua galáxia para comprar e vender com facilidade. Pronto para decolar?',
    image: require('@assets/intro/intro-1.png'),
  },
  {
    title: 'Trocas e Vendas',
    text: 'Dê uma nova vida ao que não usa! Trocas fáceis e rápidas!',
    image: require('@assets/intro/intro-2.png'),
  },
  {
    title: 'Produtos Variados',
    text: 'Descubra uma variedade de produtos incríveis. O que você está esperando?',
    image: require('@assets/intro/intro-3.png'),
  },
];

export function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleFinish = async () => {
    await AsyncStorage.setItem('@hasSeenOnboarding', 'true');
    navigation.navigate("signIn");
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(pageIndex);
  };

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" bg="$gray200">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {onboardingData.map((item, index) => (
          <Box key={index} width={width} justifyContent="center" alignItems="center" px="$6">
            <Text fontFamily="$heading" fontSize="$xl">{item.title}</Text>
            <Text fontFamily="$body" textAlign="center" mt="$2">{item.text}</Text>
            <Box my="$6">
              <Image
                source={item.image}
                resizeMode="contain"
                alt="Image Intro"
                style={{ width: width * 0.9, height: width * 0.9 }}
              />
            </Box>
           
            {index === onboardingData.length - 1 && (
              <Button
                title='Explorar o Marketspace'
                bgVariant="dark"
                mt={4}
                onPress={handleFinish}
                w={width - 80}
                btnIconRight={ArrowRight}
              />
            )}
          </Box>
        ))}
      </ScrollView>
      <Box flexDirection="row" mb="$16" justifyContent="center">
        {onboardingData.map((_, index) => (
          <Box
            key={index}
            width={currentPage === index ? 36 : 12}
            height={12}
            borderRadius="$full"
            bg={currentPage === index ? "$brand400" : "$gray400"}
            opacity={currentPage === index ? 1 : 0.5}
            margin={2}
          />
        ))}
      </Box>
    </VStack>
  );
}
