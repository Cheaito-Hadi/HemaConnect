import {View,Text, StyleSheet, SafeAreaView, Platform} from "react-native";
import UserInfo from "../Components/UI/userInfo";
import Donation from "../Components/UI/dontaionForm";
import RequestCard from "../Components/UI/requestCard";

const FeedScreen =()=>{
    return(
        <SafeAreaView edges={['top']} style={styles.safeAndroidView}>
      <View style={styles.homeContainer}>
          <View style={styles.userInfoField}>
          <UserInfo/>
          </View>
          <View style={styles.donationContainer}>
              <Donation/>
          </View>
          <View>
              <RequestCard/>
          </View>
      </View>
            </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        width: '100%',
        flex:1,
        backgroundColor:'#F7F0F3',
    },
    userInfoField:{
        height:50,
        marginTop:20,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width:'90%'
    },
    safeAndroidView:{
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        flex: 1,
    },
    donationContainer:{
        marginTop:20,
        width:'90%',
    }

});

export default FeedScreen;