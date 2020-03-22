import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const AdminArchiveIndicatorsPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Архив</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Архив расчета индикаторов ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Архив расчета индикаторов ТС</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminArchiveIndicatorsPage;
