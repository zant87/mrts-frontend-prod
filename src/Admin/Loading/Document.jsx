import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";

const AdminLoadingDocumentPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Загрузка</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Создание документа</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Создание документа</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminLoadingDocumentPage;
