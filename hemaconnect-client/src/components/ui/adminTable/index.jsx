import React, {useState, useEffect} from 'react';
import "./styles.css";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import HospitalModal from "../hospitalModal";
import EmployeeModal from "../employeeModal";

const TABLE_HEAD = ["Hospital", "Phone Number", "Address", "Add Employee"];

const AdminTable = () => {
    const [hospitalData, setHospitalData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    async function fetchHospitalData() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getAllhospitals', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setHospitalData(response.data.all_hospitals);
        } catch (error) {
            console.error("Error fetching hospital data:", error);
        }
    }

    useEffect(() => {
        fetchHospitalData();
    }, []);

    return (
        <Card className="h-full w-[95%] mt-5 overflow-auto mb-10">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Hospital List
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all hospitals
                        </Typography>
                    </div>
                    <HospitalModal
                        refreshHospitalData={fetchHospitalData}
                    />
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <div className="max-h-[420px] overflow-y-auto">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {hospitalData.map(
                            ({name, logo_url, phone_number, latitude, longitude, id, address}, index) => {
                                const isLast = index === hospitalData.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={`http://127.0.0.1:8000/storage/${logo_url}`} alt={logo_url}
                                                        size="sm"/>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="md"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                        style={{fontWeight: 600}}
                                                    >
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {phone_number}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {/*{latitude}-{longitude}*/}
                                                {address ? address : "Unknown Address"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <EmployeeModal hospital_id={id}/>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}

export default AdminTable;