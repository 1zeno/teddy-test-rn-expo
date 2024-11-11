import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Button from "@/components/Button";

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
			<Button
				onPress={onSubmit}
				variant="filled"
				text="Entrar"
			/>
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
});
