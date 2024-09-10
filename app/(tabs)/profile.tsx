const cameraRef = useRef(null);
import Fab from "@/components/fab";
import Grid from "@/components/grid";
import TopBar from "@/components/navigation/topbar";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Camera from "@/components/camera";
import { select } from "@/services/database";

const Profile = () => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const [data, setData] = useState<UserInterface>({
    //@ts-ignore
    photoURL: null,
  });

  const getUser = async () => {
    //@ts-ignore
    const d = await select("user", [
      "uid",
      "email",
      "displayName",
      "photoURL",
      "phoneNumber",
      "createdAt",
      "emailVerified",
    ]);
    setData(d);
  };

  console.log(data);

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
    setTimeout(() => {
      if (!result.canceled) {
        const photoURL = data.photoURL;
        //@ts-ignore
        if (!result.canceled) {
          setData((v: any) => ({ ...v, photoURL: result.assets[0] }));
        }
        setLoading(false);
      }
    }, 3000);
  };

  const onCapture = (photo: any) => {
    //@ts-ignore
    setData((v: any) => ({ ...v, photoURL: photo.uri }));
  };

  return (
    <>
      <Grid>
        <Grid>
          <TopBar title={"Perfil"} />
        </Grid>
        <Grid style={styles.containerImage}>
          <Grid>
            {data.photoURL ? (
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
          <TextInput label="Nome" value={data.displayName} />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput label="Usuário" value={data.username} />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput label="Email" value={data.email} />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <Button loading={loading} style={{ marginTop: 20 }} mode="contained">
            Salvar
          </Button>
        </Grid>
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
