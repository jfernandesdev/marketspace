import { createBottomTabNavigator, BottomTabNavigationProp, } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Icon } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "@gluestack-ui";

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from "./auth.routes";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { AdDetails } from "@screens/AdDetails";
import { AdForm } from "@screens/AdForm";

import ExitIcon from "@assets/exit.svg";
import { Tag, House } from "lucide-react-native";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  adDetails: undefined;
  adForm: undefined;
  signOut: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"];

  // const navigationAuth = useNavigation<AuthNavigatorRoutesProps>();

  const handleSignOut = () => {
    //todo
    console.log("signOut");
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.gray600,
        tabBarInactiveTintColor: tokens.colors.gray200,
        tabBarStyle: {
          backgroundColor: tokens.colors.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["10"],
          paddingTop: tokens.space["6"]
        },
        tabBarItemStyle: {
          paddingVertical: tokens.space["2"]
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon as={House} color={color} size="xl" />
        }}
      ></Screen>

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => <Icon as={Tag} color={color} size="xl" />
        }}
      ></Screen>

      <Screen
        name="adDetails"
        component={AdDetails}
        options={{
          tabBarButton: () => null
        }}
      ></Screen>

      <Screen
        name="adForm"
        component={AdForm}
        options={{
          tabBarButton: () => null
        }}
      ></Screen>

      <Screen
        name="signOut"
        component={Home}
        options={{
          tabBarIcon: () =>
            <ExitIcon fill={tokens.colors.red400} width={iconSize} height={iconSize} onPress={handleSignOut} />
        }}
      />
    </Navigator>
  );
}