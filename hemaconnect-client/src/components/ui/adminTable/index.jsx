import React from 'react';
import "./styles.css";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    Avatar,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Hospital", "Logo", "Address", "Add Employee"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        online: false,
        date: "19/09/17",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: true,
        date: "24/12/08",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        online: false,
        date: "04/10/21",
    },
];

const adminTable = ()=>{
    return(
        <Card className="h-full w-full">
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
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3" size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Hospital
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
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
                    {TABLE_ROWS.map(
                        ({ img, name, email, job, org, online, date }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={img} alt={name} size="sm" />
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {name}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {email}
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
                                                {job}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70"
                                            >
                                                {org}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={online ? "online" : "offline"}
                                                color={online ? "green" : "blue-gray"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}

export default adminTable;