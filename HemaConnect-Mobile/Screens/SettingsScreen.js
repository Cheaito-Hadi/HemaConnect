import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView, Platform} from "react-native";
import Button from "../Components/Base/customedButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {Ionicons} from "@expo/vector-icons";

const Settings = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userDataJson = await AsyncStorage.getItem("userData");
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

        if (!result.canceled) {
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
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
            <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>My Profile</Text>

            </View>
            <View style={styles.homeContainer}>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={{uri: `http://192.168.0.113:8000/storage/${userData?.image_url}`}}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.uploadButtonText}>Change Profile Image</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.logOut}>
                    <Button
                        buttonTitle="Logout"
                        handlePress={handleLogout}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        justifyContent: "flex-start",
        marginTop:'10%',
        width: '100%',
        flex: 1,
    },
    profileContainer: {
        borderRadius: 100,
        width: 200,
        height: 200,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: '#ff6767',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent:"center",
        alignItems:"center",
    },
    uploadButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
    logOut: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    safeAndroidView: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FF6767',
        height: 80,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    textTitle: {
        alignItems: "center",
        justifyContent: "center",
        color: '#FFF',
        fontWeight: '500',
        fontSize: 20,
    }
});

export default Settings;
