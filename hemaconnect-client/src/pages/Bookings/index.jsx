import React from "react";
import './styles.css';
import SearchBar from "../../components/ui/searchBar";
import BookingTable from "../../components/ui/BookingTable";

const Booking = () => {
    return (
        <div className="booking-page">
                <div>
                    <SearchBar/>
                </div>
                <div>
                    <BookingTable/>
                </div>
        </div>
    );
}

export default Booking;