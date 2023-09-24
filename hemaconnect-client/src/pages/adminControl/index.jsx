import React from 'react';
import "./styles.css";
import AdminTable from "../../components/ui/adminTable";
import HospitalModal from "../../components/ui/hospitalModal";

const AdminControl = ()=>{
    return(
        <div className="admin-page">
            <AdminTable/>
            <HospitalModal/>
        </div>
    );
}

export default AdminControl;