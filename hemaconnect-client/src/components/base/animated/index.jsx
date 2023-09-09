import React from 'react';
import './styles.css'
import Lottie from "lottie-react";
import animation from '../../../assets/animations/loginBloodDonation.json'

function AnimatedIntro () {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
        speed: 2,
    };

    return (
        <div className="intro-container">
            <div className="lotti-animation">
                <Lottie options={lottieOptions}  animationData={animation} height={50} width={60}/>
            </div>
        </div>

    );
}
export default AnimatedIntro;