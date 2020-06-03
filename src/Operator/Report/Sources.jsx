import React from 'react';
// import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

import { MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";

import PivotGrid, {
    FieldChooser,
    Export,
    FieldPanel
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';



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
