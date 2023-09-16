import {View,Text, StyleSheet} from "react-native";

const Home =()=>{
    return(
      <View style={styles.homeContainer}>
          <Text>This is the Home Page</Text>
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

export default Home;