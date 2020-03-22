import React, {Fragment} from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";

const AdminFromEMISSPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Загрузка</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Загрузка из ЕМИСС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Загрузка из ЕМИСС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminFromEMISSPage;
