import {Text, View, StyleSheet, Image} from "react-native";
import React from "react";

const RequestCard = ({imageSource,hospitalName,bloodType,width}) => {
    return (
        <View style={[styles.cardContainer, {width:width}]}>
            <View style={styles.insideCard}>
                <View style={styles.leftInside}>
                    <Image style={styles.imageStyling} source={imageSource} />
                    <Text style={styles.hospitalText}>{hospitalName}</Text>
                </View>
                <View style={styles.bloodTypeNeeded}>
                    <Text style={styles.bloodTypeNeededText}>{bloodType}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 70,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F6D5D5',
        shadowColor: 'rgba(246, 213, 213, 0.50)',
        elevation: 5,
        marginBottom:10
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
    imageStyling: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 0.5
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