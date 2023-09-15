import {StyleSheet, View} from "react-native";
import LoginForm from "../components/ui/loginForm";

const LoginScreen = ()=>{
    return(
        <View style={styles.formContainer}>
            <LoginForm/>
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
export default LoginScreen;