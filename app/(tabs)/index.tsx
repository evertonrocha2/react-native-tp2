import { View } from "react-native";

import Fab from "@/components/fab";
import ProgressBar from "@/components/progressbar";
import { Button, MD3Colors, PaperProvider, Text } from "react-native-paper";
import Checkbox from "@/components/checkbox";
import { useState } from "react";
import Radio from "@/components/radio";
import Snackbar from "@/components/snackbar";
import Tooltip from "@/components/tooltip";
import Switch from "@/components/switch";
import TopBar from "@/components/navigation/topbar";

export default function HomeScreen() {
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState("first");

  return (
    <View>
      <View>
        <TopBar title={"Titulo"} />
      </View>
    </View>
  );
}
