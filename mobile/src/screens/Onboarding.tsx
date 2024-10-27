import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Box, Center, HStack, Icon, Text, View, VStack } from "@gluestack-ui/themed";
import { Button } from '@components/Button';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

import ImgIntro1 from '@assets/intro/intro-1.svg';
import ImgIntro2 from '@assets/intro/intro-2.svg';
import ImgIntro3 from '@assets/intro/intro-3.svg';
import { Loading } from '@components/Loading';

const onboardingData = [
  {
    title: 'Boas-vindas ao Marketspace!',
    text: 'Sua galáxia para comprar e vender com facilidade. Pronto para decolar?',
    image: ImgIntro1,
  },
  {
    title: 'Trocas e Vendas',
    text: 'Dê uma nova vida ao que não usa! Trocas fáceis e rápidas!',
    image: ImgIntro2,
  },
  {
    title: 'Produtos Variados',
    text: 'Descubra uma variedade de produtos incríveis. O que você está esperando?',
    image: ImgIntro3,
  },
];

export function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleFinish = async () => {
    await AsyncStorage.setItem('@hasSeenOnboarding', 'true');
    navigation.navigate("signIn");
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(pageIndex);
  };

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: nextPage * width, animated: true });
      }
    } else {
      handleFinish();
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('@hasSeenOnboarding', 'true');
    navigation.navigate("signIn");
  };

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem('@hasSeenOnboarding');
        if(seen === 'true') {
          navigation.navigate("signIn");
        }
      } catch (error) {
        console.error("Erro ao verificar o estado de onboarding:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" bg="$gray200">
      <ScrollView
        ref={scrollViewRef}
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
              <item.image width={width * 0.9} height={width * 0.9} />
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

      <HStack alignItems="center" justifyContent="space-between" w="$full" minHeight={125} px="$12">
        {/* Condição para exibir o botão "Pular" */}
        {currentPage < onboardingData.length - 1 ? (
          <TouchableOpacity onPress={handleSkip}>
            <Text>Pular</Text>
          </TouchableOpacity>
        ) : <View />}

        <HStack>
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
        </HStack>

        {/* Condição para exibir o botão "Próximo" */}
        {currentPage < onboardingData.length - 1 ? (
          <TouchableOpacity onPress={handleNext}>
            <Center h={42} w={42} bg="$gray700" borderRadius="$full">
              <Icon as={ArrowRight} color="$gray100" />
            </Center>
          </TouchableOpacity>
        ) : <View />}
      </HStack>
    </VStack>
  );
}
