import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScreenTitle = ({ title, onBackPress }) => {
    return (
        <SafeAreaView edges={['top']}>
            <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{title}</Text>
                <TouchableOpacity onPress={onBackPress} style={{ position: 'absolute', left: 20 }}>
                    <Ionicons name="ios-arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ScreenTitle;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FF6767',
        height: 80,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    textTitle: {
        alignItems: "center",
        justifyContent: "center",
        color: '#FFF',
        fontWeight: '500',
        fontSize: 20,
    }
});
