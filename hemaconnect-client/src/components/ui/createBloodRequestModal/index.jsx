import React, {useState} from 'react';
import './styles.css';
import XMark from '../../../assets/SVGs/XMark.svg'

const BloodRequestModal = ({onClose, onSubmit}) => {
    const [bloodType, setBloodType] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const bloodTypeOptions = [
        {id: 1, name: 'A+', label: 'A+'},
        {id: 2, name: 'A-', label: 'A-'},
        {id: 3, name: 'B+', label: 'B+'},
        {id: 4, name: 'B-', label: 'B-'},
        {id: 5, name: 'AB+', label: 'AB+'},
        {id: 6, name: 'AB-', label: 'AB-'},
        {id: 7, name: 'O+', label: 'O+'},
        {id: 8, name: 'O-', label: 'O-'},

    ];
    const handleBloodTypeChange = (e) => {
        setBloodType(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountError('');
    };

    const handleSubmit = () => {
        if (bloodType && amount) {
            const requestData = {bloodtype: bloodType, needed_amount: amount};
            onSubmit(requestData);
        }
        else{
            if (!amount) {
                setAmountError('Amount is required');
            }
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
                    <select
                        className="dropdown-styling"
                        id="bloodType"
                        value={bloodType}
                        onChange={handleBloodTypeChange}>

                        {bloodTypeOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
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
                {amountError && <span className="error-message">{amountError}</span>}
            </div>
            <div className="modal-button">
                <button className="confirm-button" onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    );
};

export default BloodRequestModal;
