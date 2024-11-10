import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function CardUsers() {
	return (
			<View style={styles.container}>
				<Text style={{...styles.title, ...styles.strongText}}>Eduardo</Text>
				<Text style={styles.text}>Salário: R$3.500,00</Text>
				<Text style={styles.text}>Empresa: R$120.000,00</Text>
				<View style={styles.iconContainer}>
					<TouchableOpacity>
						<Entypo name="plus" size={20} />
					</TouchableOpacity>
					<TouchableOpacity>
						<MaterialCommunityIcons name="pencil-outline" size={20} />
					</TouchableOpacity>
					<TouchableOpacity>
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
		width: "100%",
		alignItems: "center",
		gap: 4,
		paddingVertical: 10,
		borderRadius: 4,
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
