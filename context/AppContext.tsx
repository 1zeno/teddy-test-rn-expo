import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

type AppContext = {
    user: String | null;
    logout: () => Promise<void>;
    autoLogin: () => Promise<void>;
    login: (name: string) => Promise<void>;
    showOverlay: boolean;
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContext | null>(null);


export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if(context === null) {
        throw new Error("useContext deve estar dentro do Provider");
    }
    return context;
}

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [userState, setUser] = React.useState<String | null>(null); 
    const [showOverlay, setShowOverlay] = React.useState<boolean>(false);

    const autoLogin = async () => {
        const value = await AsyncStorage.getItem("user");
        if (value === null) {
            throw new Error("É necessário fazer o login.");
        }
        if (value !== null) {
            setUser(value);
        }
    }

    const login = async (name: string) => {
        const value = await AsyncStorage.getItem("user");
        if (value !== null) {
            throw new Error("Usuário já está cadastrado.");
        }
        await AsyncStorage.setItem("user", name);
        setUser(value);
    }

    const logout = async () => {
        await AsyncStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AppContext.Provider
            value={{
                user: userState,
                logout,
                autoLogin,
                login,
                showOverlay,
                setShowOverlay,
            }}>
            {children}
        </AppContext.Provider>
    );
}