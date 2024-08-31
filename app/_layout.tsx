import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { Slot } from "expo-router";
import { SessionProvider } from "./ctx";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/constants/Theme";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useColorScheme();
  console.log(theme);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </PaperProvider>
  );
}
