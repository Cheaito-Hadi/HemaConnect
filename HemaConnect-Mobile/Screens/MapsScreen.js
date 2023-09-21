import {View, StyleSheet} from "react-native";
import MapView from 'react-native-maps';

const Map =()=>{
    return(
        <View style={styles.homeContainer}>
            <MapView
                style={styles.mapStyleContainer}
                initialRegion={{
                    latitude: 33.8938,
                    longitude: 35.5018,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        height:'100%',
        flex:1,
    },
    mapStyleContainer:{
     width:"100%",
        height:"100%"
    }

});

export default Map;