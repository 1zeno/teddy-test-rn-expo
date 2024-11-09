import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function UsersLayout() {

	return (
		<Stack screenOptions={{ headerShown: true }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="[id]" />
		</Stack>
)
}