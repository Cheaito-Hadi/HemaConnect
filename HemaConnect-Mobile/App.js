import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import AppNavigator from "./Navigation/AppNavigator";

export default function App() {
    return (
        <View style={styles.container}>
            <AppNavigator/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F0F3',
        flex:1,
    },
});
