import {StyleSheet, View} from "react-native";
import RegisterForm from "../components/ui/registerForm";

const RegisterScreen = ()=>{
    return(
        <View style={styles.formContainer}>
            <RegisterForm/>
        </View>
    );
}
const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%'
    },

});
export default RegisterScreen;