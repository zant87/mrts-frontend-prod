import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";

const AdminLoadingReportsPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Загрузка</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Бланки отчетов исполнителей</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Бланки отчетов исполнителей</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminLoadingReportsPage;
