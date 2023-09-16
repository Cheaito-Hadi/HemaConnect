import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import BottomNavigator from '../Navigation/BottomNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        async function checkAuthentication() {
            const signedIn = await getIsSignedIn();
            setIsSignedIn(signedIn);
        }
        checkAuthentication();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
                {isSignedIn ? (
                    <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
                ) : (
                    <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;