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
    const renderListItem = ({item}) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                setSelectedItem(item.name);
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
                <View style={styles.bookingWrapper}>
                    <Text style={styles.appointmentText}>Book an Appointment</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={showDatepicker}>
                            <Text style={styles.buttonText}>Book a Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={showTimepicker}>
                            <Text style={styles.buttonText}>Book a Time</Text>
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
                    <Text style={styles.selectedText}>Selected: <Text
                        style={styles.dateTimeselected}>{formattedDate} - {formattedTime}</Text></Text>
                </View>
                <View style={styles.bookingWrapper}>
                    <TouchableOpacity style={styles.selectItemButton} onPress={() => setShowItemSelector(true)}>
                        <Text style={styles.buttonText}>Select a Hospital</Text>
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
                    <View style={styles.selectedWrapperHospital}>
                        <Text style={styles.selectedText}>Selected: <Text
                            style={styles.dateTimeSelected}>{selectedItem} Hospital</Text></Text>
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
        paddingVertical: 15,
        paddingHorizontal: 40,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    appointmentText: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'left',
    },
    selectedText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    dateTimeSelected: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    selectedWrapper: {
        paddingVertical: 10,
        width: '90%',
        backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 10,
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
    selectItemButton: {
        borderRadius: 10,
        backgroundColor: "#ff6767",
        paddingVertical: 15,
        paddingHorizontal: 40,
        width: '60%',
        alignItems: 'center',
        marginTop: 20,
    },
    selectedWrapperHospital: {
        paddingVertical: 10,
        width: '100%',
        backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 10,
    },
    modalTitle: {
        textAlign: "center",
        fontWeight: '500',
        fontSize: 16,
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
    nextAppointmentContainer:{
        width:'90%'
    }
});

export default Appointments;
