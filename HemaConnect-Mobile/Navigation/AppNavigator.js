import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import BottomNavigator from '../Navigation/BottomNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from "../onBoarding";

const Stack = createStackNavigator();

function AppNavigator() {
    const navigationRef = useRef();
    const [isSignedIn, setIsSignedIn] = useState(false);

    const checkAuthentication = async () => {
        try {
            const userToken = await AsyncStorage.getItem('authToken');
            if (userToken) {
                setIsSignedIn(isSignedIn);
                navigationRef.current?.navigate('BottomNavigator');
            } else {
                navigationRef.current?.navigate('OnBoarding');
            }
        } catch (error) {
        }
    };
    useEffect(() => {
        checkAuthentication();
    }, [isSignedIn]);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{headerShown: false}}>
                {
                    !isSignedIn && <Stack.Screen name="OnBoarding" component={OnBoarding}/>
                }
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="BottomNavigator" component={BottomNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;