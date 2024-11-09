import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<Link href="/home">Home</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
