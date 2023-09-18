import {View, Text, StyleSheet, SafeAreaView, Platform} from "react-native";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import React, {useState} from 'react';

const Appointments = () => {
    const [selected, setSelected] = useState('');
    const handleDayPress = (day) => {
        setSelected(day.dateString);
        console.log("Selected day:", day.dateString);
    };
    return (
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
            <View style={styles.homeContainer}>
                <View style={styles.calendarWrapper}>
                    <Text style={styles.pickDateText}>Pick a Date</Text>
                    <Calendar
                        style={styles.calendarStyles}
                        onDayPress={handleDayPress}
                        markedDates={{
                            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'#F7F0F3'
    },
    safeAndroidView: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    calendarStyles: {
        height: 320,
        width: '100%',
        borderRadius: 8,
        backgroundColor:'#fdd7d7',
    },
    pickDateText: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
        textAlign:'justify',
    },
    calendarWrapper: {
        justifyContent: "center",
        width: '100%',
        paddingHorizontal: 20,
    }

});

export default Appointments;