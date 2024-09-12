import { router } from "expo-router";
import { save } from "./database";
import {
  getAuth,
  IdTokenResult,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { UserInterface } from "@/interfaces/User";

const isLoggedIn = async () => {
  return true;
};

const login = async (email: string, password: string, setSession: any) => {
  //@ts-ignore
  const auth = getAuth();
  try {
    const response: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user: any = response.user.toJSON();
    const token: IdTokenResult = await response.user.getIdTokenResult(true);
    setSession(token.token);
    const _user: UserInterface = {
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      username: user.username,
      displayName: user.displayName,
      emailVerified: user.emailVerified.toString(),
      sync: 1
    };

    await save("user", _user);
    //@ts-ignore
    return router.replace("/(tabs)");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { isLoggedIn, login };
