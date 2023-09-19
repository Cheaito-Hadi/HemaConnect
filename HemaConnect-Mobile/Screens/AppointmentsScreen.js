import {View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity} from "react-native";
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
const Appointments = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString();

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
                <View style={styles.bookingWrapper}>
                    <Text style={styles.appointmentText}>Book an Appointment</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={showDatepicker}>
                            <Text style={styles.buttonText}>Book A Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={showTimepicker}>
                            <Text style={styles.buttonText}>Book A Time</Text>
                        </TouchableOpacity>
                    </View>
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
                <View style={styles.selectedWrapper}>
                <Text style={styles.selectedText}>Selected: <Text style={styles.dateTimeselected}>{formattedDate} - {formattedTime}</Text> </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#F7F0F3',
        alignItems: "center",
        justifyContent: "center"
    },
    safeAndroidView: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    bookingWrapper: {
        width: '90%',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonStyle: {
        borderRadius: 10,
        backgroundColor: "#ff6767",
        paddingVertical:15,
        paddingHorizontal:40,
        width:'45%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    appointmentText:{
        fontSize:16,
        fontWeight:'700',
        marginBottom:10,
        textAlign:'left',
    },
    selectedText:{
        fontSize:16,
        fontWeight:'500',
        marginBottom:10,
    },
    dateTimeselected:{
        fontSize:16,
        fontWeight:'600',
        marginBottom:10,
    },
    selectedWrapper:{
        paddingVertical:10,
        width:'90%',
        backgroundColor:'#FFF',
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15,
        marginTop:10,
    }
});

export default Appointments;
