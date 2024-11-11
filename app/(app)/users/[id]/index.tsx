import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { EDIT_USER, GET_USER_BY_ID, IUser } from "@/api/users";
import useInput from "@/hooks/useInput";
import { maskPrice, removeMaskPrice } from "@/utils";
import Button from "@/components/Button";

export default function UserScreen() {
	const [loading, setLoading] = useState(true);
	const { id } = useLocalSearchParams();
	const [disable, setDisable] = useState(false);
	const name = useInput();
	const salary = useInput("price");
	const companyValuation = useInput("price");

	const route = useRouter();

	const getUser = useCallback(async () => {
		setLoading(true);
		try {
			const { url, options } = GET_USER_BY_ID(Number(id));
			const response = await fetch(url, options);
			const json: IUser = await response.json();
			name.setValue(json.name);
			salary.setValue(maskPrice(json.salary));
			companyValuation.setValue(maskPrice(json.companyValuation));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [])

	const editUser = useCallback(async ()=> {
		setDisable(true);
		try {
			const body: Omit<IUser, "id"> = {
				name: name.value,
				salary: Number(removeMaskPrice(salary.value)),
				companyValuation: Number(removeMaskPrice(companyValuation.value)),
			}
			const { url, options } = EDIT_USER(Number(id), body);
			await fetch(url, options);
			route.replace("/users");
		} catch (error) {
			console.error(error);
		} finally {
			setDisable(false);
		}
	},[name.value, salary.value, companyValuation.value])

	useEffect(() => {
		getUser();
	}, [])

	if(loading){
		return(
			<ActivityIndicator style={{ flex: 1 }} size="large" color="#EC6724" />
		)
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajuste conforme necessário	
			style={styles.container}
		>
			<View style={styles.container}>
				<View style={styles.titleContent}>
					<Text style={styles.createTextTitle}>Editar cliente</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Nome</Text>
					<TextInput
						style={styles.input}
						placeholder="Digite o seu nome:"
						onChangeText={name.onChange}
						onBlur={name.onBlur}
						value={name.value}
					/>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Salário</Text>
					<TextInput
						style={styles.input}
						placeholder="Digite o salário:"
						onChangeText={salary.onChange}
						onBlur={salary.onBlur}
						value={salary.value}
					/>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Valor da empresa</Text>
					<TextInput
						style={styles.input}
						placeholder="Digite o valor da empresa:"
						onChangeText={companyValuation.onChange}
						onBlur={companyValuation.onBlur}
						value={companyValuation.value}
					/>
				</View>
				<Button
					variant="filled"
					text="Salvar"
					onPress={editUser}
					disabled={disable}
				/>
				{disable && (
					<ActivityIndicator style={{ flex: 1 }} size="large" color="#EC6724" />
				)}
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		padding: 20,
		gap: 10,
		zIndex: 1,
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
	emptyText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
		fontWeight: "bold",
	},
	label: {
		fontSize: 14,
		paddingBottom: 4,
		fontWeight: "500",
	},
	input: {
		fontSize: 16,
		borderWidth: 2,
		borderColor: "#D9D9D9",
		padding: 12,
		borderRadius: 12,
		fontWeight: "500",
		width: "100%",
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
	},
	listContainer: {
		overflow: "scroll",
	},
});
