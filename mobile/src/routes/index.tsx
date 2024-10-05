import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { gluestackUIConfig } from "@gluestack-ui";
import { Box } from "@gluestack-ui/themed";

import { useAuth } from "@hooks/useAuth";

import { Loading } from "@components/Loading";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.gray200;

  if (isLoadingUserStorageData) {
    return <Loading />
  }
  
  return (
    <Box flex={1} bg="$gray200">
      <NavigationContainer theme={theme}>
        { user.id ? <AppRoutes /> : <AuthRoutes /> }
      </NavigationContainer>
    </Box>
  )
}