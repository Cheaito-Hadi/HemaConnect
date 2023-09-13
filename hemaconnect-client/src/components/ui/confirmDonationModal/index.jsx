import React, { useState } from 'react';
import './styles.css';
import XMark from '../../../assets/SVGs/XMark.svg'

const DonationModal = ({ onClose, onSubmit, selectedBooking }) => {
    const [donatedAmount, setDonatedAmount] = useState('');

    const handleDonatedAmountChange = (e) => {
        setDonatedAmount(e.target.value);
    };

    const handleSubmit = () => {
        if (donatedAmount) {
            onSubmit(donatedAmount);
        }
    };

    return (
        <div className="modal-content">
            <div className="modal-request-title">
                <h2>Confirm Donation</h2>
                <img src={XMark} alt="Close" onClick={onClose}/>
            </div>
            <div className="modal-request-info">
                <p>Name: {selectedBooking.name}</p>
                <p>Booking: {new Date(selectedBooking.bookingTime).toLocaleString()}</p>
                <p>Blood Type: {selectedBooking.bloodType}</p>
            </div>
            <div className="amount-requested">
                <label htmlFor="donatedAmount">Donated Amount (Kg):</label>
                <input
                    type="number"
                    id="donatedAmount"
                    placeholder="Enter donated amount"
                    value={donatedAmount}
                    onChange={handleDonatedAmountChange}
                    step="0.01"
                    min="0"
                    required
                />
            </div>
            <div className="modal-button">
                <button className="confirm-button" onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    );
}

export default DonationModal;