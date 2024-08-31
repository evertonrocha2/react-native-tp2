import { Text, View } from "react-native";
import { useSession } from "./ctx";
import { Button } from "react-native-paper";
import { router } from "expo-router";

const Login = () => {
  const { signIn } = useSession();

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        Login
      </Text>
      <Button
        onPress={() => {
          signIn();
          router.navigate("/(tabs)");
        }}
      >
        Login
      </Button>
    </View>
  );
};

export default Login;
