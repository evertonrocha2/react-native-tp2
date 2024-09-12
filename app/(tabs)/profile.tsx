import Fab from "@/components/fab";
import Grid from "@/components/grid";
import TopBar from "@/components/navigation/topbar";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Camera from "@/components/camera";
import { select, update } from "@/services/database";
import { UserInterface } from "@/interfaces/User";
import Snackbar from "@/components/snackbar";

const Profile = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserInterface>({
    //@ts-ignore
    photoURL: null,
  });

  const _update = async () => {
    await update("user", data, data.uid);
    setMessage("Dados atualizados com sucesso!");
  };

  const getUser = async () => {
    const d = await select(
      "user",
      [
        "uid",
        "emailVerified",
        "username",
        "displayName",
        "email",
        "photoURL",
        "phoneNumber",
        "createdAt",
      ],
      //@ts-ignore
      null,
      false
    );

    setData((v) => ({
      ...v,
      //@ts-ignore
      ...d,
    }));
    console.log(d);
  };

  useEffect(() => {
    getUser();
  }, []);

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setData((v: any) => ({
        ...v,
        photoURL: result.assets[0].uri,
      }));
    }
  };

  const onCapture = (photo: any) => {
    //@ts-ignore
    setData((v: any) => ({ ...v, image: photo.uri }));
  };

  return (
    <>
      <Grid>
        <Grid>
          <TopBar title={"Perfil"} />
        </Grid>
        <Grid style={styles.containerImage}>
          <Grid>
            {data?.photoURL ? (
              <Avatar.Image source={{ uri: data.photoURL }} size={230} />
            ) : (
              <Avatar.Icon icon="account" size={230} />
            )}
            <Fab
              onPress={() => setCameraVisible(true)}
              icon="camera"
              style={{ ...styles.fab, ...styles.left }}
            />
            <Fab
              onPress={pickImage}
              icon="image"
              style={{ ...styles.fab, ...styles.right }}
            />
          </Grid>
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput
            onChangeText={(text: string) =>
              setData((v) => ({ ...v, displayName: text }))
            }
            label="Nome"
            value={data.displayName}
          />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput
            label="Usuário"
            value={data.username}
            //@ts-ignore
            onChangeText={(text: string) =>
              setData((v) => ({ ...v, username: text }))
            }
          />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput label="Email" value={data.email} disabled />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <Button onPress={_update} style={{ marginTop: 20 }} mode="contained">
            Salvar
          </Button>
        </Grid>
        <Snackbar
          visible={message !== null}
          onDismiss={() => setMessage(null)}
          duration={5000}
          text={message}
        />
      </Grid>
      {cameraVisible ? (
        <Camera
          //@ts-ignore
          onCapture={onCapture}
          setCameraVisible={setCameraVisible}
          ref={cameraRef}
        />
      ) : null}
    </>
  );
};

const styles = {
  containerImage: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginTop: 50,
    positiion: "relative",
  },
  fab: {
    position: "absolute",
    borderRadius: 200,
    bottom: 0,
  },
  right: {
    right: 0,
  },
  left: {
    left: 0,
  },
};

export default Profile;
