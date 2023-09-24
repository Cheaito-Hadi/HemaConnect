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
    Select,
    Option
} from "@material-tailwind/react";

const bloodTypeOptions = [
    { id: 1, label: 'A+' },
    { id: 2, label: 'A-' },
    { id: 3, label: 'B+' },
    { id: 4, label: 'B-' },
    { id: 5, label: 'AB+' },
    { id: 6, label: 'AB-' },
    { id: 7, label: 'O+' },
    { id: 8, label: 'O-' },
];
const EmployeeModal = ()=>{
    const [selectedBloodType, setSelectedBloodType] = useState('');
    const [open, setOpen] = React.useState(false);
    const [newEmployee, setNewEmployee] = useState({
        first_name: "",
        last_name:"",
        password:"",
        email:"",
        bloodtype_id:""
    });

    const handleBloodTypeChange = (event) => {
        setSelectedBloodType(event.target.value);
    };

    const handleDataChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };


    const handleOpen = () => setOpen((cur) => !cur);

    return(
        <>
            <Button onClick={handleOpen}>Add Employee</Button>
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
                            Add Employee
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="First Name" size="lg" name={"first_name"} value={newEmployee.first_name} onChange={handleDataChange}/>
                        <Input label="Last Name" size="lg" name={"last_name"} value={newEmployee.last_name} onChange={handleDataChange}/>
                        <Input label="Email" size="lg" name={"email"} value={newEmployee.email} onChange={handleDataChange}/>
                        <Input label="Password" size="lg" name={"password"} value={newEmployee.password} onChange={handleDataChange}/>
                        <div className="w-72">
                            <Select
                                label="Select Version"
                                value={selectedBloodType}
                                onChange={(value) => handleBloodTypeChange(value)}
                            >
                                {bloodTypeOptions.map((option) => (
                                    <Option key={option.id} value={option.id}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" color="red" fullWidth>
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default EmployeeModal;