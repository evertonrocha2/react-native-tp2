import "react-native-reanimated";

import { Slot } from "expo-router";
import { SessionProvider, useSession } from "./ctx";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/constants/Theme";
import { useStorageState } from "./useStorageState";
import { createTableUser } from "@/services/database";
import { useEffect } from "react";

export default function RootLayout() {
  const themeType = useColorScheme();
  const [[isLoading, theme], setTheme] = useStorageState("theme");
  console.log(theme);

  const themeJson = {
    dark: darkTheme,
    light: lightTheme,
  };
  console.log(theme);

  useEffect(() => {
    createTableUser();
  });

  return (
    <PaperProvider
      theme={
        theme === "auto"
          ? themeType === "dark"
            ? themeJson["dark"]
            : themeJson["light"] //@ts-ignore
          : themeJson[theme]
      }
    >
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </PaperProvider>
  );
}
