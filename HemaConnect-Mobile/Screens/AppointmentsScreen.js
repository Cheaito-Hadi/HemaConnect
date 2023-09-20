import {View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Modal, FlatList} from "react-native";
import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import NextAppointment from "../Components/UI/nextAppointmentForm";
import CustomedButton from "../Components/Base/customedButton";
import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Appointments = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const formattedDate = date.toLocaleDateString();
    const [showItemSelector, setShowItemSelector] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [hepatitisAnswer, setHepatitisAnswer] = useState(null);
    const [anemiaAnswer, setAnemiaAnswer] = useState(null);
    const [requestData, setRequestData] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [selectedHospitalName, setSelectedHospitalName] = useState(null);
    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [hospitalError, setHospitalError] = useState('');
    const [hepatitisError, setHepatitisError] = useState('');
    const [anemiaError, setAnemiaError] = useState('');

    const fetchHospitals = async () => {
        try {
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await Axios.get('http://192.168.0.113:8000/api/get_userrequests', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.data && response.data.message === 'success') {
                setRequestData(response.data.Blood_Requests);
            }
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    };

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

    const handleBooking = async () => {
        setDateError('');
        setTimeError('');
        setHospitalError('');
        setHepatitisError('');
        setAnemiaError('');

        let isValid = true;

        if (!selectedDate) {
            setDateError('Please select a date.');
            isValid = false;
        }

        if (!selectedTime) {
            setTimeError('Please select a time.');
            isValid = false;
        }

        if (!selectedHospitalName) {
            setHospitalError('Please select a hospital.');
            isValid = false;
        }

        if (!hepatitisAnswer) {
            setHepatitisError('Please select an option for Hepatitis.');
            isValid = false;
        }

        if (!anemiaAnswer) {
            setAnemiaError('Please select an option for Anemia.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            const selectedDateTime = `${selectedDate.toISOString().split('T')[0]} ${selectedTime.replace(/ AM| PM/g, "")}:00`;
            const requestData = {
                request_id: selectedRequestId,
                hepatitis: hepatitisAnswer === 'YES' ? 1 : 0,
                anemia: anemiaAnswer === 'YES' ? 1 : 0,
                time: selectedDateTime,
            };
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await Axios.post('http://192.168.0.113:8000/api/create_booking', requestData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.data && response.data.message === 'Booking created successfully') {
                console.log('Booking successful:', response.data);
            }
        } catch (error) {
            console.error('Error making booking:', error);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const renderListItem = ({item}) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                setSelectedRequestId(item.requests[0].id);
                setSelectedHospitalName(item.hospital_info.name);
                setShowItemSelector(false);
            }}
        >
            <Text>{item.hospital_info.name}</Text>
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
                    <Text style={styles.errorText}>{dateError}</Text>
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
                    <Text style={styles.errorText}>{timeError}</Text>
                </View>
                <View style={styles.bookingWrapper}>
                    <TouchableOpacity style={styles.inputField} onPress={() => setShowItemSelector(true)}>
                        <Text style={styles.inputValue}>
                            {selectedHospitalName ? selectedHospitalName :
                                <Text style={styles.placeHolder}>Select a Hospital...</Text>}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.errorText}>{hospitalError}</Text>
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
                                    data={requestData}
                                    renderItem={renderListItem}
                                    keyExtractor={(item) => item.requests[0].id.toString()}
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
                        <Text style={styles.errorText}>{hepatitisError}</Text>
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
                        <Text style={styles.errorText}>{anemiaError}</Text>
                    </View>
                    <View style={styles.bookButton}>
                        <CustomedButton
                            buttonTitle="Book"
                            handlePress={handleBooking}
                        />
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
        width: '80%',
        alignItems: 'flex-start',
    },
    appointmentText: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: '4%',
        textAlign: 'left',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '500',
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
        borderBottomColor: "gray",
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
        width: '80%',
        marginTop: '5%',
        marginBottom: '8%'
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '80%',
        marginBottom: '6%',
    },
    inputField: {
        padding: 10,
        width: '100%',
        backgroundColor: '#FFF',
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
        marginBottom: '2%',
        marginTop: '1%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: '2%'
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
    checkboxLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 50
    },
    bookButton: {
        width: '100%',
    },
    errorText: {
        color: 'red',
    },
});

export default Appointments;
