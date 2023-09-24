import React from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useState } from 'react';

const HospitalModal = ()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return(
        <>
            <Button onClick={handleOpen}>Sign In</Button>
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
                        <Input label="Name" size="lg" />
                        <Input label="Phone Number" size="lg" />
                        <Input label="Logo" size="lg" type="file"/>
                    <div className="w-[100%] h-60">
                        <MapContainer center={[34, 36]} zoom={10} scrollWheelZoom={true} className="w-full h-full">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[34, 36]} draggable={true}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" color="red" onClick={handleOpen} fullWidth>
                            Sign In
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default HospitalModal;