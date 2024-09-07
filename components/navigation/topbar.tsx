import AppBar from "../appbar";
import Menu from "./menu";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSession } from "@/app/ctx";
import { router } from "expo-router";

const TopBar = (props: any) => {
  const [visible, setVisible] = useState(false);
  const { signOut } = useSession();
  const navigation = useNavigation();

  return (
    <>
      <AppBar
        onPress={() => {
          if (props.back) {
            navigation.goBack();
          } else {
            setVisible(!visible);
          }
        }}
        back={props.back}
        title={props.title}
        icon={props.menu ? "dots-vertical" : ""}
      />
      {props.menu ? (
        <Menu
          visible={visible}
          setVisible={setVisible}
          items={[
            {
              title: "Settings",
              icon: "cog",
              onPress: () => {
                router.push("/settings");
              },
            },
            {
              title: "Logout",
              icon: "logout",
              onPress: () => {
                console.log("Logout");
                signOut();
              },
            },
          ]}
        />
      ) : null}
    </>
  );
};

TopBar.defaultProps = {
  menu: true,
  back: false,
};

export default TopBar;
