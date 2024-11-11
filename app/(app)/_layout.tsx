import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect, Slot } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Overlay from "@/components/Overlay";
import { useAppContext } from "@/context/AppContext";

export default function AppLayout() {
		const appContext = useAppContext();
		if (!appContext.user) {
		  return <Redirect href="/" />;
		}
	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<Overlay />
				<BaseLayout>
					<Slot />
				</BaseLayout>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
