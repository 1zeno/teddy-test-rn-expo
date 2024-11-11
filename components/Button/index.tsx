import { colors } from "@/utils";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IProps {
    text: string;
    onPress: () => void;
    variant: "filled" | "outlined";
    disabled?: boolean;
}

export default function Button({ text, onPress, variant, disabled }: IProps) {

    if(variant === "outlined"){
        return (
            disabled ? (
                <TouchableOpacity
                    style={styles.disabledOutlined}
                    onPress={onPress}
                    disabled={disabled}
                >
                    <Text style={styles.disabledOutlinedText}>{text}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.outlined} onPress={onPress}>
                    <Text style={styles.outlinedText}>{text}</Text>
                </TouchableOpacity>
            )
        );
    }

    return (
        disabled ? (
            <TouchableOpacity
                style={styles.disabledFilled}
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={styles.disabledFilledText}>{text}</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.filled} onPress={onPress}>
                <Text style={styles.filledText}>{text}</Text>
            </TouchableOpacity>
        )
	);
}

const styles = StyleSheet.create({
	disabledOutlined: {
        opacity: 0.5,
		width: "100%",
		borderColor: colors.orange,
		borderWidth: 2,
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 4,
	},
	disabledOutlinedText: {
		fontSize: 14,
		fontWeight: "bold",
		color: colors.orange,
	},
    outlined: {
		width: "100%",
		borderColor: colors.orange,
		borderWidth: 2,
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 4,
	},
	outlinedText: {
		fontSize: 14,
		fontWeight: "bold",
		color: colors.orange,
	},
    disabledFilled: {
		width: "100%",
		backgroundColor: "#FFFFFF1A",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
	},
	disabledFilledText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#7A7A7A"
	},
	filled: {
		width: "100%",
		backgroundColor: "#EB6625",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
	},
	filledText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#FFF"
	},
});
