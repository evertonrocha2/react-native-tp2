import Grid from "@/components/grid";
import TopBar from "@/components/navigation/topbar";
import Radio from "@/components/radio";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSession } from "./ctx";
import { router } from "expo-router";

const Settings = () => {
  const { changeTheme, signOut } = useSession();
  const [checked, setChecked] = useState("auto");
  const colors = useTheme();
  useEffect(() => {
    changeTheme(checked);
  }, [checked]);

  useEffect(() => {
    setChecked(checked === null ? "auto" : checked);
    console.log(checked);
  }, []);
  return (
    <>
      <TopBar
        back={true}
        menu={false}
        title={"Settings"}
        onPress={() => {
          router.back();
        }}
      />
      <Grid>
        <View
          style={{
            display: "flex",
            gap: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Radio
            value="auto"
            status={checked === "auto" ? "checked" : "unchecked"}
            onPress={() => setChecked("auto")}
          />
          <Text style={{ color: colors.colors.onBackground }}>Automático</Text>
        </View>
        <View
          style={{
            display: "flex",
            gap: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Radio
            value="light"
            status={checked === "light" ? "checked" : "unchecked"}
            onPress={() => setChecked("light")}
          />
          <Text style={{ color: colors.colors.onBackground }}>Light</Text>
        </View>
        <View
          style={{
            display: "flex",
            gap: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Radio
            value="dark"
            status={checked === "dark" ? "checked" : "unchecked"}
            onPress={() => setChecked("dark")}
          />
          <Text style={{ color: colors.colors.onBackground }}>Dark</Text>
        </View>
      </Grid>
    </>
  );
};

export default Settings;
