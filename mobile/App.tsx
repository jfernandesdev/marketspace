import { StatusBar } from "expo-status-bar";
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui";

import { Loading } from "@components/Loading";
import { Home } from "@screens/Home";
import { Login } from "@screens/Login";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {fontsLoaded ? <Login /> : <Loading />} 
    </GluestackUIProvider>
  );
}