import {StyleSheet, View, Text, TextInput} from "react-native";
import Hema from '../../assets/SVGs/Hema.svg';
import Connect from '../../assets/SVGs/Connect.svg';
import Button from "../Base/customedButton";
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigation = useNavigation();

    const handleNavigateSignUp = () => {
        navigation.navigate('RegisterScreen');
    };

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }
        if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }
        try {
            const response = await axios.post('http://192.168.1.4:8000/api/login', {
                email: email,
                password: password,
            });
            const {token} = response.data.authorization;
            await AsyncStorage.setItem('authToken', token);
            console.log('AuthToken:', token);
            const userData = response.data.user;
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            console.log('User Data:', userData);

            navigation.navigate('BottomNavigator');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setPasswordError('Incorrect Credentials');
                }
            } else {
                console.error('Login error:', error);
            }
        }
    };
    const isValidEmail = (email) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailPattern.test(email);
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.logoWrapper}>
                <Hema width={100} height={50}/>
                <Connect width={150} height={50}/>
            </View>
            <View style={styles.loginWrapper}>
                <Text style={styles.loginText}>Log In</Text>
                <Text style={styles.hero}>Welcome, Hero of Compassion!</Text>
                <TextInput
                    style={styles.credentials}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TextInput
                    style={styles.credentials}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <View style={styles.loginBtn}>
                    <Button
                        buttonTitle="Login"
                        handlePress={handleLogin}
                    />
                </View>
                <View style={styles.signUp}>
                    <Text>Not a Donor yet?<Text style={{fontWeight: '700'}} onPress={handleNavigateSignUp}> Sign
                        Up </Text></Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%'
    },
    loginWrapper: {
        alignItems: "center",
        width: '70%'
    },
    loginText: {
        fontSize: 32,
        fontWeight: "500",
        fontStyle: "normal",
        marginBottom: 5,
    },
    hero: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 40,
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
    loginBtn: {
        marginTop: 50,
        width: '100%'
    },
    signUp: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    logoWrapper:{
        flexDirection:"row",
        width:'100%',
        alignItems:"center",
        justifyContent:"center",
        marginBottom:'15%'
    },
});

export default loginForm;
