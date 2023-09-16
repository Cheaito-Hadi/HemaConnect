import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const Button = (props) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    props.handlePress();
                }}
            >
                <Text style={styles.buttonText}>{props.buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        backgroundColor: "#FF6767",
        marginTop: 8,
        width: '100%',
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        padding: 15,
        textAlign: "center",
        fontWeight: "700",
    },
});

export default Button;