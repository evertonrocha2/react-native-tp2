import { FAB } from "react-native-paper";

const Fab = ({ ...props }: any) => {
  return <FAB icon={props.icon} style={{ ...props.style }} {...props} />;
};

export default Fab;
