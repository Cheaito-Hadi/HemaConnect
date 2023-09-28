import React, {useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Platform} from "react-native";
import UserInfo from "../Components/UI/userInfo";
import Donation from "../Components/UI/dontaionForm";
import RequestCard from "../Components/UI/requestCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const FeedScreen = () => {
    const notificationListener = useRef();
    const responseListener = useRef();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [requestsData, setRequestsData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [lastDonationData, setLastDonationData] = useState({
        dayNumber: "",
        date: "",
    });

    const [donateAfterData, setDonateAfterData] = useState({
        dayNumber: "",
        date: "",
    });

    const fetchData = async () => {
        try {
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await axios.get("http://192.168.1.3:8000/api/get_userrequests", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            await AsyncStorage.setItem("requestsData", JSON.stringify(response.data));
            setRequestsData(response.data.Blood_Requests);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDonation = async () => {
        try {
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await axios.get("http://192.168.1.3:8000/api/get_lastdonation", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const data = response.data.Donation;
            if (data) {
                const lastDonationDate = new Date(data.time);
                const currentDate = new Date();
                const daysSinceLastDonation = Math.floor(
                    (currentDate - lastDonationDate) / (1000 * 60 * 60 * 24)
                );
                setLastDonationData({
                    dayNumber: daysSinceLastDonation.toString(),
                    date: lastDonationDate.toLocaleDateString(),
                });
                setDonateAfterData({
                    dayNumber: data.donate_after.toString(),
                    date: data.donate_after_date,
                });
                if (data) {
                    await AsyncStorage.setItem("DonationData", JSON.stringify(data));
                }
            } else {
                setDonateAfterData({
                    dayNumber: "0",
                    date: new Date().toLocaleDateString(),
                });
                setLastDonationData({
                    dayNumber: "0",
                    date: new Date().toLocaleDateString(),
                })
            }
        } catch (error) {
            console.error("Error fetching donation data:", error);
        } finally {
            setRefreshing(false);
        }
    };
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            fetchData();
            fetchDonation();
        } finally {
            setRefreshing(false);
        }
    };
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
        fetchDonation();
        fetchData();
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    return (
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <View style={styles.homeContainer}>
                    <Text>The Token {expoPushToken}</Text>
                    <View style={styles.userInfoField}>
                        <UserInfo/>
                    </View>
                    <View style={styles.donationContainer}>
                        <Donation lastDon={lastDonationData} donAfter={donateAfterData}/>
                    </View>
                    <View style={styles.requestsContainer}>
                        <Text style={styles.recentRequestText}>Recent Requests</Text>
                        <ScrollView
                        >
                            {requestsData.map((bloodRequest, index) => (
                                <RequestCard
                                    key={index}
                                    imageSource={{uri: `http://192.168.1.3:8000/storage/${bloodRequest.hospital_info.logo_url}`}}
                                    hospitalName={bloodRequest.hospital_info.name}
                                    bloodType={bloodRequest.requests[0].blood_type_name}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
        backgroundColor: '#F7F0F3',
    },
    userInfoField: {
        height: 50,
        marginTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '90%'
    },
    safeAndroidView: {
        flex: 1,
    },
    donationContainer: {
        marginTop: 20,
        width: '90%',
    },
    requestsContainer: {
        flex: 1,
        width: '90%',
        marginTop: 20
    },
    recentRequestText: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 10
    },
});

export default FeedScreen;