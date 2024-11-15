
import { View, StyleSheet } from "react-native";
import { useAppContext } from "@/context/AppContext";

export default function Overlay() {

    const appContext = useAppContext();

    return (
        appContext.showOverlay && (
            <View style={styles.overlay} />
        )
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
});