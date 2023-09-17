import {Text, View, StyleSheet} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const lastDonationData = {
    dayNumber: '1',
    date: '02-05-2023',
};

const donateAfterData = {
    dayNumber: '0',
    date: '08-05-2023',
};

const Donation = () => {
    let renderView;
    if (donateAfterData.dayNumber === '0') {
        renderView = (
            <View style={styles.Able}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#ffcd01" style={styles.icon} />
                <Text style={styles.ableText}>Your health shows that you are able to donate!</Text>
            </View>
        );
    } else {
        renderView = (
            <View style={styles.notAble}>
                <MaterialCommunityIcons name="alert-circle" size={20} color="#ffcd01" style={styles.icon} />
                <Text style={styles.notAbleText}>Your health shows that you are ineligible to donate</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.donationWrapper}>
                <View style={styles.lastDonation}>
                    <Text style={styles.lastAfter}>Last Donation</Text>
                    <Text style={styles.dayNumber}>{lastDonationData.dayNumber}</Text>
                    <Text style={styles.daysLeft}>Days ago</Text>
                    <Text style={styles.dateText}>{lastDonationData.date}</Text>
                </View>
                <View style={styles.lastDonation}>
                    <Text style={styles.lastAfter}>Donate After</Text>
                    <Text style={styles.dayNumber}>{donateAfterData.dayNumber}</Text>
                    <Text style={styles.daysLeft}>Days</Text>
                    <Text style={styles.dateText}>{donateAfterData.date}</Text>
                </View>
            </View>
            {renderView}
        </View>
    );
};

const styles = StyleSheet.create({
    donationWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%'
    },
    lastDonation: {
        height: 150,
        width: 175,
        backgroundColor: '#FF6767',
        borderRadius: 10,
        padding: 10,
    },
    lastAfter: {
        color: 'rgba(255, 255, 255, 0.50)',
        fontSize: 14,
        fontWeight: '700',
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 5
    },
    dayNumber: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10
    },
    daysLeft: {
        color: '#FFF',
        textAlign: "center",
        fontSize: 12,
        fontWeight: '700',
        textTransform: "uppercase",
    },
    dateText: {
        color: 'rgba(255, 255, 255, 0.50)',
        fontSize: 10,
        fontWeight: '700',
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 10
    },
    notAble: {
        height: 36,
        borderRadius: 10,
        backgroundColor: '#2D2D2D',
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        flexDirection: 'row',
    },
    notAbleText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        textTransform: "uppercase",
    },
    icon: {
        marginRight: 5,
    },
    Able:{
        height: 36,
        borderRadius: 10,
        backgroundColor: '#007c00',
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        flexDirection: 'row',
    },
    ableText:{
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        textTransform: "uppercase",
    }

})
export default Donation;