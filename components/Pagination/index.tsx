import { colors } from "@/utils";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
    currentPage: number;
    total: number;
    handlePage: (page: number) => void;
}

export default function Pagination(props: IProps) {
    if (props.total < 7) {
        const pages = Array.from({ length: props.total }, (_, i) => i + 1);
        return (
            <View style={styles.container}>
                {pages.map((value)=>(
                    value === props.currentPage ? (
                        <TouchableOpacity
                            testID="pageButton"
                            key={value}
                            style={styles.selectedItem}
                            onPress={()=>props.handlePage(value)}
                        >
                            <Text style={{ ...styles.selectedItemText, ...styles.strongText }}>{value}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            testID="pageButton"
                            key={value}
                            style={styles.item}
                            onPress={()=>props.handlePage(value)}
                        >
                            <Text style={{ ...styles.text, ...styles.strongText }}>{value}</Text>
                        </TouchableOpacity>
                    )
                ))}
            </View>
        );
    }

    if(props.currentPage < 5 && props.total > 7){
        const pages = Array.from({ length: 4 }, (_, i) => i + 1);
        return (
            <View style={styles.container}>
                {pages.map((value)=>(
                    value === props.currentPage ? (
                        <TouchableOpacity
                            testID="pageButton"
                            key={value}
                            style={styles.selectedItem}
                            onPress={()=>props.handlePage(value)}
                        >
                            <Text style={{ ...styles.selectedItemText, ...styles.strongText }}>{value}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            testID="pageButton"
                            key={value}
                            style={styles.item}
                            onPress={()=>props.handlePage(value)}
                        >
                            <Text style={{ ...styles.text, ...styles.strongText }}>{value}</Text>
                        </TouchableOpacity>
                    )
                ))}
                {props.currentPage === pages.length && (
                    <TouchableOpacity
                        testID="pageButton"
                        style={styles.item}
                        onPress={()=>props.handlePage(props.currentPage + 1)}
                    >
                        <Text style={{ ...styles.text, ...styles.strongText }}>{props.currentPage + 1}</Text>
                    </TouchableOpacity>
                )}
                <Text style={{ ...styles.text, ...styles.strongText }}>...</Text>
                <TouchableOpacity testID="pageButton" style={styles.item} onPress={()=>props.handlePage(props.total)}>
                    <Text style={{ ...styles.text, ...styles.strongText }}>{props.total}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const isSecondToLastPage = props.currentPage + 1 === props.total;
    const isLastPage = props.currentPage === props.total;

    return (
        <View style={styles.container}>
            <TouchableOpacity testID="pageButton" style={styles.item} onPress={()=>props.handlePage(1)}>
                <Text style={{ ...styles.text, ...styles.strongText }}>1</Text>
            </TouchableOpacity>
            <Text style={{ ...styles.text, ...styles.strongText }}>...</Text>
            <TouchableOpacity testID="pageButton" style={styles.item} onPress={()=>props.handlePage(props.currentPage - 1)}>
                <Text style={{ ...styles.text, ...styles.strongText }}>{props.currentPage - 1}</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="pageButton" style={styles.selectedItem}>
                <Text style={{ ...styles.selectedItemText, ...styles.strongText }}>{props.currentPage}</Text>
            </TouchableOpacity>
            {!isSecondToLastPage && !isLastPage && (
                <>
                    <TouchableOpacity testID="pageButton" style={styles.item} onPress={()=>props.handlePage(props.currentPage + 1)}>
                        <Text style={{ ...styles.text, ...styles.strongText }}>{props.currentPage + 1}</Text>
                    </TouchableOpacity>
                    <Text style={{ ...styles.text, ...styles.strongText }}>...</Text>
                </>
            )}
            {!isLastPage && (
                <TouchableOpacity testID="pageButton" style={styles.item} onPress={()=>props.handlePage(props.currentPage + 1)}>
                    <Text style={{ ...styles.text, ...styles.strongText }}>{props.total}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    strongText: {
        fontWeight: "bold",
    },
    text: {
        fontSize: 14,
    },
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    selectedItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.orange,
        borderRadius: 4,
    },
    selectedItemText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
