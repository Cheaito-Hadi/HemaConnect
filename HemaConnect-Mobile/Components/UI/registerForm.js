import {StyleSheet, View, Text, TextInput} from "react-native";
import {RadioButton} from 'react-native-paper';
import Button from "../Base/customedButton";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const registerForm = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedBloodType, setSelectedBloodType] = useState('');

    const handleNavigateLogin = () => {
        navigation.navigate('LoginScreen');
    };
    const radioOptions = [
        {label: 'A+', value: '1'},
        {label: 'A-', value: '2'},
        {label: 'B+', value: '3'},
        {label: 'B-', value: '4'},
        {label: 'AB+', value: '5'},
        {label: 'AB-', value: '6'},
        {label: 'O+', value: '7'},
        {label: 'O-', value: '8'},
    ];

    const renderRadioButtons = () => {
        return radioOptions.map((option, index) => (
            <View key={option.value} style={{flexDirection: 'row', alignItems: 'center', width: '25%'}}>
                <RadioButton
                    value={option.value}
                    status={selectedBloodType === option.value ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedBloodType(option.value)}
                />
                <Text>{option.label}</Text>
            </View>
        ));
    };
    const handleRegistration = async () => {
        try {
            const response = await axios.post('http://192.168.0.113:8000/api/register', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                bloodtype_id: selectedBloodType,
                usertype_id: 1
            },{
                    'Content-Type': 'application/json'
            });

            const token = response.data.user.token;
            await AsyncStorage.setItem('authToken', token);
            console.log('AuthToken:', token);
            navigation.navigate('HomeScreen')

        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    return (
        <View style={styles.formContainer}>
            <View style={styles.signUpWrapper}>
                <TextInput
                    style={styles.credentials}
                    placeholder="First name"
                    value={firstName}
                    onChangeText={(firsName) => setFirstName(firsName)}
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={(lastName) => setLastName(lastName)}
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                />
                <View>
                    <Text style={styles.bloodTypes}>Blood Type:</Text>
                    <View style={styles.radioButtonsRow}>
                        {renderRadioButtons()}
                    </View>
                </View>
                <View style={styles.signUpBtn}>
                    <Button
                        buttonTitle="Sign Up"
                        handlePress={handleRegistration}
                    />
                </View>
                <View style={styles.signUp}>
                    <Text>Already a Donor?<Text style={{fontWeight: '700'}} onPress={handleNavigateLogin}> Log In</Text></Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        marginTop:40,
    },
    radioButtonsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    signUpWrapper: {
        alignItems: "center",
        width: '70%'
    },
    credentials: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 20,
        backgroundColor: '#FFF',
        height: 45,
        borderRadius: 10,
        padding: 5,
    },
    bloodTypes: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '400',
    },
    signUpBtn: {
        marginTop: 25,
        width: '100%'
    },
    signUp: {
        marginTop: 40,
    },
});

export default registerForm;