import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { Home } from '@screens/Home';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {fontsLoaded ? <Home /> : <Loading />} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
