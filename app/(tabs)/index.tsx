import { View } from "react-native";
import TopBar from "@/components/navigation/topbar";
import Fab from "@/components/fab";
import { router } from "expo-router";
import { select } from "@/services/database";
import { useEffect } from "react";

export default function HomeScreen() {
  return (
    <View>
      <View>
        <TopBar title={"Titulo"} />
        <Fab icon="plus" onPress={() => router.navigate("/form")} />
      </View>
    </View>
  );
}
