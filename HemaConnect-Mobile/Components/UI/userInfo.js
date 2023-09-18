import {View, Text, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';

const userInfo = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('userData', (error, result) => {
            if (!error) {
                const userData = JSON.parse(result);
                setUserData(userData);
            } else {
                console.error('Error fetching user data from AsyncStorage:', error);
            }
        });
    }, []);
    return (
        <View style={styles.infoContainer}>
            {userData ? (
                <View style={styles.infoWrapper}>
                    <View style={styles.infoImage}></View>
                    <Text style={styles.infoName}>
                        {userData.first_name}
                    </Text>
                    <View style={styles.infoBlood}>
                        <Text style={styles.infoBloodText}>
                            {userData.bloodtype.name}
                        </Text>
                    </View>
                </View>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    infoContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        backgroundColor: "#F6D5D5",
        borderRadius: 30,
    },
    infoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width:'100%',
        justifyContent: "space-between",
    },
    infoName: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        textTransform:"uppercase",
    },
    infoBlood: {
        borderRadius: 30,
        height: 50,
        width: 50,
        backgroundColor: "#FF6767",
        justifyContent: "center",
        alignItems: "center",
    },
    infoImage: {
        borderRadius: 30,
        height: 50,
        width: 50,
        backgroundColor: "#FF6767",
    },
    infoBloodText:{
        backgroundColor: "#FF6767",
        justifyContent:'center',
        alignItems:'center',
        color:'#FFF',
        fontWeight:'700',
        fontSize:14,

    }

});

export default userInfo;