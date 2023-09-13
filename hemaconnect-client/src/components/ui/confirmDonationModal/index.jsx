import React, {useState} from 'react';
import './styles.css';
import XMark from '../../../assets/SVGs/XMark.svg'

const DonationModal = ({onClose, onSubmit, selectedBooking}) => {
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
        <div className="modal-content-donation">
            <div className="modal-donation-title">
                <h2>Confirm Donation</h2>
                <img src={XMark} alt="Close" onClick={onClose}/>
            </div>
            <div className="modal-request-info">
                <p className="title-info-wrapper"><span className="donation-title"> Name: </span> <span
                    className="donation-info"> {selectedBooking.user_name}</span></p>
                <p className="title-info-wrapper"><span className="donation-title">Booking: </span><span
                    className="donation-info">{new Date(selectedBooking.time).toLocaleString()}</span></p>
                <p className="title-info-wrapper"><span className="donation-title">Blood Type: </span><span
                    className="donation-info">{selectedBooking.user_blood_type}</span></p>
                <div className="amount-requested">
                    <label className="donated-amount-title" htmlFor="donatedAmount">Donated Amount (Kg):</label>
                    <input
                        className="donated-amount"
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
            </div>
            <div className="modal-button">
                <button className="confirm-button" onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    );
}

export default DonationModal;