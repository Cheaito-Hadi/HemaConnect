import {
    View,
    StyleSheet,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Modal,
    Image
} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import axios from "axios";
import React, {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";
import Card from "../Components/UI/requestCard";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BlueMarker from '../assets/Pictures/MyMarker.png'

const Map = () => {
    const [hospitals, setHospitals] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [location, setLocation] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showStreet, setShowStreet] = useState(false);
    const [destination, setDestination] = useState(null)
    const [selectedHospital, setSelectedHospital] = useState(null);
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDHUtORXXAhUn_c-UbE_6pWSPXzeKwrZpc';

    const getUserLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        const userLocation =
            await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        if (userLocation) {
            setLocation({long: userLocation.coords.longitude, lat: userLocation.coords.latitude})
        }
    }

    const fetchHospitals = async () => {
        const authToken = await AsyncStorage.getItem("authToken");
        axios.get('http://192.168.0.106:8000/api/gethospitals', {
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
    const openModal = (hospital) => {
        setSelectedHospital(hospital);
        setIsModalVisible(true);
        setDestination(
            {
                latitude: parseFloat(hospital.hospital_info.latitude),
                longitude: parseFloat(hospital.hospital_info.longitude),
            });

        setShowStreet(false);
    };

    const closeModal = () => {
        setSelectedHospital(null);
        setIsModalVisible(false);
    };

    const onCall = async (phoneNumber) => {
        setRefreshing(true);
        try {
            const url = `tel:${phoneNumber}`;
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
                        <React.Fragment key={index}>
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: parseFloat(hospital.hospital_info.latitude),
                                    longitude: parseFloat(hospital.hospital_info.longitude),
                                }}
                                title={hospital.hospital_info.name}
                                description={`Phone: ${hospital.hospital_info.phone_number}`}
                            />
                        </React.Fragment>

                    ))}
                    {showStreet && location && (
                        <MapViewDirections
                            origin={{
                                latitude: parseFloat(location.lat),
                                longitude: parseFloat(location.long),
                            }}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeColor="hotpink"
                            strokeWidth={7}
                        />)}

                    {location && (
                        <Marker
                            coordinate={{
                                latitude: parseFloat(location.lat),
                                longitude: parseFloat(location.long),
                            }}
                        >
                            <Image
                                source={BlueMarker}
                                style={{width: 40, height: 40}}
                            />
                        </Marker>
                    )}
                </MapView>
                <Text style={styles.bloodRequestsMap}>Blood Requests</Text>
                <ScrollView horizontal style={styles.horizontalViewStyle}>
                    <View style={styles.cardsContainerMap}>
                        {hospitals.map((hospital, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => openModal(hospital)}
                            >
                                <Card
                                    width={250}
                                    imageSource={{uri: `http://192.168.0.106:8000/storage/${hospital.hospital_info.logo_url}`}}
                                    hospitalName={hospital.hospital_info.name}
                                    bloodType={hospital.requests[0].blood_type_name}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        {selectedHospital && (
                            <View style={styles.modalContentMap}>
                                <View style={styles.closeWrapper}>
                                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                        <Icon name="close" size={24} color="#000"/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalHeader}>
                                    <Text
                                        style={styles.modalTitle}>{selectedHospital.hospital_info.name} Hospital</Text>

                                </View>
                                <View style={styles.modalBody}>
                                    <Text>Phone: {selectedHospital.hospital_info.phone_number}</Text>
                                </View>
                                <View style={styles.modalButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.modalButtonDirections}
                                        onPress={() => {
                                            setShowStreet(true)
                                            setIsModalVisible(false)
                                        }}
                                    >
                                        <Text style={styles.modalTextDirections}>Directions</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modalButtonCall}
                                        onPress={() => onCall(selectedHospital.hospital_info.phone_number)}
                                    >
                                        <Text style={styles.modalTextCall}>Call</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </Modal>
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
        flex: 1,
    },
    horizontalViewStyle: {
        position: "absolute",
        bottom: 0,
    },
    cardsContainerMap: {
        flexDirection: "row",
        width: '70%',
        marginHorizontal: 10
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContentMap: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        alignItems: "center",
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    modalBody: {
        marginBottom: 20,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalButtonDirections: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        width: '45%'
    },
    modalButtonCall: {
        backgroundColor: '#ff6767',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        width: '45%'
    },
    modalTextDirections: {
        color: '#fff',
        textAlign: "center",
        fontWeight: '500',
    },
    modalTextCall: {
        color: '#fff',
        textAlign: "center",
        fontWeight: '500'
    },
    closeWrapper: {
        width: '100%',
        alignItems: "flex-end",
    },
    closeButton: {
        color: '#000',
    },
    bloodRequestsMap: {
        position: "absolute",
        bottom: 90,
        left: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: '500',
        borderWidth: 1,
        borderColor: '#F6D5D5',
        shadowColor: 'rgba(246, 213, 213, 0.50)',
        elevation: 5,
    }
});
export default Map;