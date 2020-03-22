import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorReportExtraBudgetPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Отчетные показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Объемы привлечения внебюджетных средств</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Объемы привлечения внебюджетных средств</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorReportExtraBudgetPage;
