import React from 'react';
import {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBBtn, MDBCard,
    MDBCardBody, MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBIcon, MDBInput,
    MDBRow,
    MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import DataTable from "react-data-table-component";
import Checkbox from "@material-ui/core/Checkbox";

const OperatorControlIndicatorsPage = () => {

    const data_panel = {
        columns: [
            {
                'label': 'First Name',
                'field': 'first',
                'sort': 'asc'
            },
            {
                'label': 'Last Name',
                'field': 'last',
                'sort': 'asc'
            },
            {
                'label': 'Username',
                'field': 'username',
                'sort': 'asc'
            },
            {
                'label': 'Username',
                'field': 'username2',
                'sort': 'asc'
            },
            {
                'label': 'Username',
                'field': 'username3',
                'sort': 'asc'
            },
            {
                'label': 'Username',
                'field': 'username4',
                'sort': 'asc'
            }
        ],
        rows: [
            {
                'first': 'Mark',
                'last': 'Otto',
                'username': '@mdo',
                'username2': 'Mark',
                'username3': 'Otto',
                'username4': '@mdo'
            },
            {
                'first': 'Jacob',
                'last': 'Thornton',
                'username': '@fat',
                'username2': 'Jacob',
                'username3': 'Thornton',
                'username4': '@fat'
            },
            {
                'first': 'Larry',
                'last': 'the Bird',
                'username': '@twitter',
                'username2': 'Larry',
                'username3': 'the Bird',
                'username4': '@twitter'
            },
            {
                'first': 'Paul',
                'last': 'Topolski',
                'username': '@P_Topolski',
                'username2': 'Paul',
                'username3': 'Topolski',
                'username4': '@P_Topolski'
            },
            {
                'first': 'Larry',
                'last': 'the Bird',
                'username': '@twitter',
                'username2': 'Larry',
                'username3': 'the Bird',
                'username4': '@twitter'
            }
        ]
    };

    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Контроль</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Контроль поступления и согласования данных по показателям для расчета индикаторов ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <MDBRow center>
                <MDBCol md={'12'} className='mb-5'>
                    <MDBCard narrow>
                        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                            <div>
                                <MDBBtn outline rounded size="sm" color="white" className="px-2">
                                    <i className="fa fa-th-large mt-0"/>
                                </MDBBtn>
                                <MDBBtn outline rounded size="sm" color="white" className="px-2">
                                    <i className="fa fa-columns mt-0"/>
                                </MDBBtn>
                            </div>
                            <a href="#" className="white-text mx-3">Контроль поступления и согласования данных по показателям для расчета индикаторов ТС</a>
                            <div>
                                <MDBBtn outline rounded size="sm" color="white" className="px-2">
                                    <i className="fas fa-pencil-alt mt-0"/>
                                </MDBBtn>
                                <MDBBtn outline rounded size="sm" color="white" className="px-2">
                                    <i className="fas fa-times mt-0"/>
                                </MDBBtn>
                                <MDBBtn outline rounded size="sm" color="white" className="px-2">
                                    <i className="fa fa-info-circle mt-0"/>
                                </MDBBtn>
                            </div>
                        </MDBCardHeader>
                        <MDBCardBody cascade>
                            <MDBTable btn fixed>
                                <MDBTableHead columns={data_panel.columns} />
                                <MDBTableBody rows={data_panel.rows} />
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatorControlIndicatorsPage;
