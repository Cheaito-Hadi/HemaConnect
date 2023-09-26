import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedScreen from '../Screens/FeedScreen';
import AppointmentsScreen from '../Screens/AppointmentsScreen';
import MapsScreen from '../Screens/MapsScreen';
import SettingsScreen from '../Screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'black', height: 60 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                return (
                    <View
                        key={index}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: state.index === index ? '#ff6767' : 'black',
                        }}
                        onTouchStart={() => navigation.navigate(route.name)}
                    >
                        <MaterialCommunityIcon
                            name={options.tabBarIconName}
                            color={state.index === index ? '#FFF' : '#707070'}
                            size={30}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    headerShown: false,
                    tabBarIconName: 'home',
                }}
            />
            <Tab.Screen
                name="Appointment"
                component={AppointmentsScreen}
                options={{
                    headerShown: false,
                    tabBarIconName: 'calendar',
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapsScreen}
                options={{
                    headerShown: false,
                    tabBarIconName: 'map',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarIconName: 'account',
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigator;
