import Onboarding from "react-native-onboarding-swiper";
import {TouchableOpacity, Text, View, StyleSheet} from "react-native";
import React, {useRef, useEffect, useState} from 'react';
import Lottie from 'lottie-react-native';
import Hema from "../assets/SVGs/Hema.svg";
import Connect from "../assets/SVGs/Connect.svg";


const Dots = ({selected}) => {
    const animation = useRef(null);
    let backgroundColor;

    backgroundColor = selected ? 'rgb(255,103,103)' : 'rgb(253,215,215)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}
const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal: 10}}
        {...props}
    >
        <Text style={{fontSize: 16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal: 10}}
        {...props}
    >
        <Text style={{fontSize: 16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal: 10}}
        {...props}
    >
        <Text style={{fontSize: 16}}>Done</Text>
    </TouchableOpacity>
);


const OnBoarding = ({navigation}) => {
    const [loading, setLoading] = useState(true)

    const timeOut = () => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    useEffect(() => {
        timeOut()
    }, []);
    return (
        <View style={styles.onBoardingContainer}>
            {
                loading ? <View style={styles.onBoardingContainer}>
                        <View style={styles.logoWrapper}>
                            <Hema width={100} height={50}/>
                            <Connect width={150} height={50}/>
                        </View>
                    </View> :

                    <Onboarding
                        SkipButtonComponent={Skip}
                        NextButtonComponent={Next}
                        DoneButtonComponent={Done}
                        DotComponent={Dots}
                        onSkip={() => navigation.replace("LoginScreen")}
                        onDone={() => navigation.navigate("LoginScreen")}
                        containerStyles={{paddingHorizontal: 15}}
                        pages={[
                            {
                                backgroundColor: '#FDD7D7FF',
                                image: (
                                    <View style={styles.animationContainer}>
                                        <Lottie
                                            autoPlay loop
                                            source={require('../assets/Animations/bloodBag.json')}
                                        />
                                    </View>
                                ),
                                title: (
                                    <View>
                                        <Text style={styles.onBoardingTitleText}>The Power of Giving: Donate Blood, Save
                                            Lives</Text>
                                        <Text style={styles.OnBoardingSubtitleText}>Uncover the Vital Role You Play in
                                            Ensuring a
                                            Healthier, Happier Tomorrow</Text>
                                    </View>
                                ),
                                subtitle: ""
                            },
                            {
                                backgroundColor: '#D7FDFD',
                                image: (
                                    <View style={styles.animationContainer}>
                                        <Lottie
                                            autoPlay loop
                                            source={require('../assets/Animations/heart.json')}
                                        />
                                    </View>
                                ),
                                title: (
                                    <View>
                                        <Text style={styles.onBoardingTitleText}>Saving Lives, One Drop at a Time</Text>
                                        <Text style={styles.OnBoardingSubtitleText}>Discover the Importance of Blood
                                            Donation and Join the Lifesaving Community</Text>
                                    </View>
                                ),
                                subtitle: ""
                            },
                            {
                                backgroundColor: '#fdffe2',
                                image: (
                                    <View style={styles.animationContainer}>
                                        <Lottie
                                            autoPlay loop
                                            source={require('../assets/Animations/bloodSample.json')}
                                        />
                                    </View>
                                ),
                                title: (
                                    <View>
                                        <Text style={styles.onBoardingTitleText}>Be a Hero Today: Donate Blood</Text>
                                        <Text style={styles.OnBoardingSubtitleText}>Your Gift of Blood Can Make a World
                                            of
                                            Difference</Text>
                                    </View>
                                ),
                                subtitle: ""
                            },
                        ]}
                    />}
        </View>
    )
}

const styles = StyleSheet.create({

    onBoardingContainer: {
        flex: 1,
    },
    animationContainer: {
        width: 300,
        height: 300,
    },
    onBoardingTitleText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center"
    },
    OnBoardingSubtitleText: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        marginTop: 10
    },
    logoWrapper: {
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
})

export default OnBoarding;

