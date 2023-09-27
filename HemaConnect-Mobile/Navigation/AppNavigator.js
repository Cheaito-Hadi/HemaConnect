import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import BottomNavigator from '../Navigation/BottomNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from "../onBoarding";

const Stack = createStackNavigator();
const getIsSignedIn = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        return !!token;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function AppNavigator() {
    const navigationRef = useRef();
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        async function checkAuthentication() {
            const signedIn = await getIsSignedIn();
            setIsSignedIn(signedIn);
        }
        checkAuthentication();
    }, []);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const userToken = await AsyncStorage.getItem('authToken');
                if (userToken) {
                    navigationRef.current?.navigate('BottomNavigator');
                } else {
                    navigationRef.current?.navigate('OnBoarding');
                }
            } catch (error) {
            }
        };
        checkAuthentication();
    }, []);
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="OnBoarding" component={OnBoarding}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="BottomNavigator" component={BottomNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;