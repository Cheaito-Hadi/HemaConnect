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
    Option,
} from "@material-tailwind/react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add"

const bloodTypeOptions = [
    {id: 1, label: 'A+'},
    {id: 2, label: 'A-'},
    {id: 3, label: 'B+'},
    {id: 4, label: 'B-'},
    {id: 5, label: 'AB+'},
    {id: 6, label: 'AB-'},
    {id: 7, label: 'O+'},
    {id: 8, label: 'O-'},
];
const EmployeeModal = ({hospital_id}) => {
    const [selectedBloodType, setSelectedBloodType] = useState(1);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const initialEmployeeState = {
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        bloodtype_id: selectedBloodType,
        hospital_id,
    };
    const [newEmployee, setNewEmployee] = useState(initialEmployeeState);

    const resetForm = () => {
        setSelectedBloodType(1);
        setErrors({});
        setNewEmployee(initialEmployeeState);
    };
    const createEmployee = async () => {

        const validationErrors = {};
        if (!newEmployee.first_name.trim()) {
            validationErrors.first_name = "First name is required";
        }
        if (!newEmployee.last_name.trim()) {
            validationErrors.last_name = "Last name is required";
        }
        if (!newEmployee.email.trim()) {
            validationErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newEmployee.email)
        ) {
            validationErrors.email = "Invalid email address";
        }
        if (!newEmployee.password.trim()) {
            validationErrors.password = "Password is required";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData()
        formData.append('first_name', newEmployee.first_name)
        formData.append('last_name', newEmployee.last_name)
        formData.append('email', newEmployee.email)
        formData.append('password', newEmployee.password)
        formData.append('bloodtype_id', newEmployee.bloodtype_id)
        formData.append('hospital_id', newEmployee.hospital_id)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_employee', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            if (response.status === 200) {
                setOpen((cur) => !cur)
            }

        } catch (error) {
            console.error('Error creating Employee:', error);
        }
    };

    const handleBloodTypeChange = (selectedValue) => {
        setSelectedBloodType(selectedValue);
        console.log(selectedValue)
    };

    const handleDataChange = (e) => {
        setNewEmployee({...newEmployee, [e.target.name]: e.target.value});
    };


    const handleOpen = () => {
        setOpen((cur) => !cur);
        resetForm();
    };

    return (
        <>
            <Typography
                variant="large"
                color="red"
                className="font-normal"
                onClick={() => handleOpen()}
            >
  <span
      style={{
          width: '24px',
          height: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid red',
          borderRadius: '50%',
          cursor: 'pointer',
      }}
  >
    <AddIcon style={{fontSize: '20px'}}/>
  </span>
            </Typography>

            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-full">
                    <CardHeader
                        variant="gradient"
                        style={{backgroundColor: 'rgb(255,103,103)'}}
                        className="mb-3 grid h-20 place-items-center"
                    >
                        <Typography variant="h5" color="white">
                            Add Employee
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            label="First Name"
                            size="lg"
                            name={"first_name"}
                            value={newEmployee.first_name}
                            onChange={handleDataChange}
                        />
                        {errors.first_name && (
                            <span className="text-red-500">{errors.first_name}</span>
                        )}
                        <Input
                            label="Last Name"
                            size="lg"
                            name={"last_name"}
                            value={newEmployee.last_name}
                            onChange={handleDataChange}
                        />
                        {errors.last_name && (
                            <span className="text-red-500">{errors.last_name}</span>
                        )}
                        <Input
                            label="Email"
                            size="lg"
                            name={"email"}
                            value={newEmployee.email}
                            onChange={handleDataChange}
                        />
                        {errors.email && (
                            <span className="text-red-500">{errors.email}</span>
                        )}
                        <Input
                            label="Password"
                            size="lg"
                            name={"password"}
                            type="password"
                            value={newEmployee.password}
                            onChange={handleDataChange}
                        />
                        {errors.password && (
                            <span className="text-red-500">{errors.password}</span>
                        )}
                        <div className="w-72">
                            <Select
                                label="Blood Type"
                                value={selectedBloodType}
                                onChange={(value) => handleBloodTypeChange(value)}
                            >
                                {bloodTypeOptions.map((option) => (
                                    <Option key={option.id} value={option.id}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                            {errors.bloodtype_id && (
                                <span className="text-red-500">{errors.bloodtype_id}</span>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className="bg-transparent shadow-none" style={{backgroundColor: 'rgb(255,103,103)'}}
                                onClick={createEmployee} fullWidth>
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default EmployeeModal;