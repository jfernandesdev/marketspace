import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, View } from "@gluestack-ui/themed";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeft, Plus, PenLine } from "lucide-react-native";

type ScreenHeaderProps = {
  title?: string;
  showBackButton?: boolean;
  showAddButton?: boolean;
  showEditButton?: boolean;
}

export function ScreenHeader({ 
  title,
  showBackButton,
  showAddButton,
  showEditButton
}: ScreenHeaderProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleFormAd = (type: "ADD" | "EDIT") => {
    navigation.navigate("adStack", {
      screen: "adForm",
      params: { type }
    });
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

  return(
    <HStack pt="$16" justifyContent="space-between" alignItems="center" px="$8">
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
        <TouchableOpacity onPress={() => handleFormAd("EDIT")}>
          <Icon as={PenLine} size="xl" />
        </TouchableOpacity>
      )}

      {(!showAddButton && !showEditButton) && <View />}
    </HStack>
  );
}