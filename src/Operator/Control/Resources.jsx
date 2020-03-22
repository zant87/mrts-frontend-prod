import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorControlResourcesPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Контроль</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Контроль поступления и согласования данных по выполнению ресурсного обеспечения</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Контроль поступления и согласования данных по выполнению ресурсного обеспечения</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorControlResourcesPage;
