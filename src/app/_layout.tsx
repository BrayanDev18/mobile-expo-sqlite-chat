import { useInitDb } from "@/expo-sqlite/db";
import {
  Barlow_300Light,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_700Bold,
  Barlow_900Black,
  useFonts,
} from "@expo-google-fonts/barlow";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../../global.css";
import "../utils/cssInterop";

export default function RootLayout() {
  const { success } = useInitDb();

  const [loaded] = useFonts({
    light: Barlow_300Light,
    regular: Barlow_400Regular,
    medium: Barlow_500Medium,
    bold: Barlow_700Bold,
    black: Barlow_900Black,
  });

  if (!success && !loaded) return;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
