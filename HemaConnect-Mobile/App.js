import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import Button from "./components/base/customedButton";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.loginScreen}>
                <Button buttonTitle="Log In"/>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F0F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginScreen: {
        width: '80%',
        alignItems: 'center',
    },
});
