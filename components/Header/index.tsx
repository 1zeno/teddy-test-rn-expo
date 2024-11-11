import { StyleSheet, View, Image, Platform } from "react-native";
import BottomSheetNavigation from "../BottomSheetNavigation";
import Logo from "@/assets/images/logo.png";

export default function Header() {
    return (
        <>
            <View style={styles.container}>
                <Image source={Logo} />
                <BottomSheetNavigation />
            </View>
            <View style={styles.shadowLine} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "#FFF",
        zIndex: 2,
    },
    shadowLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#ddd',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 1,
            },
        }),
    },
});
