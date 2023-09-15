import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


const ScreenTitle = ({title, onBackPress}) => {
    return (
        <SafeAreaView edges={['top']}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={onBackPress}>
                    <Ionicons name="ios-arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
            </View>
        </SafeAreaView>
    );
};

export default ScreenTitle;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})