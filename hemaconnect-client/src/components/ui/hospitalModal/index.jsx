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

const HospitalModal = ()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    return(
        <>
            <Button onClick={handleOpen}>Sign In</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
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