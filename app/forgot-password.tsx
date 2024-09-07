import { Text, useColorScheme, View } from "react-native";
import { useSession } from "./ctx";
import {
  Avatar,
  Button,
  PaperProvider,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Link, router } from "expo-router";
import { useState } from "react";
import Grid from "@/components/grid";

const ForgotPassword = () => {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const colors = useTheme();
  return (
    <Grid
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
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
        Recupere sua senha
      </Text>
      <View
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
      </View>
      <Button
        mode="contained"
        onPress={() => {
          signIn();
          router.navigate("/(tabs)");
        }}
      >
        Enviar código de recuperação
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
        href="/login"
      >
        Fazer login
      </Link>
    </Grid>
  );
};

const styles = {
  container: {
    width: "100%",
    justifyContent: "center",
  },
  padding: 16,
};

export default ForgotPassword;
