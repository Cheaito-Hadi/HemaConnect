import {View, Text, Image, StyleSheet} from "react-native";
import React from "react";

const nextAppointment = () => {
    return (
        <View>
            <Text style={styles.upComingBooking}>Upcoming Appointment</Text>
            <View style={styles.bookingContainer}>
                <View style={styles.bookingCard}>
                    <View style={styles.leftInside}>
                        <Image style={styles.hospitalImage}
                               source={require('../../assets/default.jpg')}/>
                    </View>
                    <View style={styles.hospitalDateWrapper}>
                        <Text style={styles.hospitalStyle}>Saint George Hospital</Text>
                        <Text style={styles.comingDate}>22/22/2222 12:40</Text>
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