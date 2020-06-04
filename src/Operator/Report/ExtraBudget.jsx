import React from 'react';
// import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";

import { MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

import PivotGrid, {
    FieldChooser,
    Export,
    FieldPanel
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

export default class OperatorReportExtraBudgetPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        pivotData: [],
        rowsPerPage: 20,
        isLoading: false,
        isLoadingPivot: false,
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
        this.getPivotData();
    };

    getPivotData = () => {
        this.setState({ isLoadingPivot: true });
        appAxios.get(`/views/k-10-s-all`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({pivotData: data, isLoadingPivot: false, count: count});
            });
    };

    getData = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/views/k-10-s?sort=id,desc&size=2000`)
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

        appAxios.get(`/views/k-10-s?page=${page}&size=${numberOfRows}&sort=id,desc`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'year', label: 'Отчетный год'},
            { name: 'directionName', label: 'Направление расходов' },
            { name: 'costTypeName', label: 'Вид расходов'},
            { name: 'fact', label: 'Фактические объемы исполнения, млн. руб.', options: { filter: false } },
            { name: 'plan', label: 'plan', options: {display: 'excluded', filter: false} },
            { name: 'id', label: 'id', options: {display: 'excluded', filter: false} },
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false} },
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


        const { data, pivotData, page, count, isLoading, isLoadingPivot } = this.state;

        const options = {
            // serverSide: true,
            // count: count,
            // page: page,
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
            textLabels: labels,
            print: false,
            selectableRows: 'none',
            // sortFilterList: false,
            // selectableRowsOnClick: true,
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
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            ),
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

                <MDBTabContent activeItem={this.state.activeItem}>
                  <MDBTabPane tabId="1" role="tabpanel">
                            
                                <MDBRow center>
                                    <MDBCol md={'12'} className='my-5 mx-auto'>
                                        {isLoading && <MDBSpinner multicolor />}
                                        <MUIDataTable
                                            title={"Объемы привлечения внебюджетных средств"}
                                            data={data}
                                            columns={columns}
                                            options={options}
                                        />
                                    </MDBCol>
                                </MDBRow>
                        
                  </MDBTabPane>
                  <MDBTabPane tabId="2" role="tabpanel">
                     <MDBContainer fluid>
                       <MDBRow md={'18'} center className='my-1 mx-auto'>
                           {isLoadingPivot && <MDBSpinner multicolor />}
                           <PivotGrid id="budgetPivot"
                              dataSource={new PivotGridDataSource({
                                fields: [{
                                  caption: '#',
                                  width: 120,
                                  dataField: 'id',
                                  sorted: true
                                }, {
                                  caption: 'documentId',
                                  dataField: 'documentId',
                                  visible: false,
                                },{
                                  caption: 'Направление расходов',
                                  dataField: 'directionName',
                                  dataType: 'string',
                                  width: 150,
                                  area: 'row',
                                  expanded: true
                                },{
                                  caption: 'year',
                                  dataField: 'Отчетный год',
                                  dataType: 'number',
                                  area: 'column',
                                  expanded: true
                                }, {
                                  caption: 'Вид расходов',
                                  dataField: 'costTypeName',
                                  dataType: 'string',
                                  area: 'row'
                                }, {
                                  caption: 'Запланировано, млн. руб.',
                                  dataField: 'plan',
                                  dataType: 'number',
                                  summaryType: 'sum',
                                  area: 'data',
                                  format: "#,###,###,##0.##",
                                  expanded: true
                                },{
                                  caption: 'Фактические объемы исполнения, млн. руб.',
                                  dataField: 'fact',
                                  dataType: 'number', 
                                  summaryType: 'sum',
                                  format: "#,###,###,##0.##",               
                                  area: 'data',
                                  expanded: true
                                }],
                                store: pivotData
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
                              <Export enabled={true} fileName="Объемы привлечения внебюджетных средств" allowExportSelectedData={true} />
                            </PivotGrid>
                            
                       </MDBRow>
                     </MDBContainer>
                  </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        );
    }
}
