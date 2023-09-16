import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from '../Screens/FeedScreen';
import AppointmentsScreen from '../Screens/AppointmentsScreen';
import MapsScreen from '../Screens/MapsScreen';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }} activeColor='white'>
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcon name='home' color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Appointment"
                component={AppointmentsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcon name='calendar' color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcon name='map' color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigator;
