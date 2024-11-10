
import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import NavigationItem from "./NavigationItem";
import MenuIcon from "@expo/vector-icons/Feather";

export default function BottomSheetNavigation() {

    const [isOpen, setIsOpen] = useState(false);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, []);
    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.close();
    };

    return (
        <>
            {isOpen && (
                <TouchableOpacity style={styles.overlay} onPress={closeBottomSheet} activeOpacity={1}>
                    <View />
                </TouchableOpacity>
            )}
            <MenuIcon
                name="menu"
                onPress={handlePresentModalPress}
                backgroundColor="#FFF"
                color="#000"
                size={24}
            />
            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                snapPoints={["90%"]}
                containerStyle={{
                    zIndex: 11,
                }}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <NavigationItem onPress={closeBottomSheet} />
                </BottomSheetView>
            </BottomSheetModal>
        </>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
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