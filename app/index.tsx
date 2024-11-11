import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function LoginScreen() {

	const [name, setName] = useState("");
	const router = useRouter();
	const appContext = useAppContext();

	const onSubmit = async () => {
		try {
			await appContext.login(name);
			router.navigate("/home");
		} catch (error) {
			console.log(error);
		}
	}

	const inititalFetch = async () => {
		try {
			await appContext.autoLogin();
			router.navigate("/home");
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		inititalFetch();
	},[])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Olá, seja bem-vindo!</Text>
			<TextInput
				style={styles.textInput}
				placeholder="Digite o seu nome:"
				placeholderTextColor="#D9D9D9"
				onChangeText={setName}
			/>
			<TouchableOpacity style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Entrar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		gap: 20,
	},
	title: {
		fontSize: 32,
	},
	textInput: {
		padding: 16,
		borderColor: "#D9D9D9",
		borderWidth: 2,
		width: "100%",
		fontSize: 24,
		borderRadius: 4,
	},
	button: {
		width: "100%",
		backgroundColor: "#EC6724",
		alignItems: "center",
		paddingVertical: 20,
	},
	buttonText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFFFFF",
		borderRadius: 4,
	},
});
