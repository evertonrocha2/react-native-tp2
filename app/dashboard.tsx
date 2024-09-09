import Fab from "@/components/fab";
import TopBar from "@/components/navigation/topbar";
import { router } from "expo-router";
import { Button } from "react-native-paper";

const Dashboard = () => {
  return (
    <>
      <TopBar title={"Dashboard"} />
      <Fab icon="plus" onPress={() => router.push("/form")} />
    </>
  );
};

export default Dashboard;
