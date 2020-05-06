import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";
import MUIDataTable from "mui-datatables";

const OperatorReportSourcesPage = () => {
    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Отчетные показатели</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Источники финансирования транспорта организациями</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow>
                <h1>Источники финансирования транспорта организациями</h1>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorReportSourcesPage;
