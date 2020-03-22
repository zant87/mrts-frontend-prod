import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorPlanActivitiesPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Плановые показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Мероприятия по реализации ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Мероприятия по реализации ТС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorPlanActivitiesPage;
