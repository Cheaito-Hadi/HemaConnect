import React from 'react';
import './styles.css';
import {Card, Typography} from "@material-tailwind/react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const TABLE_HEAD = ["Name", "Email", "Booking Time", "Blood Type", "Anemia", "Hepatitis", "Confirm Donation", "Delete"];


const TABLE_ROWS = [
    {
        name: "John Michael",
        email: "john@example.com",
        bookingTime: "2023-09-12 14:30:00",
        bloodType: "O+",
        anemia: true,
        hepatitis: false,
    }, {
        name: "John Michael",
        email: "john@example.com",
        bookingTime: "2023-09-12 14:30:00",
        bloodType: "O+",
        anemia: true,
        hepatitis: false,
    }, {
        name: "John Michael",
        email: "john@example.com",
        bookingTime: "2023-09-12 14:30:00",
        bloodType: "O+",
        anemia: true,
        hepatitis: false,
    }, {
        name: "John Michael",
        email: "john@example.com",
        bookingTime: "2023-09-12 14:30:00",
        bloodType: "O+",
        anemia: true,
        hepatitis: false,
    },
];

export function BookingTable() {
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
                {TABLE_ROWS.map(({ name, email, bookingTime, bloodType, anemia, hepatitis }, index) => (
                    <tr key={name} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {name}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {email}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {new Date(bookingTime).toLocaleString()}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {bloodType}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {anemia ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px' }}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {hepatitis ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px', cursor: 'pointer' }}>
                            <Typography variant="small" color="green" className="font-normal">
                                <ThumbUpIcon />
                            </Typography>
                        </td>
                        <td className="p-4 align-middle" style={{ height: '50px', cursor: 'pointer' }}>
                            <Typography variant="small" className="font-normal">
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
