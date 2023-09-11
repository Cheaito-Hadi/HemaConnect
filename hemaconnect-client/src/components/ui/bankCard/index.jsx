import React from 'react';
import './styles.css';
import bankEdit from '../../../assets/SVGs/bankEdit.svg'

const BankCard = ({bloodType, amount}) => {
    return (
        <div className="bank-card-container">
            <div className="type-line">
                <div>
                    {bloodType}
                </div>
                <div className="liner"></div>
            </div>
            <div className="amount-edit">
                <span className="blood-amount">{amount} Kg</span>
                <img src={bankEdit} alt="Hema Logo" />
            </div>
        </div>
    );
}

export default BankCard;