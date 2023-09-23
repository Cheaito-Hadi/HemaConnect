import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView, Platform} from "react-native";
import Button from "../Components/Base/customedButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";
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
            const response = await axios.post('http://192.168.0.107:8000/api/uploadprofile', formData, {
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
    const renderProfileImage = () => {
        if (userData && userData.image_url) {
            return (
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{
                            uri: `http://192.168.0.107:8000/storage/${userData.image_url}`,
                        }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={require('../assets/Pictures/default.jpg')}
                        style={styles.defaultProfileImage}
                    />
                </TouchableOpacity>
            );
        }
    };


    return (
        <SafeAreaView edges={["top"]} style={styles.safeAndroidView}>
            <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>My Profile</Text>
            </View>
            <View style={styles.homeContainer}>
                <View style={styles.profileContainer}>
                    {renderProfileImage()}
                    <Text style={styles.uploadButtonText} onPress={pickImage}>Change Profile Image</Text>
                    <View style={styles.line}/>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Full Name:</Text>
                        <Text style={styles.infoText}>
                            {userData.first_name} {userData.last_name}
                        </Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.infoText}>{userData.email}</Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Blood Type:</Text>
                    </View>
                    <View style={styles.line}/>
                </View>
                <View style={styles.logOut}>
                    <Button buttonTitle="Logout" handlePress={handleLogout}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "10%",
        width: "100%",
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
        backgroundColor: "#ff6767",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    uploadButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
    },
    logOut: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    safeAndroidView: {
        paddingTop: Platform.OS === "android" ? 30 : 0,
        flex: 1,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6767",
        height: 80,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    textTitle: {
        alignItems: "center",
        justifyContent: "center",
        color: "#FFF",
        fontWeight: "500",
        fontSize: 20,
    },
    infoWrapper: {
        marginTop: "30%",
        width: "80%",
    },
    labelContainer: {
        marginTop: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 5,
        width: "40%",
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
        width: "60%",
        fontWeight: "400",
    },
    line: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#FF6767",
        width: "100%",
    },
    defaultProfileImage:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#FF6767",
        marginBottom: 20,
    }
});

export default Settings;
