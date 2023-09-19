import {Text, View, StyleSheet, RefreshControl, SafeAreaView, ScrollView} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const Donation = () => {
    const [lastDonationData, setLastDonationData] = useState({
        dayNumber: "",
        date: "",
    });

    const [donateAfterData, setDonateAfterData] = useState({
        dayNumber: "",
        date: "",
    });
    const [refreshing, setRefreshing] = React.useState(false);



    const fetchData = async () => {
        try {
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await Axios.get("http://192.168.0.113:8000/api/get_lastdonation", {
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
        }
        finally {
            setRefreshing(false);
        }
    };
    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    useEffect(() => {

        fetchData();
    }, []);

    let renderView;
    if (donateAfterData.dayNumber === '0') {
        renderView = (
            <View style={styles.Able}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#ffcd01" style={styles.icon}/>
                <Text style={styles.ableText}>Your health shows that you are able to donate!</Text>
            </View>
        );
    } else {
        renderView = (
            <View style={styles.notAble}>
                <MaterialCommunityIcons name="alert-circle" size={20} color="#ffcd01" style={styles.icon}/>
                <Text style={styles.notAbleText}>Your health shows that you are ineligible to donate</Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View>
                    <View style={styles.donationWrapper}>
                        <View style={styles.lastDonation}>
                            <Text style={styles.lastAfter}>Last Donation</Text>
                            <Text style={styles.dayNumber}>{lastDonationData.dayNumber}</Text>
                            <Text style={styles.daysLeft}>Days ago</Text>
                            <Text style={styles.dateText}>{lastDonationData.date}</Text>
                        </View>
                        <View style={styles.lastDonation}>
                            <Text style={styles.lastAfter}>Donate After</Text>
                            <Text style={styles.dayNumber}>{donateAfterData.dayNumber}</Text>
                            <Text style={styles.daysLeft}>Days</Text>
                            <Text style={styles.dateText}>{donateAfterData.date}</Text>
                        </View>
                    </View>
                    {renderView}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    donationWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    lastDonation: {
        height: 150,
        width: '45%',
        backgroundColor: '#FF6767',
        borderRadius: 10,
        padding: 10,
    },
    lastAfter: {
        color: 'rgba(255, 255, 255, 0.50)',
        fontSize: 14,
        fontWeight: '700',
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 5
    },
    dayNumber: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10
    },
    daysLeft: {
        color: '#FFF',
        textAlign: "center",
        fontSize: 12,
        fontWeight: '700',
        textTransform: "uppercase",
    },
    dateText: {
        color: 'rgba(255, 255, 255, 0.50)',
        fontSize: 10,
        fontWeight: '700',
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 10
    },
    notAble: {
        height: 36,
        borderRadius: 10,
        backgroundColor: '#2D2D2D',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        flexDirection: 'row',
    },
    notAbleText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        textTransform: "uppercase",
    },
    icon: {
        marginRight: 5,
    },
    Able: {
        height: 36,
        borderRadius: 10,
        backgroundColor: '#007c00',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        flexDirection: 'row',
    },
    ableText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        textTransform: "uppercase",
    }

})
export default Donation;