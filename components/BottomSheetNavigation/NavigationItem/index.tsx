
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import HomeIcon from "@/assets/icons/home.svg";
import UsersIcon from "@/assets/icons/users.svg";
import ProductsIcon from "@/assets/icons/products.svg";
import { Href, Link, usePathname } from "expo-router";
import { SvgProps } from "react-native-svg";

interface IProps {
    onPress: () => void;
}

type Routes = {
    name: String;
    path: Href<string>,
    Icon: React.FC<SvgProps>,
}

export default function NavigationItem(props: IProps) {

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
            name: "Products",
            path: "/products",
            Icon: ProductsIcon,
        },
    ];

    useEffect(() => {
        setCurrentRoute(route);
    }, [route])

    return (
        routes.map(({name, path, Icon})=>(
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
        ))
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