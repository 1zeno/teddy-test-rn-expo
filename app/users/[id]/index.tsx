import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BaseLayout from "@/components/BaseLayout";

export default function UserScreen() {
	const { id } = useLocalSearchParams();
	console.log("id:", id);
	return (
		<BaseLayout>
			<View style={styles.container}>
				<Text style={styles.title}>Users</Text>
			</View>
		</BaseLayout>
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
