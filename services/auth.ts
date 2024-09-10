import { router } from "expo-router";
import { save } from "./database";
import {
  getAuth,
  IdTokenResult,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

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
    await save("user", {
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      accessToken: user.stsTokenManager.accessToken,
      refreshToken: user.stsTokenManager.refreshToken,
      expiresIn: user.stsTokenManager.expirationTime,
      createdAt: user.createdAt,
    });
    //@ts-ignore
    return router.replace("/(tabs)");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { isLoggedIn, login };
