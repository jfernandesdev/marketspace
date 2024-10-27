import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, View } from "@gluestack-ui/themed";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeft, PenLine } from "lucide-react-native";

import { useAd } from "@hooks/useAd";

type ScreenHeaderProps = {
  title?: string;
  showBackButton?: boolean;
  showEditButton?: boolean;
  onEditPress?: () => void;
  onResetForm?: () => void;
}

export function ScreenHeader({ 
  title,
  showBackButton,
  showEditButton,
  onEditPress,
  onResetForm
}: ScreenHeaderProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { clearAdData } = useAd();

  const handleGoBack = () => {
    clearAdData();

    if (onResetForm) {
      onResetForm();
    }

    navigation.navigate("home");
  }

  return(
    <HStack justifyContent="space-between" alignItems="center" px="$8" pt="$16" pb="$4" >
      {showBackButton ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} size="xl" />
        </TouchableOpacity>
      ) : <View />}

      {title ? <Heading>{title}</Heading> : <View />}

      {showEditButton && (
        <TouchableOpacity onPress={onEditPress}>
          <Icon as={PenLine} size="xl" />
        </TouchableOpacity>
      )}

      {(!showEditButton) && <View />}
    </HStack>
  );
}