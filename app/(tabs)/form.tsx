import Grid from "@/components/grid";
import TopBar from "@/components/navigation/topbar";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import Dialog from "@/components/dialog";
import Snackbar from "@/components/snackbar";
import Camera from "@/components/camera";

export default function Form() {
  const params = useLocalSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [imageToDelete, setImageToDelete] = useState([]);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  const onCapture = (photo: any) => {
    const images = data.images;
    //@ts-ignore
    images.push(photo.uri);
    updateImages(images);
  };

  const [data, setData] = useState({
    id: null,
    title: "",
    description: "",
    images: [],
  });
  const pickImage = async () => {
    setLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setTimeout(() => {
      if (!result.canceled) {
        const images = data.images;
        //@ts-ignore
        images.push(result.assets[0].uri);
        setData((v: any) => ({ ...v, images: images }));
        updateImages(images);
        setLoading(false);
      }
    }, 3000);
  };

  const updateImages = (images: string[]) => {
    setData((v: any) => ({ ...v, images: images }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    //@ts-ignore
    params.id = 1;
    if (params.id) {
      setData((v: any) => ({
        ...v,
        id: params.id,
        title: params.title,
        description: params.description,
        images: [],
      }));
    }
  };

  return (
    <>
      <Grid style={{ height: "100%", width: "100%" }}>
        <ScrollView>
          <Grid>
            <TopBar title={"Novo Item"} back={true} menu={false} />
          </Grid>
          <Grid style={{ marginTop: 30, padding: 20 }}>
            <Text
              style={{ fontSize: 30, letterSpacing: -2, textAlign: "center" }}
            >
              {data.id ? "Cadastrar Item" : "Editar Item"}
            </Text>
          </Grid>

          <Grid style={{ marginTop: 30, padding: 20 }}>
            <TextInput
              label="Título"
              value={data.title}
              onChangeText={(text) => {
                setData({ ...data, title: text });
              }}
            />
          </Grid>
          <Grid style={{ marginTop: 30, padding: 20 }}>
            <TextInput
              label="Descrição"
              multiline={true}
              numberOfLines={5}
              value={data.description}
              onChangeText={(text) => {
                setData({ ...data, description: text });
              }}
            />
          </Grid>
          <Grid style={{ marginTop: 0, padding: 20 }}>
            <Text style={{ fontSize: 30, letterSpacing: -2 }}>Galeria</Text>
            <Grid
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 4,
              }}
            >
              {loading ? (
                <Button loading={true}>Carregando...</Button>
              ) : (
                <>
                  {data.images.map((image: string, index: number) => (
                    <Grid key={index} style={{ width: "32%" }}>
                      <Grid style={{ width: "100%" }}>
                        <Card.Cover
                          style={{ height: 130 }}
                          source={{ uri: image }}
                        />
                        <IconButton
                          icon={"close"}
                          onPress={() => {
                            setDialogVisible(true);
                            //@ts-ignore
                            setImageToDelete(index);
                          }}
                          style={{
                            position: "absolute",
                            top: -15,
                            zIndex: 10,
                            right: -15,
                            backgroundColor: "white",
                          }}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Button
              icon="camera"
              style={{ borderRadius: 0 }}
              mode="contained"
              onPress={() => {
                setCameraVisible(true);
              }}
            >
              Tirar Foto
            </Button>
            <Button
              style={{ borderRadius: 0 }}
              icon="image"
              mode="contained"
              onPress={pickImage}
            >
              Galeria
            </Button>
          </Grid>
          <Grid style={{ padding: 20 }}>
            <Button
              style={{ marginTop: 20 }}
              mode="contained"
              onPress={() => {}}
            >
              {data.id ? "Editar" : "Cadastrar"}
            </Button>
          </Grid>
        </ScrollView>
        <Dialog
          icon={"alert"}
          title={"Excluir Imagem"}
          text={"Deseja realmente excluir esta imagem?"}
          visible={dialogVisible}
          setVisibility={setDialogVisible}
          onDismiss={() => setDialogVisible(false)}
          actions={[
            {
              text: "Cancelar",
              onPress: () => {
                setDialogVisible(false);
                //@ts-ignore
                setImageToDelete(null);
                setMessage("Ação cancelada!");
              },
            },
            {
              text: "Excluir",
              onPress: () => {
                const images = data.images;
                //@ts-ignore
                images.splice(imageToDelete, 1);
                updateImages(images);
                //@ts-ignore
                setImageToDelete(null);
                setDialogVisible(false);
                setMessage("Imagem Excluida!");
              },
            },
          ]}
        />
        {cameraVisible ? (
          <Camera
          //@ts-ignore
            onCapture={onCapture}
            setCameraVisible={setCameraVisible}
            ref={cameraRef}
          />
        ) : null}
        <Snackbar
          text={message}
          visible={message !== null}
          onDismiss={() => setMessage(null)}
        />
      </Grid>
    </>
  );
}
