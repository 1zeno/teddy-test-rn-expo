import { Slot } from "expo-router";
import { AppContextProvider } from "@/context/AppContext";

export default function RootLayout() {

	return (
		<AppContextProvider>
			<Slot />
		</AppContextProvider>
	);
}
