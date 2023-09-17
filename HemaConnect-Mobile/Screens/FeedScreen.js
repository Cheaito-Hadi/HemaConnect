import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, ScrollView } from "react-native";
import UserInfo from "../Components/UI/userInfo";
import Donation from "../Components/UI/dontaionForm";
import RequestCard from "../Components/UI/requestCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FeedScreen = () => {
    const [requestsData, setRequestsData] = useState([]);
    const fetchData = async () => {
        try {
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await axios.get("http://192.168.0.113:8000/api/get_userrequests", {
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
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
            <View style={styles.homeContainer}>
                <View style={styles.userInfoField}>
                    <UserInfo />
                </View>
                <View style={styles.donationContainer}>
                    <Donation />
                </View>
                <View style={styles.requestsContainer}>
                    <Text style={styles.recentRequestText}>Recent Requests</Text>
                    <ScrollView>
                        {requestsData.map((bloodRequest, index) => (
                            <RequestCard
                                key={index}
                                imageSource={{ uri: `http://192.168.0.113:8000/storage/${bloodRequest.hospital_info.logo_url}` }}
                                hospitalName={bloodRequest.hospital_info.name}
                                bloodType={bloodRequest.requests[0].blood_type_name}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
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
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    donationContainer: {
        marginTop: 20,
        width: '90%',
    },
    requestsContainer: {
        flex: 1,
        width: '90%',
        marginTop:10
    },
    recentRequestText: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 10
    },
});

export default FeedScreen;