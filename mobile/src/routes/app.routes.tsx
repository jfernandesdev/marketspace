import { createBottomTabNavigator, BottomTabNavigationProp, } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tag, House } from "lucide-react-native";

import { Platform } from "react-native";
import { Icon } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "@gluestack-ui";

import { useAuth } from "@hooks/useAuth";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { AdDetails } from "@screens/AdDetails";
import { AdForm } from "@screens/AdForm";

import { ImageInfo } from "@components/ImagePickerCard";
import { ProductDto } from "@dtos/ProductDto";

import ExitIcon from "@assets/exit.svg";
import { EnumPaymentMethod } from "@components/PaymentMethodsList";

// Definindo as rotas do Tab Navigator
type AppRoutes = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;
  adStack: {
    screen: keyof AdStackRoutes;
    params?: AdStackRoutes[keyof AdStackRoutes];
  };
}

type AdData = ProductDto & {
  payment_methods: EnumPaymentMethod[];
  images: ImageInfo[];
};

// Definindo as rotas do Stack Navigator
export type AdStackRoutes = {
  adDetails: { adData: AdData, isEditFlow?: boolean };
  adForm: { type: "ADD" | "EDIT" };
}

type CombinedRoutes = AppRoutes & AdStackRoutes;

export type AppNavigatorRoutesProps = BottomTabNavigationProp<CombinedRoutes>;

// Criando um BottomTabNavigator para as abas principais
const Tab = createBottomTabNavigator<AppRoutes>();

// Criando um NativeStackNavigator para abas secundarias
const Stack = createNativeStackNavigator<AdStackRoutes>();

const AdStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="adDetails" component={AdDetails} />
      <Stack.Screen name="adForm" component={AdForm} />
    </Stack.Navigator>
  );
}

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"];
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.gray600,
        tabBarInactiveTintColor: tokens.colors.gray400,
        tabBarStyle: {
          backgroundColor: tokens.colors.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["10"],
          paddingTop: tokens.space["6"],
          display: "flex"
        },
        tabBarItemStyle: {
          paddingVertical: tokens.space["2"]
        }
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon as={House} color={color} size="xl" />
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => <Icon as={Tag} color={color} size="xl" />
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="adStack"
        component={AdStack}
        options={{
          tabBarButton: () => null, 
          tabBarStyle: { display: "none" } // Oculta a barra
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="signOut"
        component={Home}
        options={{
          tabBarIcon: () =>
            <ExitIcon fill={tokens.colors.red400} width={iconSize} height={iconSize} onPress={handleSignOut} />
        }}
      />
    </Tab.Navigator>
  );
}