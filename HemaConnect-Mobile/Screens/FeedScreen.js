import {View,Text, StyleSheet} from "react-native";

const FeedScreen =()=>{
    return(
      <View style={styles.homeContainer}>
          <Text>This is the Feed Page</Text>
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

export default FeedScreen;