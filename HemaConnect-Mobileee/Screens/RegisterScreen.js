import {StyleSheet, View, Button, SafeAreaView} from "react-native";
import RegisterForm from "../components/ui/registerForm";
import {useNavigation} from '@react-navigation/native';
import ScreenTitle from "../components/base/screenTitle";

const RegisterScreen = () => {
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView edges={['top']}>
        <View>
            <ScreenTitle
                title="Signup"
                onBackPress={handleGoBack}
            />
            <Button title="hello"/>
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

});
export default RegisterScreen;