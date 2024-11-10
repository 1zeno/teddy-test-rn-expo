import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppContextProvider } from "@/context/AppContext";

export default function RootLayout() {

	return (
		
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<AppContextProvider>
					<BaseLayout>
						<Slot />
					</BaseLayout>
				</AppContextProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
