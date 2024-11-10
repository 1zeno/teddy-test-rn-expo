
import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import HomeIcon from "@/assets/icons/home.svg";
import UsersIcon from "@/assets/icons/users.svg";
import ProductsIcon from "@/assets/icons/products.svg";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href, Link, usePathname } from "expo-router";
import { SvgProps } from "react-native-svg";
import { useAppContext } from "@/context/AppContext";

interface IProps {
    onPress: () => void;
}

type Routes = {
    name: String;
    path: Href<string>,
    Icon: React.FC<SvgProps>,
}

export default function NavigationItem(props: IProps) {

    const appContext = useAppContext();
    const route = usePathname();
    const [currentRoute, setCurrentRoute] = React.useState("");

    const routes: Routes[] = [
        {
            name: "Home",
            path: "/home",
            Icon: HomeIcon,
        },
        {
            name: "Clientes",
            path: "/users",
            Icon: UsersIcon,
        },
        {
            name: "Produtos",
            path: "/products",
            Icon: ProductsIcon,
        },
    ];

    const onLogout = useCallback(() => {
        appContext.logout();
        appContext.setShowOverlay(false);
    },[])

    useEffect(() => {
        setCurrentRoute(route);
    }, [route])

    return (
        <>
            {routes.map(({ name, path, Icon }) => (
                <Link key={`${path}`} href={path} asChild>
                    {currentRoute === path ? (
                        <Pressable style={{ ...styles.item, ...styles.itemSelected }}>
                            <Icon width={20} height={20} color="#EE7D46" />
                            <Text style={{ ...styles.itemText, ...styles.itemTextSelected }}>{name}</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={styles.item} onPress={props.onPress}>
                            <Icon width={20} height={20} color="#000" />
                            <Text style={styles.itemText}>{name}</Text>
                        </Pressable>
                    )}
                </Link>
            ))}
            <Link href="/" asChild>
                <Pressable style={styles.item} onPress={onLogout}>
                    <MaterialIcons name="logout" size={20} />
                    <Text style={styles.itemText}>Sair</Text>
                </Pressable>
            </Link>
        </>
    );
};

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        flexDirection: "row",
        width: "80%",
        height: 40,
    },
    itemSelected: {
        borderRightWidth: 2,
        borderColor: "#EE7D46",
    },
    itemText: {
        paddingLeft: 10,
    },
    itemTextSelected: {
        color: "#EE7D46",
    },
});