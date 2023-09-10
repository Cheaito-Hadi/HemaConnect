import React from "react";
import './styles.css';
import BankCard from "../../components/ui/bankCard";

const Bank = () => {
    return (
        <div className="bank-page">
            <div className="bank-cards-container">
                <div className="bank-text">Blood Bank</div>
                <div className="bank-cards">
                    <BankCard/>
                    <BankCard/>
                    <BankCard/>
                    <BankCard/>
                    <BankCard/>
                    <BankCard/>
                    <BankCard/>
                    <BankCard/>
                </div>
            </div>
        </div>
    )
}

export default Bank;