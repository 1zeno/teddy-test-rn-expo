import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardHome from "@/components/CardUsers";
import { useState } from "react";
import {Picker} from "@react-native-picker/picker";
import Pagination from "@/components/Pagination";

export default function UsersScreen() {
	const [selectedValue, setSelectedValue] = useState("java");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(12);

	const handlePage = (page: number) => {
		setCurrentPage(page);
	}

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={{...styles.text, ...styles.strongText}}>2</Text>
				<Text style={styles.text}> clientes encontrados:</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.text}>Clientes por página:</Text>
				<Picker
					selectedValue={selectedValue}
					onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
					style={{ height: 50, width: 100 }}
				>
					<Picker.Item label="5" value="5" />
					<Picker.Item label="10" value="10" />
					<Picker.Item label="15" value="15" />
					<Picker.Item label="20" value="20" />
				</Picker>
			</View>
			<CardHome />
			<CardHome />
			<TouchableOpacity style={styles.button} onPress={()=>console.log("criar")}>
				<Text style={styles.buttonText}>Criar cliente</Text>
			</TouchableOpacity>
			<Pagination
				currentPage={currentPage}
				total={totalPages}
				handlePage={handlePage}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		padding: 20,
		gap: 10,
	},
	infoContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontSize: 18,
	},
	strongText: {
		fontWeight: "bold",
	},
	paginationText: {
		fontSize: 14,
	},
	button: {
		width: "100%",
		borderColor: "#EC6724",
		borderWidth: 2,
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 4,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#EC6724",
	},
	paginationContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	paginationSelectedItem: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: "#EC6724",
		borderRadius: 4,
	},
	paginationSelectedItemText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	paginationItem: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
});
