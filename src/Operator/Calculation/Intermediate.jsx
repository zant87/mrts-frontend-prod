import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

const OperatorCalculationIntermediatePage = () => {

    return (
        <MDBContainer>
            <MDBRow className='my-3'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Контроль</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Расчет промежуточных значений индикаторов</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Расчет промежуточных значений индикаторов</h1>
                <h1>SP_INTERPOLATE_FORECAST</h1>
            </MDBRow>
        </MDBContainer>
    );

};

export default OperatorCalculationIntermediatePage;
