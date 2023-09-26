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
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet'
import {Icon} from 'leaflet'
import "leaflet/dist/leaflet.css";
import axios from "axios";

const HospitalModal = ()=>{
    const [open, setOpen] = React.useState(false);
    const [newHospital, setNewHospital] = useState({
        name: "",
        phone_number:"",
        longitude:33.8938,
        latitude:35.5018,
    });
    const [logo, setLogo] = useState(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLogo( file );
    };

    const LeafletMarker = new Icon({
        iconSize:     [25, 25],
        iconUrl: 'https://img.icons8.com/?size=512&id=PZTTDl8ML4vy&format=png'
    });

    const handleDataChange = (e) => {
        setNewHospital({ ...newHospital, [e.target.name]: e.target.value });
    };

    const createHospital = async () => {

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
    const handleOpen = () => setOpen((cur) => !cur);

    return(
        <>
            <Button onClick={handleOpen} className="hover:shadow-none shadow-none py-4" color="red"  style={{ backgroundColor: 'rgb(255,103,103)' }}>Add Hospital</Button>
            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-full">
                    <CardHeader
                        variant="gradient"
                        color="red"
                        className="mb-3 grid h-20 place-items-center"
                    >
                        <Typography variant="h5" color="white">
                            Add Hospital
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Name" size="lg" name={"name"} value={newHospital.name} onChange={handleDataChange}/>
                        <Input label="Phone Number" size="lg" name={"phone_number"} value={newHospital.phone_number} onChange={handleDataChange}/>
                        <Input label="Logo" size="lg" type="file" name={"logo_url"} onChange={handleFileChange}/>
                    <div className="w-[100%] h-60">
                        <MapContainer center={[33.8938, 35.5018]} zoom={10} scrollWheelZoom={true} className="w-full h-full">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[newHospital.latitude, newHospital.longitude]} draggable={true} icon={LeafletMarker} eventHandlers={{dragend: handleMarkerEvent}}>
                            </Marker>
                        </MapContainer>
                    </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" color="red" onClick={createHospital} fullWidth>
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default HospitalModal;