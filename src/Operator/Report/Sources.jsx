import React from 'react';
// import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";

import { MDBCol, MDBContainer, MDBRow, MDBIcon, MDBSpinner, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";

import PivotGrid, {
    FieldChooser,
    Export,
    FieldPanel
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';



export default class OperatorReportSourcesPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        rowsPerPage: 20,
        isLoading: false,
        activeItem: "1"
    };

    toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
      }
    };

    componentDidMount() {
        //сохранять state через redux
        // this.getData();
    };

    render() {

        return (
            <MDBContainer fluid>
                     {/* <MDBRow className='mt-5'>
                    <MDBBreadcrumb>
                        <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                        <MDBBreadcrumbItem>Отчетные показатели</MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>Источники финансирования транспорта организациями</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBRow>
                <MDBRow>
                    <h1>Источники финансирования транспорта организациями</h1>
                </MDBRow> */}

                   <MDBNav className="nav-tabs mt-5">
                      <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                          Корректировка
                        </MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                          Просмотр
                        </MDBNavLink>
                      </MDBNavItem>
                    </MDBNav>

                    <MDBTabContent activeItem={this.state.activeItem}>
                          <MDBTabPane tabId="1" role="tabpanel">

                                <MDBRow center>

                                </MDBRow>

                          </MDBTabPane>
                          <MDBTabPane tabId="2" role="tabpanel">
                             <MDBContainer fluid>

                             </MDBContainer>
                          </MDBTabPane>
                    </MDBTabContent>

            </MDBContainer>
        );

   }
};

// export default OperatorReportSourcesPage;
