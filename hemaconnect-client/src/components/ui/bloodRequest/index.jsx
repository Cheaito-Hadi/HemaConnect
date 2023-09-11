import React from 'react';
import './styles.css';
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const BloodRequest = () => {
    const overallRatio = 50;

    return (
        <div className="blood-request-container">
            <div className="blood-request-wrapper">
                <div className="requested-type">
                    Requested type A+
                </div>
                <div className="progress-amount">
                    <div className="circular-bar-div">
                        <CircularProgressbar
                            value={overallRatio}
                            text={`${Math.round(overallRatio)}%`}
                            styles={buildStyles({
                                pathColor: `#ff6767`,
                                trailColor: `#FFF0F0`,
                                pathTransitionDuration: 0.5,
                                pathTransition: "none",
                                strokeLinecap: "round",
                                textColor: `#FF6767`,
                            })}
                        />
                    </div>
                    <div className="needed-amount-wrapper">
                        <span className="needed-amount"> needed amount: 20 / 30 Kg<br/> </span>
                        <span className="remaining-amount"> 10 Kg more to fill the request </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BloodRequest;