import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";

const AdminLoadingFromSDMXPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Загрузка</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Загрузка из SDMX</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Загрузка из SDMX</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminLoadingFromSDMXPage;
