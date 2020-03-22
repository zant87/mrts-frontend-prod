import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorPlanProjectsPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Плановые показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Крупные инвестиционные проекты</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Крупные инвестиционные проекты</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorPlanProjectsPage;
