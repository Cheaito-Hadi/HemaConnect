import React, { useState, useEffect } from "react";
import './styles.css';
import SearchBar from "../../components/ui/searchBar";
import BookingTable from "../../components/ui/BookingTable";
import axios from "axios";

const Booking = () => {
    const [bookingData, setBookingData] = useState([]);
    useEffect(() => {
        const fetchBookingData = async () => {
            debugger
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_bookings', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const bookingData = response.data.bookings;
                setBookingData(bookingData);
            } catch (error) {
                console.error("Error fetching booking data:", error);
            }
        };
        fetchBookingData();
    }, []);
    const handleDeleteBooking = async (bookingId) => {

    }
    return (
        <div className="booking-page">
                <div>
                    <SearchBar/>
                </div>
                <div>
                    {bookingData && bookingData.length > 0 ? (
                        <BookingTable bookingData={bookingData} onDelete={handleDeleteBooking}/>
                    ) : (
                        <p>Loading booking data...</p>
                    )}
                </div>
        </div>
    );
}

export default Booking;