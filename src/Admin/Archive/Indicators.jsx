import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";
import TableContainer from "./common/TableContainer";
import appAxios from "../../_services/appAxios";

export default class AdminArchiveIndicatorsPage extends React.Component  {

    render() {

        return (
            <MDBContainer fluid>
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
    }
};
