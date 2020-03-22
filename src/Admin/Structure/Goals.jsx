import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const AdminGoalsPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Структура</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Дерево целей и задач</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Дерево целей и задач</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminGoalsPage;
