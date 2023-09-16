import {View, Text, StyleSheet} from "react-native";
import Button from "../Components/Base/customedButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";

const Settings = () => {
    const navigation = useNavigation();
    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        navigation.navigate('LoginScreen');
    };
    return (
        <View style={styles.homeContainer}>
            <View style={styles.logOut}>
                <Button
                    buttonTitle="Logout"
                    handlePress={handleLogout}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        flex: 1,
    },
    logOut: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },


});

export default Settings;