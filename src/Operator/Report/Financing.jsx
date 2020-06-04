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

/*
Бюджетное финансирование транспорта
Бюджетные ассигнования в рамках программ развития транспорта
Объемы привлечения внебюджетных средств
Источники финансирования транспорта организациями

ARM операторы
*/

export default class OperatorReportFinancingPage extends React.Component {

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
        // appAxios.get(`/views/k-8-s?sort=id,desc`)
        appAxios.get(`/views/k-8-s?sort=id,desc&size=2000`)
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

        appAxios.get(`/views/k-8-s?page=${page}&size=${numberOfRows}&sort=id,desc`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'year', label: 'Отчетный год'},
            { name: 'expenditureName', label: 'Направление расходов' },
            { name: 'plan', label: 'Запланировано, млн. руб.' , options: { filter: false } },
            { name: 'fact', label: 'Кассовое исполнение, млн. руб.', options: { filter: false } },
            { name: 'id', label: 'id', options: {display: 'excluded', filter: false}},
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
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
            // serverSide: true,
            // count: count,
            // page: page,
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
            textLabels: labels,
            sortFilterList: false,
            print: false,
            // selectableRowsOnClick: true,
            selectableRows: 'none',
            search: 'false',
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
                                        title={"Бюджетное финансирование транспорта"}
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
                          <PivotGrid id="financingPivot"
                              dataSource={new PivotGridDataSource({
                                fields: [{
                                  caption: 'id',
                                  width: 120,
                                  dataField: 'id'
                                }, {
                                  caption: 'documentId',
                                  width: 120,
                                  dataField: 'documentId'
                                },{
                                  caption: 'Направление расходов',
                                  dataField: 'expenditureName',
                                  dataType: 'string',
                                  width: 150,
                                  area: 'row',
                                  expanded: true
                                },{
                                  caption: 'year',
                                  dataField: 'Отчетный год',
                                  dataType: 'number',
                                  area: 'row',
                                  expanded: true
                                }, {
                                  caption: 'Запланировано, млн. руб.',
                                  dataField: 'plan',
                                  dataType: 'number',
                                  area: 'row',
                                  format: "#,###,###,##0.##",
                                  expanded: true
                                }, {
                                  caption: 'Кассовое исполнение, млн. руб.',
                                  dataField: 'fact',
                                  dataType: 'number',
                                  format: "#,###,###,##0.##",                
                                  area: 'data',
                                  expanded: true
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
                              <Export enabled={true} fileName="Бюджетное финансирование транспорта" allowExportSelectedData={true} />
                            </PivotGrid>
                          


                       </MDBRow>
                     </MDBContainer>
                  </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        );
    }
}
