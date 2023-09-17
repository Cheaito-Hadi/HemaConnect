import {Text, View, StyleSheet, Image} from "react-native";

const RequestCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.insideCard}>
                <View style={styles.leftInside}>
                    <Image style={{height: 50, width: 50}} source={require('../../assets/SaintGeorge.png')}/>
                    <Text style={styles.hospitalText}>Saint George Hospital</Text>
                </View>
                <View style={styles.bloodTypeNeeded}>
                    <Text style={styles.bloodTypeNeededText}>O+</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 70,
        width: '100%',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F6D5D5',
        shadowColor: 'rgba(246, 213, 213, 0.50)',
        elevation: 5,
    },
    insideCard: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center"
    },
    leftInside: {
        flexDirection: "row",
        alignItems: "center",
    },
    hospitalText: {
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 10
    },
    bloodTypeNeeded: {
        backgroundColor: '#FF6767',
        justifyContent: "center",
        alignItems: 'center',
        maxHeight: 50,
        maxWidth: 90,
        padding: 5,
        flexWrap: "wrap",
        borderRadius: 5,
    },
    bloodTypeNeededText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700'
    }

})
export default RequestCard