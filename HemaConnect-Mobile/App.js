import React from 'react';
import { StyleSheet, View } from 'react-native';
import RegisterForm from "./components/ui/registerForm";

export default function App() {
    return (
        <View style={styles.container}>
            <RegisterForm/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F0F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
