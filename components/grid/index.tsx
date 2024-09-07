import { View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
interface GridProps {
  children: React.ReactNode;
  [key: string]: any; // Permite outras props
}
const Grid = ({ children, ...props }: GridProps) => {
  const colors = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.colors.background,
        color: colors.colors.onBackground,
        ...props.style,
      }}
    >
      {children}
    </View>
  );
};

export default Grid;
