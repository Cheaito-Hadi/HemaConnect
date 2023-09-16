import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import HomeScreen from "../Screens/Home";
import AppointmentsScreen from "../Screens/AppointmentsScreen";
import MapsScreen from "../Screens/MapsScreen";

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} />
                <Stack.Screen name="MapsScreen" component={MapsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;