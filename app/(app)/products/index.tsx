import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.emptyText}>Não há produto cadastrado.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		padding: 20,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
