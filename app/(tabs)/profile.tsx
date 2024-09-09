const cameraRef = useRef(null);
import Fab from "@/components/fab";
import Grid from "@/components/grid";
import TopBar from "@/components/navigation/topbar";
import { useRef, useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Camera from "@/components/camera";

const Profile = () => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    images: null,
  });

  const pickImage = async () => {
    setLoading(true);
    // No permissions request is necessary for launching the image library
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
        const images = data.images;
        //@ts-ignore
        if (!result.canceled) {
          setData((v: any) => ({ ...v, images: result.assets[0] }));
        }
        setLoading(false);
      }
    }, 3000);
  };

  const onCapture = (photo: any) => {
    //@ts-ignore
    setData((v: any) => ({ ...v, images: photo.uri }));
  };

  return (
    <>
      <Grid>
        <Grid>
          <TopBar title={"Perfil"} />
        </Grid>
        <Grid style={styles.containerImage}>
          <Grid>
            {data.images ? (
              <Avatar.Image source={data.images} size={230} />
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
          <TextInput label="Nome" />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput label="Sobrenome" />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput label="Usuário" />
        </Grid>
        <Grid style={{ padding: 20 }}>
          <TextInput label="Email" />
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
