import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function FloatingButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: "#FF7A00",
        width: 55,
        height: 55,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
    plus: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "700",
    },
});
