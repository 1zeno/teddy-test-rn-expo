import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IUser } from "@/api/users";
import { colors, maskPrice } from "@/utils";
import { Link } from "expo-router";
import { useCallback } from "react";

interface IProps {
	user: IUser;
	onRemoveUser: (id: number) => void;
}

export default function CardUserSelected({
	user, onRemoveUser,
}: IProps) {

	const handleSelectedUsers = useCallback(() => {
		onRemoveUser(user.id);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, ...styles.strongText }}>{user.name}</Text>
			<Text style={styles.text}>Salário: {maskPrice(user.salary)}</Text>
			<Text style={styles.text}>Empresa: {maskPrice(user.companyValuation)}</Text>
			<View style={styles.iconContainer}>
				<TouchableOpacity onPress={() => handleSelectedUsers()}>
					<Entypo
						name={"minus"}
						size={20}
						color={colors.orange}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	strongText: {
		fontWeight: "bold",
	},
	container: {
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		gap: 4,
		paddingVertical: 10,
		borderRadius: 4,
		marginBottom: 20,
	},
	text: {
		fontSize: 14,
	},
	title: {
		fontSize: 16,
	},
	iconContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		padding: 10,
	},
});
