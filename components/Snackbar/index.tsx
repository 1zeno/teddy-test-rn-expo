import { StyleSheet, View, Text } from "react-native";

interface IProps {
    text: string;
    status: string;
}

export default function Snackbar(props: IProps) {
    if(!props.text || !props.status){
        return null;
    }
    return (
        <View style={[styles.container, props.status === "error" && {backgroundColor: "#FF5722"}]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "#4CAF50",
        top: "88%",
        left: "10%",
        right: "10%",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        flexDirection: "row",
    },
    text: {
        color: "#F5F5F5",
        fontSize: 14,
        flexWrap: "wrap",
    },
    header: {
        position: "absolute",
        right: 10,
    },
});
