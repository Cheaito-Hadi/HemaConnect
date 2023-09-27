import Onboarding from "react-native-onboarding-swiper";
import {Image, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import React, {useRef} from 'react';
import Lottie from 'lottie-react-native';


const Dots = ({selected}) => {
    const animation = useRef(null);
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

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
                        backgroundColor: '#a6e4d0',
                        image: (
                            <View style={styles.animationContainer}>
                                <Lottie
                                    autoPlay loop
                                    source={require('./assets/Animations/bloodBag.json')}
                                />
                            </View>
                        ),
                        title: 'Connect to the World',
                        subtitle: 'A New Way To Connect With The World',
                    },
                    {
                        backgroundColor: '#a6e4d0',
                        image: (
                            <View style={styles.animationContainer}>
                                <Lottie
                                    autoPlay loop
                                    source={require('./assets/Animations/heart.json')}
                                />
                            </View>
                        ),
                        title: 'Connect to the World',
                        subtitle: 'A New Way To Connect With The World',
                    },
                    {
                        backgroundColor: '#a6e4d0',
                        image: (
                            <View style={styles.animationContainer}>
                                <Lottie
                                    autoPlay loop
                                    source={require('./assets/Animations/bloodSample.json')}
                                />
                            </View>
                        ),
                        title: 'Connect to the World',
                        subtitle: 'A New Way To Connect With The World',
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
        backgroundColor:'white',
    }
})

export default OnBoarding;

