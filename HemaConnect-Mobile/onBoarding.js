import Onboarding from "react-native-onboarding-swiper";
import {Image, TouchableOpacity, Text} from "react-native";
import React from 'react';


const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnBoarding = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace("OnBoarding")}
            onDone={() => navigation.navigate("OnBoarding")}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('./assets/Pictures/default.jpg')} />,
                    title: 'Connect to the World',
                    subtitle: 'A New Way To Connect With The World',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('./assets/Pictures/default.jpg')} />,
                    title: 'Share Your Favorites',
                    subtitle: 'Share Your Thoughts With Similar Kind of People',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('./assets/Pictures/default.jpg')} />,
                    title: 'Become The Star',
                    subtitle: "Let The Spot Light Capture You",
                },
            ]}
        />

    )
}

export default OnBoarding;

