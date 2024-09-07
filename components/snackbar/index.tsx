import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar as PaperSnackbar } from "react-native-paper";

const Snackbar = (props: any) => {
  return (
    <View style={styles.container}>
      <PaperSnackbar {...props}>{props.text}</PaperSnackbar>
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
