import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheetNavigation from "../BottomSheetNavigation";
import Header from "../Header";

interface IProps {
    children: React.ReactElement | React.ReactElement[];
}

export default function BaseLayout(props: IProps) {
    return (
        <>
            <SafeAreaView />
            <Header />
            <View style={styles.container}>
                {props.children}
            </View>
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
