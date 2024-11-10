import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

export const unstable_settings = {
	initialRouteName: "/",
};

function RootLayoutNav() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				screenOptions={{ headerShown: false }}
			>
				<Drawer.Screen name="home" options={{drawerLabel: "Home"}}/>
				<Drawer.Screen name="users" options={{drawerLabel: "Clientes"}}/>
			</Drawer>
		</GestureHandlerRootView>
	);
}