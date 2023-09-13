import React from 'react';
import './styles.css';
import {Card, Typography} from "@material-tailwind/react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DonationModal from "../confirmDonationModal";

const TABLE_HEAD = ["Name", "Email", "Booking Time", "Blood Type", "Anemia", "Hepatitis", "Confirm Donation", "Delete"];

export function BookingTable({bookingData, onDelete, onConfirmDonation }) {
    return (
        <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="black"
                                className="font-bold leading-none opacity-70 align-middle"
                            >
                                {head}
                            </Typography>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {bookingData.map((booking, index) => (
                    <tr key={booking.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {booking.user_name}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {booking.user_email}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {new Date(booking.time).toLocaleString()}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {booking.user_blood_type}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {booking.anemia === 1 ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {booking.hepatitis === 1 ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px', cursor: 'pointer' }}>
                            <Typography variant="small" color="green" className="font-normal" onClick={() => onConfirmDonation(booking)}>
                                <ThumbUpIcon />
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px', cursor: 'pointer' }}>
                            <Typography variant="small" className="font-normal" onClick={() => onDelete(booking.id)}>
                                <DeleteIcon color="error" />
                            </Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>
    );
}

export default BookingTable;
