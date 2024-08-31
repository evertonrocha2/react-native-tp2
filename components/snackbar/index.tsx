import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar as PaperSnackbar } from "react-native-paper";

const Snackbar = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? "Hide" : "Show"}</Button>
      <PaperSnackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {},
        }}
      >
        {children}
      </PaperSnackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default Snackbar;
