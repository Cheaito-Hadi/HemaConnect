import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import LoginForm from './components/ui/loginForm';

export default function App() {
    return (
        <View style={styles.container}>
            <LoginForm/>
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
