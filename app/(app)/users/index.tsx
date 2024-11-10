import {
	StyleSheet, Text, TouchableOpacity,
	View, StatusBar, TextInput,
} from "react-native";
import CardHome from "@/components/CardUsers";
import { useState, useRef, useCallback } from "react";
import {Picker} from "@react-native-picker/picker";
import Pagination from "@/components/Pagination";
import {
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function UsersScreen() {
	const [selectedValue, setSelectedValue] = useState("java");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(12);
	const [disable, setDisable] = useState(false);

	const handlePage = useCallback((page: number) => {
		setCurrentPage(page);
	},[])
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
		StatusBar.setHidden(true, 'fade');
        bottomSheetModalRef.current?.present();
    }, []);
    const closeBottomSheet = useCallback(() => {
		bottomSheetModalRef.current?.close();
    }, []);

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
			<TouchableOpacity style={styles.button} onPress={handlePresentModalPress}>
				<Text style={styles.buttonText}>Criar cliente</Text>
			</TouchableOpacity>
            <BottomSheetModal
                ref={bottomSheetModalRef}
				onDismiss={()=>{
					StatusBar.setHidden(false, 'fade');
				}}
				handleStyle={{
					paddingTop: 20,
						backgroundColor: "#7A7A7A",
				}}
				handleIndicatorStyle={{
						backgroundColor: "#FFF",
				}}
                containerStyle={{
                    zIndex: 11,	
                }}
            >
                <BottomSheetView style={styles.contentContainer}>
					<View style={styles.titleContent}>
                    	<Text style={styles.createTextTitle}>Criar cliente</Text>
					</View>
					<View style={styles.fieldContainer}>
						<Text style={styles.label}>Nome</Text>
						<TextInput
							style={styles.input}
							placeholder="Digite o seu nome:"
							placeholderTextColor="#FFFFFF66"
						/>
					</View>
					<View style={styles.fieldContainer}>
						<Text style={styles.label}>Salário</Text>
						<TextInput
							style={styles.input}
							placeholder="Digite o salário:"
							placeholderTextColor="#FFFFFF66"
						/>
					</View>
					<View style={styles.fieldContainer}>
						<Text style={styles.label}>Valor da empresa</Text>
						<TextInput
							style={styles.input}
							placeholder="Digite o valor da empresa:"
							placeholderTextColor="#FFFFFF66"
						/>
					</View>
					<TouchableOpacity style={disable ? styles.disabledButton : styles.createButton} onPress={closeBottomSheet}>
						<Text style={disable ? styles.disabledText : styles.createButtonText}>Criar cliente</Text>
					</TouchableOpacity>
                </BottomSheetView>
            </BottomSheetModal>
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
	contentContainer: {
        flex: 1,
        alignItems: "center",
		backgroundColor: "#7A7A7A",
		gap: 20,
		padding: 16,
    },
	titleContent: {
		width: "100%",
		paddingVertical: 16,
	},
	createTextTitle: {
		fontSize: 18,
		color: "#FFF",
		fontWeight: "bold",
	},
	label: {
		fontSize: 14,
		color: "#FFF",
		paddingBottom: 4,
		fontWeight: "500",
	},
	input: {
		fontSize: 16,
		color: "#FFF",
		borderWidth: 2,
		borderColor: "#FFFFFF66",
		padding: 12,
		borderRadius: 12,
		fontWeight: "500",
	},
	fieldContainer: {
		width: "100%",
	},
	disabledButton: {
		width: "100%",
		backgroundColor: "#FFFFFF1A",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
	},
	disabledText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#7A7A7A"
	},
	createButton: {
		width: "100%",
		backgroundColor: "#EB6625",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
	},
	createButtonText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#FFF"
	}
});
