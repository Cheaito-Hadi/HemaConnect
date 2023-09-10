import React from 'react';
import './styles.css';
import bankEdit from '../../../assets/SVGs/bankEdit.svg'

const BankCard = () => {
    return (
        <div className="bank-card-container">
            <div className="type-line">
                <div>
                    A+
                </div>
                <div className="liner"></div>
            </div>
            <div className="amount-edit">
                <span className="blood-amount">40 Kg</span>
                <img src={bankEdit} alt="Hema Logo" />
            </div>
        </div>
    );
}

export default BankCard;