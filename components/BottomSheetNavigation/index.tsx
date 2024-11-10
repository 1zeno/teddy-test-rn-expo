
import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import {
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import NavigationItem from "./NavigationItem";
import MenuIcon from "@expo/vector-icons/Feather";
import { useAppContext } from "@/context/AppContext";

export default function BottomSheetNavigation() {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const appContext = useAppContext();

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            appContext.setShowOverlay(false);
        } else {
            appContext.setShowOverlay(true);
        }
    }, []);
    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.close();
    };

    return (
        <>
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