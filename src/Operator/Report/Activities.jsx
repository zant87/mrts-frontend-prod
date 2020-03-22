import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorReportActivitiesPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Отчетные показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Выполнение мероприятий по реализации ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Выполнение мероприятий по реализации ТС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorReportActivitiesPage;
