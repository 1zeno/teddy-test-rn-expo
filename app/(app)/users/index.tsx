import {
	StyleSheet, Text,
	View, StatusBar, TextInput,
	FlatList, Alert, ActivityIndicator,
	KeyboardAvoidingView, Platform, Dimensions,
} from "react-native";
import CardHome from "@/components/CardUsers";
import { useState, useRef, useCallback, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import Pagination from "@/components/Pagination";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { CREATE_USER, DELETE_USER, GET_USERS, IUser } from "@/api/users";
import useInput from "@/hooks/useInput";
import "react-native-gesture-handler";
import { removeMaskPrice } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/context/AppContext";
import Button from "@/components/Button";

interface IGetUsers {
	clients: IUser[];
	currentPage: number,
	totalPages: number,
}

const { height: screenHeight } = Dimensions.get("window");
export default function UsersScreen() {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(12);
	const [disable, setDisable] = useState(false);
	const [limit, setLimit] = useState(1);
	const [data, setData] = useState<IUser[]>([]);
	const [quantity, setQuantity] = useState(0);
	const [listLoading, setListLoading] = useState(true);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [selectedIds, setSelectedIds] = useState<number[]>([])

	const name = useInput();
	const salary = useInput("price");
	const companyValuation = useInput("price");
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const appContext = useAppContext();

	const handlePage = useCallback((page: number) => {
		onFilter(page, limit)
	}, [limit])

	const handlePresentModalPress = useCallback(() => {
		StatusBar.setHidden(true, "fade");
		bottomSheetModalRef.current?.present();
	}, []);

	const closeBottomSheet = useCallback(() => {
		bottomSheetModalRef.current?.close();
	}, []);

	const getUsers = async () => {
		setListLoading(true);
		try {
			const { url, options } = GET_USERS(1, 1);
			const response = await fetch(url, options);
			const json: IGetUsers = await response.json();
			setData(json.clients);
			setCurrentPage(json.currentPage);
			setTotalPages(json.totalPages);
			setQuantity(json.totalPages);
		} catch (error) {
			console.error(error);
		} finally {
			setListLoading(false);
		}
	}

	const onFilter = async (page: number, limit: number) => {
		setListLoading(true);
		try {
			const { url, options } = GET_USERS(page, limit);
			const response = await fetch(url, options);
			const json: IGetUsers = await response.json();
			setData(json.clients);
			setCurrentPage(json.currentPage);
			setTotalPages(json.totalPages);
		} catch (error) {
			console.error(error);
		} finally {
			setListLoading(false);
		}
	}

	const onLimitChange = (itemValue: number, itemIndex: number) => {
		setLimit(itemValue);
		onFilter(1, itemValue);
	}

	const onDeleteAlert = (name: string, id: number) => {
		const title = "Excluir cliente:"
		const message = `Tem certeza que deseja excluir o cliente ${name}?`;
		Alert.alert(title, message, [
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Exluir cliente",
				onPress: () => onDelete(id),
				style: "destructive",
			},
		])
	};

	const createUser = useCallback(async () => {
		setDisable(true);
		try {
			const body: Omit<IUser, "id"> = {
				name: name.value,
				salary: Number(removeMaskPrice(salary.value)),
				companyValuation: Number(removeMaskPrice(companyValuation.value)),
			}
			const { url, options } = CREATE_USER(body);
			await fetch(url, options);
			await onFilter(1, limit);
			closeBottomSheet();
			appContext.onSuccess("Usuário criado com sucesso!");
		} catch (error) {
			console.error(error);
		} finally {
			setDisable(false);
		}
	}, [name.value, salary.value, companyValuation.value, limit])

	const onDelete = useCallback(async (id: number) => {
		setLoadingDelete(true);
		try {
			const { url, options } = DELETE_USER(id);
			await fetch(url, options);
			await onFilter(1, limit);
			appContext.onSuccess("Exclusão realizada com sucesso!");
		} catch (error) {
			appContext.onError("Erro ao deletar usuário.");
			console.error(error);
		} finally {
			setLoadingDelete(false);
		}
	}, [name.value, salary.value, companyValuation.value, limit])

	const onSelectUser = async (user: IUser) => {
		try {
			const response = await AsyncStorage.getItem("selected-users");
			if (response !== null) {
				const selectedUsers: IUser[] = JSON.parse(response);
				const isPreviousSelected = selectedUsers.filter((value) => value.id === user.id).length > 0;
				if (isPreviousSelected) {
					throw new Error("Usuário já foi selecionado anteriormente.");
				}
				const newValue = [...selectedUsers, user]
				const jsonValue = JSON.stringify(newValue);
				await AsyncStorage.setItem("selected-users", jsonValue);
				const usersId = newValue.map((value) => value.id);
				setSelectedIds(usersId);
				appContext.onSuccess("Usuário selecionado com sucesso!");
			} else {
				const jsonValue = JSON.stringify([user]);
				await AsyncStorage.setItem("selected-users", jsonValue);
				setSelectedIds([user.id]);
			}
		} catch (error) {
			if (error instanceof Error) {
				appContext.onError(error.message);
			} else {
				appContext.onError("Erro ao selecionar usuário.");
			}
			console.error(error);
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
				const usersId = users.map((value) => value.id);
				setSelectedIds(usersId);
			}
		} catch (error) {
			appContext.onError("Ocorreu um erro ao remover usuário.");
			console.error(error);
		}
	}

	const getSelectedIds = useCallback(async () => {
		try {
			const response = await AsyncStorage.getItem("selected-users");
			if (response !== null) {
				const selectedUsers: IUser[] = JSON.parse(response);
				const usersId = selectedUsers.map((value) => value.id);
				setSelectedIds(usersId);
			}
		} catch (error) {
			console.error(error);
		}
	}, [])

	useEffect(() => {
		getUsers();
		getSelectedIds();
	}, [])

	if (loadingDelete) {
		return (
			<ActivityIndicator style={{ flex: 1 }} size="large" color="#EC6724" />
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={{ ...styles.text, ...styles.strongText }}>{quantity}</Text>
				<Text style={styles.text}> clientes encontrados:</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.text}>Clientes por página: </Text>
				<View style={styles.picker}>
					<Picker
						selectedValue={limit}
						onValueChange={onLimitChange}
					>
						<Picker.Item label="1" value="1" />
						<Picker.Item label="5" value="5" />
						<Picker.Item label="10" value="10" />
						<Picker.Item label="15" value="15" />
						<Picker.Item label="20" value="20" />
					</Picker>
				</View>
			</View>
			{!listLoading && data.length > 0 ? (
				<FlatList
					style={{
						gap: 20,
					}}
					data={data}
					renderItem={({ item }) => (
						<CardHome
							key={item.id}
							user={item}
							onDelete={onDeleteAlert}
							onSelectUser={onSelectUser}
							selectedIds={selectedIds}
							onRemoveUser={onRemoveSelectedUser}
						/>
					)}
				/>
			) : (
				<ActivityIndicator style={{ flex: 1 }} size="large" color="#EC6724" />
			)}
			{!listLoading && data.length === 0 && (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>Não há cliente cadastrado.</Text>
				</View>
			)}
			<Button
				onPress={handlePresentModalPress}
				variant="outlined"
				text="Criar cliente"
			/>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				onDismiss={() => {
					StatusBar.setHidden(false, "fade");
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
				snapPoints={["100%"]}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{
						flex: 1
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
								placeholderTextColor="#FFFFFF66"
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
								placeholderTextColor="#FFFFFF66"
								onChangeText={companyValuation.onChange}
								onBlur={companyValuation.onBlur}
								value={companyValuation.value}
							/>
						</View>
						<Button
							onPress={createUser}
							variant="filled"
							text="Criar cliente"
							disabled={disable}
						/>
						{disable && (
							<ActivityIndicator style={{ flex: 1 }} size="large" color="#EC6724" />
						)}
					</BottomSheetView>
				</KeyboardAvoidingView>
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
	picker: {
		width: 100,
		height: 30,
		borderWidth: 1,
		padding: 0,
		justifyContent: "center",
		borderColor: "#D9D9D9",
		borderRadius: 4,
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
	contentContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#7A7A7A",
		gap: 20,
		padding: 16,
		height: screenHeight,
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
	listContainer: {
		overflow: "scroll",
	},
});
