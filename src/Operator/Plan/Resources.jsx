import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorPlanResourcesPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Плановые показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Ресурсное обеспечение ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Ресурсное обеспечение ТС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorPlanResourcesPage;
