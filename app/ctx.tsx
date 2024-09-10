import { useContext, createContext, type PropsWithChildren } from "react";
import { setStorageItemAsync, useStorageState } from "./useStorageState";
import { FirebaseApp, initializeApp } from "firebase/app";
import { login } from "@/services/auth";
import * as SQLite from "expo-sqlite";


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const AuthContext = createContext<{
  signIn: (email: string, senha: string) => void;
  signOut: () => void;
  firebaseApp?: FirebaseApp | null;
  changeTheme: (theme: string) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (email: string, senha: string) => null,
  signOut: () => null,
  firebaseApp: firebaseApp,
  session: null,
  isLoading: false,
  changeTheme: (theme: string) => null,
  //@ts-ignore
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, senha: string) => {
          return login(email, senha, setSession);
        },
        signOut: () => {
          setSession(null);
        },
        changeTheme: async (theme: string) => {
          await setStorageItemAsync("theme", theme);
        },
        firebaseApp: firebaseApp,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
