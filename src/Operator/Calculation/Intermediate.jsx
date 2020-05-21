import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorCalculationIntermediatePage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Контроль</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Расчет промежуточных значений индикаторов</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Расчет промежуточных значений индикаторов</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorCalculationIntermediatePage;