import React, { useState, useEffect } from "react";
import './styles.css';
import SearchBar from "../../components/ui/searchBar";
import BookingTable from "../../components/ui/BookingTable";
import DonationModal from "../../components/ui/confirmDonationModal";
import axios from "axios";

const Booking = () => {
    const [bookingData, setBookingData] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function fetchBookingData() {
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
    }

    useEffect(() => {
        fetchBookingData();
    }, []);
    const handleAddRequestClick = (userSelectedBooking) => {
        setSelectedBooking(userSelectedBooking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/delete_booking/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            fetchBookingData();
        } catch (error) {
            console.error(`Error deleting booking ID ${id}:`, error);
        }
    }
    const handleDonation = async (donatedAmount) => {
        try {
            const donationData = {
                donated_amount: donatedAmount,
                user_id: selectedBooking.user_id,
                request_id: selectedBooking.request_id
            };
            await axios.post(`http://127.0.0.1:8000/api/create_donation`, donationData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            setBookingData((prevBookingData) =>
                prevBookingData.map((booking) =>
                    booking.id === selectedBooking.id
                        ? { ...booking, donated: true }
                        : booking
                )
            );
            handleCloseModal();
        } catch (error) {
            console.error(`Error creating donation:`, error);
        }
    }
    return (
        <div className="booking-page">
            <div>
                <SearchBar/>
            </div>
            <div>
                {bookingData && bookingData.length > 0 ? (
                    <BookingTable
                        bookingData={bookingData}
                        onDelete={handleDeleteBooking}
                        onConfirmDonation={handleAddRequestClick}
                    />
                ) : (
                    <p>Loading booking data...</p>
                )}
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <DonationModal
                        selectedBooking={selectedBooking}
                        onClose={handleCloseModal}
                        onSubmit={(donatedAmount) => {
                            handleDonation(donatedAmount);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default Booking;