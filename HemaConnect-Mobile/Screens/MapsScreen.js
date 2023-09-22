import {View, StyleSheet} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Map = () => {
    const [hospitals, setHospitals] = useState([]);

    const fetchHospitals = async ()=>{
        const authToken = await AsyncStorage.getItem("authToken");
        axios.get('http://192.168.0.110:8000/api/gethospitals', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(response => {
                const hospitalData = response.data.Blood_Requests;
                setHospitals(hospitalData);
            })
            .catch(error => {
                console.error('Error fetching hospital data:', error);
            });
    }

    useEffect(() => {
        fetchHospitals();
    }, []);

    return (
        <View style={styles.homeContainer}>
            <MapView
                style={styles.mapStyleContainer}
                initialRegion={{
                    latitude: 33.8938,
                    longitude: 35.5018,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {hospitals.map((hospital, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: parseFloat(hospital.hospital_info.latitude),
                            longitude: parseFloat(hospital.hospital_info.longitude),
                        }}
                        title={hospital.hospital_info.name}
                        description={`Phone: ${hospital.hospital_info.phone_number}`}
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    mapStyleContainer: {
        width: '100%',
        height: '100%',
    },
});

export default Map;