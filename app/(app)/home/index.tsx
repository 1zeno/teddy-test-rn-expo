import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import HomeIcon from "@/assets/icons/home.svg";

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<HomeIcon width={20} height={20} fill="#EE7D46" />
			<View style={styles.container}>
				<Text style={styles.title}>Home</Text>
				<Link href="/users">Users</Link>
			</View>
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
