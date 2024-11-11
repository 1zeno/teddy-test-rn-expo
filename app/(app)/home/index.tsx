import { IUser } from "@/api/users";
import Button from "@/components/Button";
import CardUserSelected from "@/components/CardUserSelected";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator, FlatList, Pressable,
	StyleSheet, Text, View,
} from "react-native";

export default function HomeScreen() {

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<IUser[]>([]);

	const getSelectedUsers = async () => {
		try {
			const response = await AsyncStorage.getItem("selected-users");
			if (response !== null) {
				const selectedUsers: IUser[] = JSON.parse(response);
				setData(selectedUsers);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const onRemoveSelectedUser = async (id: number) => {
		try {
			const response = await AsyncStorage.getItem("selected-users");
			if (response !== null) {
				const selectedUsers: IUser[] = JSON.parse(response);
				const users = selectedUsers.filter((value) => value.id !== id);
				const jsonValue = JSON.stringify(users);
				await AsyncStorage.setItem("selected-users", jsonValue);
				setData(users);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const onClearSelectedUsers = async () => {
		try {
			await AsyncStorage.removeItem("selected-users");
			setData([]);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getSelectedUsers();
	},[])

	return (
		<View style={styles.container}>
			{!loading && data.length > 0 && (
				<>
					<Text style={styles.title}>Clientes selecionados:</Text>
					<FlatList
						style={{
							gap: 20,
						}}
						data={data}
						renderItem={({ item }) => (
							<CardUserSelected
								key={item.id}
								user={item}
								onRemoveUser={onRemoveSelectedUser}
							/>
						)}
					/>
					<Button
						onPress={onClearSelectedUsers}
						variant="outlined"
						text="Limpar clientes selecionados"
					/>
				</>
			)}
			{loading && (
				<ActivityIndicator style={{ flex: 1 }} size="large" color="#EC6724" />
			)}
			{!loading && data.length === 0 && (
				<>
					<Text style={styles.emptyText}>Não há cliente selecionado.</Text>
					<Link href="/users" asChild>
						<Pressable style={styles.button}>
							<Text style={styles.buttonText}>Ir para clientes</Text>
						</Pressable>
					</Link>
				</>
			)}
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
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
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
});