import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const AdminParametersPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Структура</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Показатели для расчета индикаторов ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Показатели для расчета индикаторов ТС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminParametersPage;
