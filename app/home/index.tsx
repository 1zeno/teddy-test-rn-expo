import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	return (
		<>
			<SafeAreaView />
			<View style={styles.container}>
				<View style={styles.header}>
					<DrawerToggleButton />
				</View>
				<View style={styles.container}>
					<Text style={styles.title}>Home</Text>
					<Link href="/users">Users</Link>
				</View>
			</View>
		</>
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
