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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedBloodType, setSelectedBloodType] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [bloodTypeError, setBloodTypeError] = useState('');

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
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setBloodTypeError('');

        if (!firstName) {
            setFirstNameError('First name is required');
            return;
        }
        if (!lastName) {
            setLastNameError('Last name is required');
            return;
        }
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailPattern.test(email)) {
            setEmailError('Invalid email format');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }
        if (!selectedBloodType) {
            setBloodTypeError('Blood type is required');
            return;
        }
        try {
            const response = await axios.post('http://192.168.0.110:8000/api/register', {
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
            const userData = response.data.user;
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            console.log('User Data:', userData);

            navigation.navigate('BottomNavigator')

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
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                <TextInput
                    style={styles.credentials}
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={(lastName) => setLastName(lastName)}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
                <TextInput
                    style={styles.credentials}
                    placeholder="Email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TextInput
                    style={styles.credentials}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <TextInput
                    style={styles.credentials}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                <View>
                    <Text style={styles.bloodTypes}>Blood Type:</Text>
                    <View style={styles.radioButtonsRow}>
                        {renderRadioButtons()}
                    </View>
                    {bloodTypeError ? <Text style={styles.errorText}>{bloodTypeError}</Text> : null}
                </View>
                <View style={styles.signUpBtn}>
                    <Button
                        buttonTitle="Sign Up"
                        handlePress={handleRegistration}
                    />
                </View>
                <View style={styles.signUp}>
                    <Text>Already a Donor?<Text style={{ fontWeight: '700' }} onPress={handleNavigateLogin}> Log In</Text></Text>
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
        marginTop: 40,
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
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default registerForm;