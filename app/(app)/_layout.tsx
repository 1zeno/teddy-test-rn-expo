import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Redirect, Slot } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Overlay from "@/components/Overlay";
import { useAppContext } from "@/context/AppContext";

export default function AppLayout() {
		const appContext = useAppContext();
	  
		// Only require authentication within the (app) group's layout as users
		// need to be able to access the (auth) group and sign in again.
		if (!appContext.user) {
		  // On web, static rendering will stop here as the user is not authenticated
		  // in the headless Node process that the pages are rendered in.
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
