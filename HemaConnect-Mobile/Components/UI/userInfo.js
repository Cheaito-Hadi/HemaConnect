import {View, Text, StyleSheet} from "react-native";

const userInfo = () => {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoWrapper}>
                <View style={styles.infoImage}></View>
                <Text style={styles.infoName}>Hadi Cheaito</Text>
                <View style={styles.infoBlood}>
                    <Text style={styles.infoBloodText}>A+</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    infoContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        backgroundColor: "#F6D5D5",
        borderRadius: 30,
    },
    infoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width:'100%',
        justifyContent: "space-between",
    },
    infoName: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
    },
    infoBlood: {
        borderRadius: 30,
        height: 50,
        width: 50,
        backgroundColor: "#FF6767",
        justifyContent: "center",
        alignItems: "center",
    },
    infoImage: {
        borderRadius: 30,
        height: 50,
        width: 50,
        backgroundColor: "#FF6767",
    },
    infoBloodText:{
        backgroundColor: "#FF6767",
        justifyContent:'center',
        alignItems:'center',
        color:'#FFF',
        fontWeight:'700',
        fontSize:14,

    }

});

export default userInfo;