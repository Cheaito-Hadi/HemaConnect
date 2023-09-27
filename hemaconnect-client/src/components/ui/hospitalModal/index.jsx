import React, {useState} from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import {Marker} from 'react-leaflet'
import {Icon} from 'leaflet'
import "leaflet/dist/leaflet.css";
import axios from "axios";

const HospitalModal = ({refreshHospitalData}) => {
    const [open, setOpen] = React.useState(false);
    const initialHospitalState = {
        name: "",
        phone_number: "",
        longitude: 35.5018,
        latitude: 33.8938,
    };
    const [newHospital, setNewHospital] = useState(initialHospitalState);
    const [logo, setLogo] = useState(null)
    const [errors, setErrors] = useState({});
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
    };

    const LeafletMarker = new Icon({
        iconSize: [25, 25],
        iconUrl: 'https://img.icons8.com/?size=512&id=PZTTDl8ML4vy&format=png'
    });
    const resetHospitalState = () => {
        setNewHospital(initialHospitalState);
        setLogo(null);
        setErrors({});
    };

    const handleDataChange = (e) => {
        setNewHospital({...newHospital, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});
    };

    const createHospital = async () => {
        const validationErrors = {};
        if (!newHospital.name.trim()) {
            validationErrors.name = "Name is required";
        }
        if (!newHospital.phone_number.trim()) {
            validationErrors.phone_number = "Phone Number is required";
        }
        if (!logo) {
            validationErrors.logo_url = "Logo is required";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const addressData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newHospital.latitude},${newHospital.longitude}&key=AIzaSyDHUtORXXAhUn_c-UbE_6pWSPXzeKwrZpc`)

        const formData = new FormData()
        formData.append('name', newHospital.name)
        formData.append('longitude', newHospital.longitude)
        formData.append('latitude', newHospital.latitude)
        formData.append('phone_number', newHospital.phone_number)
        formData.append('logo_url', logo)
        formData.append('address', addressData.data.results[0].formatted_address)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_hospital', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            if (response.status === 200) {
                setOpen((cur) => !cur)
                refreshHospitalData();
            }
        } catch (error) {
            console.error('Error creating blood request:', error);
        }
    };

    const handleMarkerEvent = (e) => {
        setNewHospital({
            ...newHospital,
            latitude: e.target._latlng.lat,
            longitude: e.target._latlng.lng
        });
    };
    const handleOpen = () => {
        setOpen((cur) => !cur);
        resetHospitalState();
    };

    return (
        <>
            <Button onClick={handleOpen} className="hover:shadow-none shadow-none py-4"
                    style={{backgroundColor: 'rgb(255,103,103)'}}>Add Hospital</Button>
            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-full mb-0.5">
                    <CardHeader
                        variant="gradient"
                        style={{backgroundColor: 'rgb(255,103,103)'}}
                        className="mb-0.5 mt-0.3 grid h-20 place-items-center"
                    >
                        <Typography variant="h5" color="white">
                            Add Hospital
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Name" size="lg" name={"name"} value={newHospital.name}
                               onChange={handleDataChange}/>
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                        <Input label="Phone Number" size="lg" name={"phone_number"} value={newHospital.phone_number}
                               onChange={handleDataChange}/>
                        {errors.phone_number && <span className="text-red-500">{errors.phone_number}</span>}
                        <Input label="Logo" size="lg" type="file" name={"logo_url"} onChange={handleFileChange}/>
                        {errors.logo_url && <span className="text-red-500">{errors.logo_url}</span>}
                        <div className="w-[100%] h-60">
                            <MapContainer center={[newHospital.latitude, newHospital.longitude]} zoom={10}
                                          scrollWheelZoom={true} className="w-full h-full">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[newHospital.latitude, newHospital.longitude]} draggable={true}
                                        icon={LeafletMarker} eventHandlers={{dragend: handleMarkerEvent}}>
                                </Marker>
                            </MapContainer>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className="bg-transparent shadow-none" style={{backgroundColor: 'rgb(255,103,103)'}}
                                onClick={createHospital} fullWidth>
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default HospitalModal;