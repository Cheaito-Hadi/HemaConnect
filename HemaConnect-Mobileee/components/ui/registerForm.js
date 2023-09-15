import {StyleSheet, View, Text, TextInput} from "react-native";
import {RadioButton} from 'react-native-paper';
import Button from "../base/customedButton";
import { useNavigation } from '@react-navigation/native';


const registerForm = () => {
    const navigation = useNavigation();

    const handleNavigateLogin = () => {
        navigation.navigate('LoginScreen');
    };
    const radioOptions = [
        {label: 'A+', value: '1'},
        {label: 'A-', value: '2'},
        {label: 'B+', value: '3'},
        {label: 'B-', value: '4'},
        {label: 'AB+', value: '5'},
        {label: 'AB-', value: '6'},
        {label: 'O+', value: '7'},
        {label: 'O-', value: '8'},
    ];

    const renderRadioButtons = () => {
        return radioOptions.map((option, index) => (
            <View key={option.value} style={{flexDirection: 'row', alignItems: 'center', width: '25%'}}>
                <RadioButton value={option.value}/>
                <Text>{option.label}</Text>
            </View>
        ));
    };
    return (
        <View style={styles.formContainer}>
            <View style={styles.signUpWrapper}>
                <TextInput
                    style={styles.credentials}
                    placeholder="First name"
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Last name"
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.credentials}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                />
                <View>
                    <Text style={styles.bloodTypes}>Blood Type:</Text>
                    <View style={styles.radioButtonsRow}>
                        {renderRadioButtons()}
                    </View>
                </View>
                <View style={styles.signUpBtn}>
                    <Button
                        buttonTitle="Sign Up"
                    />
                </View>
                <View style={styles.signUp}>
                    <Text>Already a Donor?<Text style={{fontWeight: '700'}} onPress={handleNavigateLogin}> Log In</Text></Text>
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
    radioButtonsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    signUpWrapper: {
        alignItems: "center",
        width: '70%'
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
    bloodTypes: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '400',
    },
    signUpBtn: {
        marginTop: 25,
        width: '100%'
    },
    signUp: {
        marginTop: 20,
    },
});

export default registerForm;