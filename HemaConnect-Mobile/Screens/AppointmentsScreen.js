import {View, Text, StyleSheet, SafeAreaView, Platform, Button} from "react-native";
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const Appointments = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
            <View style={styles.homeContainer}>
                <View style={styles.calendarWrapper}>
                    <Text style={styles.pickDateText}>Your Next Booking</Text>
                </View>
                <View>
                    <Button onPress={showDatepicker} title="Show date picker!"/>
                    <Button onPress={showTimepicker} title="Show time picker!"/>
                    <Text>selected: {date.toLocaleString()}</Text>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
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
        backgroundColor: '#F7F0F3'
    },
    safeAndroidView: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    pickDateText: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
        textAlign: 'justify',
    },
    calendarWrapper: {
        justifyContent: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
});

export default Appointments;
