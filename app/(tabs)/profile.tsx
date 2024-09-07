import Fab from "@/components/fab";
import Grid from "@/components/grid";
import TopBar from "@/components/navigation/topbar";
import { useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";

const Profile = () => {
  const [image, setImage] = useState(null);
  return (
    <>
      <Grid>
        <Grid>
          <TopBar title={"Perfil"} />
        </Grid>
        <Grid style={styles.containerImage}>
          <Grid>
            {image ? (
              <Avatar.Image
                source={require("../../assets/images/icon.jpg")}
                size={230}
              />
            ) : (
              <Avatar.Icon icon="account" size={230} />
            )}
            <Fab icon="camera" style={{ ...styles.fab, ...styles.left }} />
            <Fab icon="image" style={{ ...styles.fab, ...styles.right }} />
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
          <Button style={{ marginTop: 20 }} mode="contained">
            Salvar
          </Button>
        </Grid>
      </Grid>
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
