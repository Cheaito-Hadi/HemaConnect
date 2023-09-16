import {View,Text, StyleSheet} from "react-native";
import Button from "../Components/Base/customedButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const Settings =()=>{
    const handleLogout = async () => {
        try {
            debugger
            const authToken = await AsyncStorage.getItem("authToken");
            if (authToken) {
                const response = await axios.post(
                    "http://192.168.0.113:8000/api/logout", {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },}
                );
                if (response.status === 200) {
                    await AsyncStorage.removeItem("authToken");
                } else {
                    console.error("Logout failed");
                }
            } else {
                console.error("No token found");
            }
        } catch (error) {
            console.error("Error during logout", error);
        }
    };
    return(
        <View style={styles.homeContainer}>
            <Text>This is the Settings Page</Text>
            <Button
                buttonTitle="Logout"
            handlePress={handleLogout}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        flex:1,
    },

});

export default Settings;