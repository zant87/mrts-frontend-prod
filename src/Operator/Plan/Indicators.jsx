import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorPlanIndicatorsPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Плановые показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Индикаторы ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Индикаторы ТС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorPlanIndicatorsPage;
