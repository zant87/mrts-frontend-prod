import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorReportSourcesPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='my-3'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Отчетные показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Источники финансирования транспорта организациями</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Источники финансирования транспорта организациями</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorReportSourcesPage;
