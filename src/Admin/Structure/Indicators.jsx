import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";

const AdminIndicatorsPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Структура</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Индикаторы по целям ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Индикаторы по целям ТС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminIndicatorsPage;
