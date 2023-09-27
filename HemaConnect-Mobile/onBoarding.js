import Onboarding from "react-native-onboarding-swiper";
import {Image, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import React, {useRef} from 'react';
import Lottie from 'lottie-react-native';


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
    return (
        <View style={styles.onBoardingContainer}>
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
                                    source={require('./assets/Animations/bloodBag.json')}
                                />
                            </View>
                        ),
                        title: (
                            <View>
                                <Text style={styles.onBoardingTitleText}>The Power of Giving: Donate Blood, Save Lives</Text>
                                <Text style={styles.OnBoardingSubtitleText}>Uncover the Vital Role You Play in Ensuring a
                                    Healthier, Happier Tomorrow</Text>
                            </View>
                        )
                    },
                    {
                        backgroundColor: '#D7FDFD',
                        image: (
                            <View style={styles.animationContainer}>
                                <Lottie
                                    autoPlay loop
                                    source={require('./assets/Animations/heart.json')}
                                />
                            </View>
                        ),
                        title: (
                            <View>
                                <Text style={styles.onBoardingTitleText}>Saving Lives, One Drop at a Time</Text>
                                <Text style={styles.OnBoardingSubtitleText}>Discover the Importance of Blood Donation and Join the Lifesaving Community</Text>
                            </View>
                        ),
                    },
                    {
                        backgroundColor: '#fdffe2',
                        image: (
                            <View style={styles.animationContainer}>
                                <Lottie
                                    autoPlay loop
                                    source={require('./assets/Animations/bloodSample.json')}
                                />
                            </View>
                        ),
                        title: (
                            <View>
                                <Text style={styles.onBoardingTitleText}>Be a Hero Today: Donate Blood</Text>
                                <Text style={styles.OnBoardingSubtitleText}>Your Gift of Blood Can Make a World of Difference</Text>
                            </View>
                        ),
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    onBoardingContainer:{
        flex: 1,
    },
    animationContainer:{
        width:300,
        height:300,
    },
    onBoardingTitleText:{
        fontSize:20,
        fontWeight:"600",
        textAlign:"center"
    },
    OnBoardingSubtitleText:{
        fontSize:16,
        fontWeight:"400",
        textAlign:"center",
        marginTop:10
    }
})

export default OnBoarding;

