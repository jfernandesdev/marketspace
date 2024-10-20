import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, View } from "@gluestack-ui/themed";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeft, Plus, PenLine } from "lucide-react-native";
import { ProductDto } from "@dtos/ProductDto";
import { useAuth } from "@hooks/useAuth";

type ScreenHeaderProps = {
  title?: string;
  showBackButton?: boolean;
  showAddButton?: boolean;
  showEditButton?: boolean;
  onEditPress?: () => void;
  adData?: ProductDto;
}

export function ScreenHeader({ 
  title,
  showBackButton,
  showAddButton,
  showEditButton,
  onEditPress,
  adData
}: ScreenHeaderProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();

  const handleFormAd = (type: "ADD" | "EDIT") => {
    navigation.navigate("adStack", {
      screen: "adForm",
      params: { type, adData }
    });
  }

  const handleGoBack = () => {
    const state = navigation.getState();
    const currentRoute = state.routes[state.index];

    if (currentRoute.params && 'adData' in currentRoute.params && currentRoute.params.adData) {
      const adData = currentRoute.params.adData;

      if (adData.user_id === user.id) {
        navigation.navigate("myAds");
      } else {
        navigation.navigate("home");
      }
    } else {
      navigation.navigate("home");
    }
  }

  return(
    <HStack justifyContent="space-between" alignItems="center" px="$8" pt="$16" pb="$4" >
      {showBackButton ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} size="xl" />
        </TouchableOpacity>
      ) : <View />}

      {title ? <Heading>{title}</Heading> : <View />}

      {showAddButton && (
        <TouchableOpacity onPress={() => handleFormAd("ADD")}>
        <Icon as={Plus} size="xl" />
        </TouchableOpacity>
      )}

      {showEditButton && (
        <TouchableOpacity onPress={onEditPress}>
          <Icon as={PenLine} size="xl" />
        </TouchableOpacity>
      )}

      {(!showAddButton && !showEditButton) && <View />}
    </HStack>
  );
}