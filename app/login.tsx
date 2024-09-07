import { Text } from "react-native";
import { useSession } from "./ctx";
import { Avatar, Button, TextInput, useTheme } from "react-native-paper";
import { Link, router } from "expo-router";
import { useState } from "react";
import Grid from "@/components/grid";

const Login = () => {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);
  const colors = useTheme();

  return (
    <>
      <Grid
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={208}
          style={{ marginBottom: 30 }}
          source={require("../assets/images/icon.jpg")}
        />
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: colors.colors.onBackground,
          }}
        >
          Entre no seu App!
        </Text>
        <Grid
          style={{
            ...styles.container,
            padding: styles.padding,
          }}
        >
          <Text style={{ color: colors.colors.onBackground }}>Email</Text>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </Grid>
        <Grid
          style={{
            ...styles.container,
            padding: styles.padding,
          }}
        >
          <Text style={{ color: colors.colors.onBackground }}>Senha</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Grid>
        <Button
          mode="contained"
          onPress={() => {
            signIn();
            router.navigate("/(tabs)");
          }}
        >
          Login
        </Button>
        <Link
          style={{
            fontSize: 12,
            marginTop: 30,
            color: colors.colors.onBackground,
          }}
          href="/register"
        >
          Não tem uma conta? Cadastre-se
        </Link>
        <Link
          style={{
            fontSize: 12,
            marginTop: 30,
            color: colors.colors.onBackground,
          }}
          href="/forgot-password"
        >
          Esqueci minha senha
        </Link>
      </Grid>
    </>
  );
};

const styles = {
  container: {
    width: "100%",
    justifyContent: "center",
  },
  padding: 16,
};

export default Login;
