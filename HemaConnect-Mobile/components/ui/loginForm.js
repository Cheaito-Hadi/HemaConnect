import {StyleSheet, View, Text, TextInput} from "react-native";
import SVGImg from '../../assets/Hema.svg';
import Button from "../base/customedButton";
import { useNavigation } from '@react-navigation/native';

const loginForm = () => {
    const navigation = useNavigation();

    const handleNavigateSignUp = () => {
        navigation.navigate('RegisterScreen');
    };
    return (
        <View style={styles.formContainer}>
            {/*<SVGImg width={200} height={200} />*/}
            <View style={styles.loginWrapper}>
                <Text style={styles.loginText}>Log In</Text>
                <Text style={styles.hero}>Welcome, Hero of Compassion!</Text>
                <TextInput
                    style={styles.credentials}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <View style={styles.loginBtn}>
                    <Button
                        buttonTitle="Login"
                    />
                </View>
                <View style={styles.signUp}>
                    <Text>Not a Donor yet?<Text style={{fontWeight: '700'} } onPress={handleNavigateSignUp}> Sign Up </Text></Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%'
    },
    loginWrapper: {
        alignItems: "center",
        width: '70%'
    },
    loginText: {
        fontSize: 32,
        fontWeight: "500",
        fontStyle: "normal",
        marginBottom:5,
    },
    hero: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 40,
    },
    credentials: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 20,
        backgroundColor: '#FFF',
        height: 45,
        borderRadius: 10,
        padding: 5,
    },
    loginBtn: {
        marginTop: 50,
        width: '100%'
    },
    signUp: {
        marginTop:20,
    },

});

export default loginForm;