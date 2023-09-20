import {View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Modal, FlatList} from "react-native";
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import NextAppointment from "../Components/UI/nextAppointmentForm";

const Appointments = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const formattedDate = date.toLocaleDateString();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showItemSelector, setShowItemSelector] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [hepatitisAnswer, setHepatitisAnswer] = useState(null);
    const [anemiaAnswer, setAnemiaAnswer] = useState(null);

    const mockData = [
        {key: '1', name: 'Saint George'},
        {key: '2', name: 'dsadasddadadsadaddddddddddssssssssss'},
        {key: '3', name: 'Hospital 3'},
        {key: '4', name: 'Hospital 4'},
        {key: '5', name: 'Hospital 5'},
        {key: '6', name: 'Hospital 6'},
        {key: '7', name: 'Hospital 7'},
        {key: '8', name: 'Hospital 8'},
        {key: '9', name: 'Hospital 9'},
        {key: '10', name: 'Hospital 10'},
        {key: '11', name: 'Hospital 11'},
        {key: '12', name: 'Hospital 12'},
    ];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setSelectedDate(currentDate);

        const formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        setSelectedTime(formattedTime);
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

    const renderListItem = ({item}) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                setSelectedItem(item.name);
                setSelectedHospital(item.name);
                setShowItemSelector(false);
            }}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
            <View style={styles.homeContainer}>
                <View style={styles.nextAppointmentContainer}>
                    <NextAppointment/>
                </View>
                <View style={styles.horizontalLine}/>
                <View style={styles.bookingWrapper}>
                    <Text style={styles.appointmentText}>Book an Appointment</Text>
                    <TouchableOpacity style={styles.inputField} onPress={showDatepicker}>
                        <Text style={styles.inputValue}>
                            {selectedDate ? formattedDate : <Text style={styles.placeHolder}>Select a Date...</Text>}
                        </Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                    <TouchableOpacity style={styles.inputField} onPress={showTimepicker}>
                        <Text style={styles.inputValue}>
                            {selectedTime ? formattedTime : <Text style={styles.placeHolder}>Select a Time...</Text>}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingWrapper}>
                    <TouchableOpacity style={styles.inputField} onPress={() => setShowItemSelector(true)}>
                        <Text style={styles.inputValue}>
                            {selectedHospital ? selectedHospital :
                                <Text style={styles.placeHolder}>Select a Hospital...</Text>}
                        </Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showItemSelector}
                        onRequestClose={() => {
                            setShowItemSelector(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Hospitals</Text>
                                <FlatList
                                    data={mockData}
                                    renderItem={renderListItem}
                                    keyExtractor={(item) => item.key}
                                />
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setShowItemSelector(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View>
                        <Text style={styles.questionText}>Do you Have Hepatitis</Text>
                        <View style={styles.checkboxContainer}>
                            <View style={styles.checkboxLabelContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.checkbox,
                                        hepatitisAnswer === 'YES' && styles.selectedCheckbox,
                                    ]}
                                    onPress={() => setHepatitisAnswer('YES')}
                                />
                                <Text style={styles.checkboxLabel}>Yes</Text>
                            </View>
                            <View style={styles.checkboxLabelContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.checkbox,
                                        hepatitisAnswer === 'NO' && styles.selectedCheckbox,
                                    ]}
                                    onPress={() => setHepatitisAnswer('NO')}
                                />
                                <Text style={styles.checkboxLabel}>No</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.questionText}>Do you Have Anemia</Text>
                        <View style={styles.checkboxContainer}>
                            <View style={styles.checkboxLabelContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.checkbox,
                                        anemiaAnswer === 'YES' && styles.selectedCheckbox,
                                    ]}
                                    onPress={() => setAnemiaAnswer('YES')}
                                />
                                <Text style={styles.checkboxLabel}>Yes</Text>
                            </View>
                            <View style={styles.checkboxLabelContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.checkbox,
                                        anemiaAnswer === 'NO' && styles.selectedCheckbox,
                                    ]}
                                    onPress={() => setAnemiaAnswer('NO')}
                                />
                                <Text style={styles.checkboxLabel}>No</Text>
                            </View>
                        </View>
                    </View>
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
        justifyContent: "flex-start"
    },
    safeAndroidView: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    bookingWrapper: {
        width: '90%',
        alignItems: 'flex-start',
    },
    appointmentText: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'left',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: '70%',
        backgroundColor: '#F7F0F3',
        borderRadius: 10,
        padding: 20,
        maxHeight: '50%',
        elevation: 5,
        alignItems: "center",
    },
    listItem: {
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ff6767",
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#ff6767',
        width: '30%',
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500'
    },
    nextAppointmentContainer: {
        width: '90%',
        marginTop: 40,
        marginBottom: 40
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '90%',
        marginBottom: 20,
    },
    inputField: {
        padding: 10,
        width: '90%',
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,1)',
        elevation: 5,
    },
    inputValue: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 10
    },
    placeHolder: {
        color: '#5B5B5B'
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        marginTop:10
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginTop:10
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#5e5e5e',
        backgroundColor: '#FFF',
        marginRight: 10,
        borderRadius: 3,
        shadowColor: 'rgba(0,0,0,0.6)',
        elevation: 5,
    },
    selectedCheckbox: {
        backgroundColor: '#ff6767',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#000',
    },
    checkboxLabelContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginRight:50
    }
});

export default Appointments;
