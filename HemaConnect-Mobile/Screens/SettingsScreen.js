import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Button from "../Components/Base/customedButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Settings = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userDataJson = await AsyncStorage.getItem("User Data");
            if (userDataJson) {
                const userDataObj = JSON.parse(userDataJson);
                setUserData(userDataObj);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("User Data");
        await AsyncStorage.removeItem("authToken");
        navigation.navigate('LoginScreen');
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        const formData = new FormData();
        formData.append('profile_image', {
            uri,
            type: 'image/jpeg',
            name: 'profile.jpg',
        });

        try {
            debugger
            const authToken = await AsyncStorage.getItem("authToken");
            const response = await axios.post('http://192.168.0.113:8000/api/uploadprofile', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data; ',
                },
            });
            console.log("Image upload response:", response.data);
        } catch (error) {
            console.error("Image upload error:", error);
        }
    };

    return (
        <View style={styles.homeContainer}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: `http://192.168.0.113:8000/storage/${userData.image_url}` }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImage}
                >
                    <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.logOut}>
                <Button
                    buttonTitle="Logout"
                    handlePress={handleLogout}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        flex: 1,
    },
    profileContainer: {
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#000',
        borderRadius:10,
        width: 150,
        height: 150,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    uploadButtonText: {
        color: 'white',
    },
    logOut: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default Settings;
