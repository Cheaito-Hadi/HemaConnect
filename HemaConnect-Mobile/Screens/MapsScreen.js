import {View,Text, StyleSheet} from "react-native";

const Map =()=>{
    return(
        <View style={styles.homeContainer}>
            <Text>This is the Map Page</Text>
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

export default Map;