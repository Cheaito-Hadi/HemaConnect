import React, {useState, useEffect} from 'react';
import './styles.css';
import BankCard from "../../components/ui/bankCard";
import BloodRequest from "../../components/ui/bloodRequest";
import axios from "axios";
import AddRequest from '../../assets/SVGs/AddRequest.svg'

const Bank = () => {
    const [bankData, setBankData] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_bankstocks', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                const bloodBankData = response.data.bank_stocks_data;
                setBankData(bloodBankData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="bank-page">
            <div className="bank-cards-container">
                <div className="bank-text">Blood Bank</div>
                <div className="bank-cards">
                    {bankData.map((item, index) => (
                        <BankCard
                            key={index}
                            bloodType={item.bloodtype_name}
                            amount={item.amount}
                        />
                    ))}
                </div>
            </div>
            <div className="blood-requests-container">
                <div className="blood-requests-icon">
                <span className="bank-text">
                    Blood Requests
                </span>
                    <img src={AddRequest} alt="Add Request" />
                </div>
                <div className="bank-cards">
                    <BloodRequest/>
                    <BloodRequest/>
                    <BloodRequest/>
                    <BloodRequest/>
                    <BloodRequest/>
                    <BloodRequest/>
                    <BloodRequest/>
                </div>
            </div>
        </div>
    )
}

export default Bank;