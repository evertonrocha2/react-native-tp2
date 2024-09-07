import { IconButton as IconPaper, useTheme } from "react-native-paper";

const IconButton = () => {
  const colors = useTheme();
  return (
    <IconPaper
      icon="camera"
      iconColor={colors.colors.primary}
      size={20}
      onPress={() => console.log("Pressed")}
    />
  );
};

export default IconButton;
