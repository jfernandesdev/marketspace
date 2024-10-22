import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@gluestack-ui/themed";
import { Bell } from "lucide-react-native"; 
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type NotificationIconProps = {
  notificationsCount?: number;
};

export function NotificationIcon({ notificationsCount = 0 }: NotificationIconProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>(); // Obtendo a navegação

  const handlePress = () => {
    navigation.navigate("notifications"); 
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ position: "relative" }}>
      <Icon as={Bell} size="xl" color="$warmGray800" />

      {notificationsCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: -5,
            right: -2.5,
            backgroundColor: "#364D9D",
            borderRadius: 10,
            width: 14,
            height: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {notificationsCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
