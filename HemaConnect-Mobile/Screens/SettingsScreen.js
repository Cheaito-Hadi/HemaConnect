import {View,Text, StyleSheet} from "react-native";

const Settings =()=>{
    return(
        <View style={styles.homeContainer}>
            <Text>This is the Settings Page</Text>
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