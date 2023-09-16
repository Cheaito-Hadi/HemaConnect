import {StyleSheet, View, Button, SafeAreaView, Platform} from "react-native";
import RegisterForm from "../Components/UI/registerForm";
import {useNavigation} from '@react-navigation/native';
import ScreenTitle from "../Components/Base/screenTitle";

const RegisterScreen = () => {
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
        <View>
            <ScreenTitle
                title="Signup"
                onBackPress={handleGoBack}
            />
            <View style={styles.formContainer}>
                <RegisterForm/>
            </View>
        </View>
        </SafeAreaView>
    )
        ;
}
const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
    },
    safeAndroidView:{
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        flex: 1,
    }

});
export default RegisterScreen;