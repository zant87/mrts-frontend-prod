import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const AnalystReportPage = () => {
    return (
        <MDBContainer className='lg'>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Отчет перед правительством</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Отчет перед правительством</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AnalystReportPage;
