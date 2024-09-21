import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { gluestackUIConfig } from "@gluestack-ui";
import { Box } from "@gluestack-ui/themed";

import { Loading } from "@components/Loading";

import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.gray200;

  return (
    <Box flex={1} bg="$gray200">
      <NavigationContainer theme={theme}>
          <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}