import React, {useState} from 'react';
import './styles.css';
import bankEdit from '../../../assets/SVGs/bankEdit.svg';
import axios from 'axios';

const BankCard = ({bloodType, amount, id}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newAmount, setNewAmount] = useState(amount);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setNewAmount(amount);
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/bankstocks/${id}`,
                {amount: newAmount},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const updatedBankStock = response.data.bank_stock_data;
            console.log('Bank stock updated successfully:', updatedBankStock);

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating bank stock:', error);
        }
    };

    return (
        <div className="bank-card-container">
            <div className="type-line">
                <div>{bloodType}</div>
                <div className="liner"></div>
            </div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="amount-edit">
                        <input
                            className="edit-amount-input"
                            type="number"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            step="0.01"
                            min="0"
                            required
                        />
                        <div className="save-cancel">
                            <button type="submit" className="edit-save-btn">Save</button>
                            <button type="button" className="edit-cancel-btn" onClick={handleCancelClick}>Cancel</button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="amount-edit">
                    <span className="blood-amount">{amount} Kg</span>
                    <img className="edit-svg-icon" src={bankEdit} alt="Edit" onClick={handleEditClick}/>
                </div>
            )}
        </div>
    );
};

export default BankCard;