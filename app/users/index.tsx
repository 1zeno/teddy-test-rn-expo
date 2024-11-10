import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

export default function UsersScreen() {
	return (
		<>
			<Text style={styles.title}>Users</Text>
			<Link
				href={{
					pathname: "/users/[id]",
					params: { id: 10 },
				}}>
				View user details
			</Link>
		</>
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
