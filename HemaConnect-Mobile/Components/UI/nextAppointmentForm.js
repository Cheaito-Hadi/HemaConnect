import {View, Text, Image, StyleSheet} from "react-native";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const nextAppointment = ({imageSource,hospitalName,bloodType}) => {

    const [bookingData, setBookingData] = useState(null);
    const fetchBooking = async () => {
        try {
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await axios.get('http://192.168.0.113:8000/api/get_userbookings', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const data = response.data.upcoming_booking;
            setBookingData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchBooking();
    }, []);

    return (
        <View>
            <Text style={styles.upComingBooking}>Upcoming Appointment</Text>
            <View style={styles.bookingContainer}>
                <View style={styles.bookingCard}>
                    <View style={styles.leftInside}>
                        <Image style={styles.hospitalImage}
                               source={{ uri: `http://192.168.0.113:8000/storage/${bookingData.hospital_detailes.logo_url}` }}/>
                    </View>
                    <View style={styles.hospitalDateWrapper}>
                        <Text style={styles.hospitalStyle}>{bookingData.hospital_detailes.name}</Text>
                        <Text style={styles.comingDate}>{bookingData.time}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bookingContainer: {
        height: 105,
        width: '100%',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F6D5D5',
        shadowColor: 'rgba(246, 213, 213, 0.50)',
        elevation: 5,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    bookingCard: {
        flexDirection: 'row',
        marginLeft:5
    },
    hospitalImage: {
        height: 70,
        width: 70,
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 0.5
    },
    hospitalStyle: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom:10,
    },
    hospitalDateWrapper:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        paddingLeft:30,
    },
    comingDate:{
        fontSize:14,
        fontWeight:'500',
    },
    upComingBooking:{
        fontSize:20,
        fontWeight:'700',
        marginBottom:40,
    }

})
export default nextAppointment;