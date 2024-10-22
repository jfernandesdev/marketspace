import { createBottomTabNavigator, BottomTabNavigationProp, } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tag, House, User, Plus } from "lucide-react-native";

import { Platform, TouchableOpacity } from "react-native";
import { Icon } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "@gluestack-ui";

import { useAuth } from "@hooks/useAuth";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { AdDetails } from "@screens/AdDetails";
import { AdForm } from "@screens/AdForm";

import { ProductDto } from "@dtos/ProductDto";

import ExitIcon from "@assets/exit.svg";
import { Profile } from "@screens/Profile";
import { useNavigation } from "@react-navigation/native";
import { Notifications } from "@screens/Notifications";

// Definindo as rotas do Tab Navigator
type AppRoutes = {
  home: undefined;
  myAds: undefined;
  profile: undefined;
  signOut: undefined;
  notifications: undefined;
  adStack: {
    screen: keyof AdStackRoutes;
    params?: AdStackRoutes[keyof AdStackRoutes];
  };
}

// Definindo as rotas do Stack Navigator
export type AdStackRoutes = {
  adDetails: { 
    adData: ProductDto,
    isEditFlow?: boolean 
};
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
  const navigation = useNavigation<AppNavigatorRoutesProps>();


  const handleSignOut = async () => {
    await signOut();
  }

  const handleCreateAd = () => {
    navigation.navigate("adStack", {
      screen: "adForm",
      params: { type: "ADD" }
    });
  };

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
          tabBarStyle: { display: "none" },
          tabBarButton: () => (
            <TouchableOpacity
              onPress={handleCreateAd}
              activeOpacity={1}
              style={{
                bottom: Platform.OS === "android" ? 45 : 50,
                height: 55,
                width: 55,
                borderRadius: 30,
                borderWidth: 5,
                borderColor: tokens.colors.gray200,
                backgroundColor: tokens.colors.gray600,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Plus color={tokens.colors.white} size={iconSize * 1} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Icon as={User} color={color} size="xl" />
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

     
      <Tab.Screen
        name="notifications"
        component={Notifications}
        options={{
          tabBarButton: () => null, 
          tabBarStyle: { display: "none" } // Oculta a barra
        }}
      ></Tab.Screen>

    </Tab.Navigator>
  );
}