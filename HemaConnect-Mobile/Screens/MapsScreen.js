import {
    View,
    StyleSheet,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView
} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import axios from "axios";
import React, {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";
import Card from "../Components/UI/requestCard";

const Map = () => {
    const [hospitals, setHospitals] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [location, setLocation] = useState(null);
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDHUtORXXAhUn_c-UbE_6pWSPXzeKwrZpc';

    const getUserLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        const userLocation =
            await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        if (userLocation) {
            console.log(userLocation)
            setLocation({long: userLocation.coords.longitude, lat: userLocation.coords.latitude})
        }
    }

    const fetchHospitals = async () => {
        const authToken = await AsyncStorage.getItem("authToken");
        axios.get('http://192.168.0.107:8000/api/gethospitals', {
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

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const url = 'tel://76194601'
            Linking.openURL(url)
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchHospitals();
        getUserLocation();
    }, []);

    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeAndroidView}>
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
                        <>
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: parseFloat(hospital.hospital_info.latitude),
                                    longitude: parseFloat(hospital.hospital_info.longitude),
                                }}
                                title={hospital.hospital_info.name}
                                description={`Phone: ${hospital.hospital_info.phone_number}`}
                            />
                            {location && (
                                <MapViewDirections
                                    origin={{
                                        latitude: parseFloat(location.lat),
                                        longitude: parseFloat(location.long),
                                    }}
                                    destination={{
                                        latitude: parseFloat(hospital.hospital_info.latitude),
                                        longitude: parseFloat(hospital.hospital_info.longitude),
                                    }}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeColor="hotpink"
                                    strokeWidth={7}
                                />)}
                        </>

                    ))}

                    {location && (
                        <Marker coordinate={{
                            latitude: parseFloat(location.lat),
                            longitude: parseFloat(location.long),
                        }}
                        />
                    )}
                </MapView>
                <ScrollView
                    horizontal
                    style={styles.horizontalViewStyle}
                >
                    <View style={styles.cardsContainerMap}>
                        {hospitals.map((hospital, index) => (
                            <Card
                                width={250}
                                key={index}
                                imageSource={{uri: `http://192.168.0.107:8000/storage/${hospital.hospital_info.logo_url}`}}
                                hospitalName={hospital.hospital_info.name}
                                bloodType={hospital.requests[0].blood_type_name}
                            />

                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
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
    buttonRefresh: {
        width: 200,
        height: 200,
    },
    cardRequests: {
        marginRight: 10,
        flexDirection: "row",
        width: '90%',
        justifyContent: "flex-start"

    },
    safeAndroidView: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    horizontalViewStyle: {
        position: "absolute",
        bottom: 0
    },
    cardsContainerMap: {
        flexDirection: "row",
        width: '70%',
    },
});
export default Map;