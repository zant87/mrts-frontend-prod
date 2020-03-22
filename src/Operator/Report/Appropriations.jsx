import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorReportAppropriationsPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Отчетные показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Бюджетные ассигнования в рамках программ развития транспорта</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Бюджетные ассигнования в рамках программ развития транспорта</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorReportAppropriationsPage;
