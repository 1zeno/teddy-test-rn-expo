import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Redirect, Slot } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Overlay from "@/components/Overlay";

export default function AppLayout() {
	/*
		const { session, isLoading } = useSession();
	
		// You can keep the splash screen open, or render a loading screen like we do here.
		if (isLoading) {
		  return <Text>Loading...</Text>;
		}
	  
		// Only require authentication within the (app) group's layout as users
		// need to be able to access the (auth) group and sign in again.
		if (!session) {
		  // On web, static rendering will stop here as the user is not authenticated
		  // in the headless Node process that the pages are rendered in.
		  return <Redirect href="/sign-in" />;
		}
	*/
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
