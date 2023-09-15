import {StyleSheet, View,Button} from "react-native";
import RegisterForm from "../components/ui/registerForm";
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = ()=>{
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack(); // Navigate back to the previous screen (LoginScreen)
    };
    return(
        <View style={styles.formContainer}>
            <Button title="Go Back to Login" onPress={handleGoBack} />
            <RegisterForm/>
        </View>
    );
}
const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        flex:1,
    },

});
export default RegisterScreen;