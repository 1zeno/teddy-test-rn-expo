import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Products</Text>
			<Link href="/users">Users</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		alignItems: "flex-end",
		paddingVertical: 10,
	},
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
