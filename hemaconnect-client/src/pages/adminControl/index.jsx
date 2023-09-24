import React from 'react';
import "./styles.css";
import AdminTable from "../../components/ui/adminTable";
import EmployeeModal from "../../components/ui/employeeModal";

const AdminControl = ()=>{
    return(
        <div className="admin-page">
            <AdminTable/>
        </div>
    );
}

export default AdminControl;