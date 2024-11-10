import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import HomeIcon from "@/assets/icons/home.svg";
import UsersIcon from "@/assets/icons/users.svg";
import ProductsIcon from "@/assets/icons/products.svg";
import { Slot } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {

	return (
		
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<BaseLayout>
					<Slot />
				</BaseLayout>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
