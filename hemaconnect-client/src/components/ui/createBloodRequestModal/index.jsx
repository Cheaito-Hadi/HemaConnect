import React, {useState} from 'react';
import './styles.css';
import XMark from '../../../assets/SVGs/XMark.svg'

const BloodRequestModal = ({onClose, onSubmit}) => {
    const [bloodType, setBloodType] = useState('');
    const [amount, setAmount] = useState('');

    const handleBloodTypeChange = (e) => {
        setBloodType(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        if (bloodType && amount) {
            onSubmit({bloodType, amount});
        }
    };

    return (
        <div className="modal-content">
            <div className="modal-request-title">
                <h2>Request for Blood</h2>
                <img src={XMark} alt="Close" onClick={onClose}/>
            </div>
            <div className="label-wrappers">
            <div className="bloodtype-drop-label">
                <label htmlFor="bloodType">Blood Type:</label>
                <select className="dropdown-styling" id="bloodType" value={bloodType} onChange={handleBloodTypeChange}>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <div className="amount-requested">
                <label htmlFor="amount">Amount (Kg):</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Requested amount"
                    value={amount}
                    onChange={handleAmountChange}
                    step="0.01"
                    min="0"
                    required
                />
            </div>
            </div>
            <div className="modal-button">
                <button className="confirm-button" onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    );
};

export default BloodRequestModal;
