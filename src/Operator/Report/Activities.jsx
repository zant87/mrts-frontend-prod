import React from 'react';
// import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSpinner } from "mdbreact";

import { MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

import PivotGrid, {
    FieldChooser,
    Export,
    FieldPanel
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";
import { history } from "@/_helpers";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

export default class OperatorReportActivitiesPage extends React.Component {

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
        this.getData();
    };

    getData = () => {
        this.setState({ isLoading: true });
        // appAxios.get(`/views/k-6-s?sort=id,desc`)
        appAxios.get(`/views/k-6-s?sort=id,desc&size=2000`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    onChangePage = (page, numberOfRows) => {
        this.setState({
            isLoading: true,
        });

        appAxios.get(`/views/k-6-s?page=${page}&size=${numberOfRows}&sort=id,desc`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'activityReportId', label: '#', options: {filter: false}},
            { name: 'activityCode', label: 'Обозначение мероприятия', options: {display: 'excluded', filter: false}},
            { name: 'activityName', label: 'Наименование мероприятия', options: {filter: false}},
            { name: 'documentType', label: 'Вид документа'},
            { name: 'activityDescription', label: 'Содержание мероприятия', options: {filter: false}},
            { name: 'yearNumber', label: 'Отчетный год'},
            { name: 'quarterName', label: 'Отчетный квартал'},
            { name: 'reportDescription', label: 'Отчет исполнителя', options: {filter: false}},
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
            { name: 'activityId', label: 'activityId', options: {display: 'excluded', filter: false}},
            { name: 'activityReportId', label: 'activityReportId', options: {display: 'excluded', filter: false}},
            { name: "",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <ButtonUpdateColumn rowData = {tableMeta.rowData}/>
                        );
                    }
                }
            },
        ];

        const { data, page, count, isLoading } = this.state;

        const options = {
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
            textLabels: labels,
            print: false,
            selectableRows: 'none',
            // serverSide: true,
            // count: count,
            // page: page,
            // selectableRowsOnClick: true,
            // sortFilterList: false,
            // onTableChange: (action, tableState) => {
            //     switch (action) {
            //         case 'changePage':
            //             this.onChangePage(tableState.page, tableState.rowsPerPage);
            //             break;
            //     }
            // },
            // onChangeRowsPerPage: (numberOfRows) => {
            //     this.onChangePage(this.state.page, numberOfRows);
            // },
            // customToolbar: () => {
            //     return (
            //         <CustomToolbar />
            //     );
            // },
            // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            //     <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            // ),
        };

        return (
            <MDBContainer fluid>
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

                <MDBTabContent activeItem={this.state.activeItem} >
                  <MDBTabPane tabId="1" role="tabpanel">
                    <MDBContainer fluid>
                        <MDBRow center>
                            <MDBCol md={'12'} className='my-5 mx-auto'>
                                {isLoading && <MDBSpinner multicolor />}
                                <MUIDataTable
                                    title={"Выполнение мероприятий по реализации ТС"}
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                 </MDBTabPane>
                  <MDBTabPane tabId="2" role="tabpanel">
                     <MDBContainer fluid>
                       <MDBRow md={'18'} center className='my-1 mx-auto'>
                            <PivotGrid id="factPivot"
                              dataSource={new PivotGridDataSource({
                                fields: [{
                                  caption: '#',
                                  width: 120,
                                  dataField: 'activityReportId',
                                  area: 'row',
                                  expanded: true,
                                  sorted: true
                                }, {
                                  caption: 'Обозначение мероприятия',
                                  dataField: 'activityCode',
                                  dataType: 'string',
                                  width: 150,
                                  area: 'row',
                                  expanded: true
                                }, {
                                  caption: 'Наименование мероприятия',
                                  dataField: 'activityName',
                                  dataType: 'string',                
                                  area: 'row',
                                  expanded: true
                                }, {
                                  caption: 'documentType',
                                  dataField: 'Вид документа',
                                  dataType: 'string',
                                  area: 'row',
                                  expanded: true
                                }, {
                                  caption: 'Содержание мероприятия',
                                  dataField: 'activityDescription',
                                  dataType: 'string',
                                  area: 'row',
                                }, {
                                  caption: 'Отчетный год',
                                  dataField: 'yearNumber',
                                  dataType: 'number',
                                  area: 'row',
                                }, {
                                  caption: 'Отчетный квартал',
                                  dataField: 'quarterName',
                                  dataType: 'string',
                                  area: 'row',
                                }, {
                                  caption: 'Отчет исполнителя',
                                  dataField: 'reportDescription',
                                  dataType: 'string',
                                  area: 'data',
                                }, {
                                  caption: 'documentId',
                                  dataField: 'documentId',
                                  dataType: 'string'
                                },{
                                  caption: 'activityId',
                                  dataField: 'activityId',
                                  dataType: 'string'
                                },{
                                  caption: 'activityReportId',
                                  dataField: 'activityReportId',
                                  dataType: 'string'
                                }],
                                store: data
                              })}
                              allowSortingBySummary={true}
                              allowFiltering={true}
                              allowSorting={true}
                              allowExpandAll={true}
                              height={640}
                              showBorders={true}
                              showColumnTotals={false}
                              showColumnGrandTotals={false}
                              showRowTotals={false}
                              showRowGrandTotals={false}
                               >
                              <FieldPanel showColumnFields={true} />
                              <FieldChooser enabled={true} />
                              <Export enabled={true} fileName="Выполнение мероприятий по реализации ТС" allowExportSelectedData={true} />
                            </PivotGrid>
                       </MDBRow>
                     </MDBContainer>
                  </MDBTabPane>
                </MDBTabContent>

            </MDBContainer>
        );
    }
}
