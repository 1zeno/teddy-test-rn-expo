import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import Snackbar from "../Snackbar";
import { useAppContext } from "@/context/AppContext";

interface IProps {
    children: React.ReactElement | React.ReactElement[];
}

export default function BaseLayout(props: IProps) {
    const appContext = useAppContext();
    
    return (
        <>
            <SafeAreaView />
            <Header />
            <View style={styles.container}>
                {props.children}
            </View>
            <Snackbar
                text={appContext.message.text}
                status={appContext.message.status}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
