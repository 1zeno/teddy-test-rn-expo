import React from "react";

type AppContext = {
    user: String | null;
    setUser: React.Dispatch<React.SetStateAction<String | null>>;
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

    return (
        <AppContext.Provider
            value={{
                user: userState,
                setUser,
            }}>
            {children}
        </AppContext.Provider>
    );
}