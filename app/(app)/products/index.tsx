import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>Não há produto cadastrado.</Text>
				</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	emptyText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
