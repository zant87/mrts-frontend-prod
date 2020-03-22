import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorReportFactPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Отчетные показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Фактические значения показателей</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Фактические значения показателей</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorReportFactPage;
