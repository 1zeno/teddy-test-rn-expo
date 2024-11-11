import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IUser } from "@/api/users";
import { maskPrice } from "@/utils";
import { Link } from "expo-router";
import { useCallback } from "react";

interface IProps {
	user: IUser;
	selectedIds: number[];
	onDelete: (name: string, id: number) => void;
	onSelectUser: (user: IUser) => void;
	onRemoveUser: (id: number) => void;
}

export default function CardUsers({
	user, onDelete, onSelectUser,
	selectedIds, onRemoveUser,
}: IProps) {

	const isSelected = selectedIds.includes(user.id);
	const handleSelectedUsers = useCallback(() => {
		if(isSelected){
			onRemoveUser(user.id);
			return;
		}
		onSelectUser(user)
	}, [isSelected]);

	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, ...styles.strongText }}>{user.name}</Text>
			<Text style={styles.text}>Salário: {maskPrice(user.salary)}</Text>
			<Text style={styles.text}>Empresa: {maskPrice(user.companyValuation)}</Text>
			<View style={styles.iconContainer}>
				<TouchableOpacity onPress={() => handleSelectedUsers()}>
					<Entypo
						name={isSelected ? "minus" : "plus"}
						size={20}
					/>
				</TouchableOpacity>
				<Link href={{
					pathname: "/users/[id]/",
					params: { id: user.id }
				}}>
					<MaterialCommunityIcons name="pencil-outline" size={20} />
				</Link>
				<TouchableOpacity onPress={() => onDelete(user.name, user.id)}>
					<AntDesign name="delete" size={20} color="red" />
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
		justifyContent: "space-between",
		padding: 10,
	},
});
