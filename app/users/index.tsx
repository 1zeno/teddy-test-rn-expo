import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function UsersScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Users</Text>
			<Link
				href={{
					pathname: "/users/[id]",
					params: { id: 10 },
				}}>
				View user details
			</Link>
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
