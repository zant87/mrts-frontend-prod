import React from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBIcon, MDBSpinner, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, toast } from "mdbreact";

import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";
import MaterialTable from "material-table";

import ReportsNav from "./ReportsNav";
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

    getPivotData = () => {
        this.setState({ isLoadingPivot: true });
        appAxios.get(`/views/k-8-s-all`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({pivotData: data, isLoadingPivot: false, count: count});
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
            {field: 'year', title: 'Отчетный год', editable: 'never'},
            {field: 'expenditureName', title: 'Направление расходов', editable: 'never'},
            {field: 'plan', title: 'Запланировано, млн. руб.'},
            {field: 'fact', title: 'Кассовое исполнение, млн. руб.'},
        ];

        // const { data, pivotData, page, count, isLoading, isLoadingPivot } = this.state;

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

        // return (
            {/* <MDBContainer fluid>
               <ReportsNav activeItem={this.state.activeItem} onHandleToggle={this.toggle} />
                <MDBTabContent activeItem={this.state.activeItem} className="card" >
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
                          {isLoadingPivot && <MDBSpinner multicolor />}
                          <PivotGrid id="financingPivot"
                              dataSource={new PivotGridDataSource({
                                fields: [{
                                  caption: '#',
                                  width: 120,
                                  dataField: 'id'
                                }, {
                                  caption: 'documentId',
                                  dataField: 'documentId',
                                  visible: false
                                },{
                                  caption: 'Направление расходов',
                                  dataField: 'expenditureName',
                                  dataType: 'string',
                                  width: 150,
                                  area: 'row',
                                  expanded: true
                                },{
                                  caption: 'Отчетный год',
                                  dataField: 'year',
                                  dataType: 'number',
                                  area: 'column',
                                  expanded: true
                                }, {
                                  caption: 'Запланировано, млн. руб.',
                                  dataField: 'plan',
                                  dataType: 'number',
                                  area: 'data',
                                  summaryType: 'sum',
                                  format: "#,###,###,##0.##",
                                  expanded: true
                                }, {
                                  caption: 'Кассовое исполнение, млн. руб.',
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
                              <Export enabled={true} fileName="Бюджетное финансирование транспорта" allowExportSelectedData={true} />
                            </PivotGrid>
                          
                       </MDBRow>
                     </MDBContainer>
                  </MDBTabPane>
                </MDBTabContent> */}

        const {data, page, count, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>




            
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        <MaterialTable
                            title="Бюджетное финансирование транспорта"
                            columns={columns}
                            tableRef={tableRef}
                            data={query =>
                                new Promise((resolve, reject) => {
                                    appAxios.get(`/views/k-8-s?page=${query.page}&size=${query.pageSize}&sort=id,desc`)
                                        .then(res => {
                                            const count = Number(res.headers['x-total-count']);
                                            const data = res.data;

                                            resolve({
                                                data: data,
                                                page: query.page,
                                                totalCount: count
                                            });
                                        });
                                })}

                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...data];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;

                                            console.log(newData);

                                            appAxios({
                                                url: `/views/k-8-s/update?pID=${newData.id}&pDoc=${newData.documentId}&pPlan=${newData.plan}&pFact=${newData.fact}`,
                                                method: 'GET'
                                            }).then((response) => {
                                                const message = response.headers["x-mrts-backend-params"];
                                                toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
                                                    closeButton: false
                                                });
                                            });

                                            resolve();
                                        }, 1000)
                                    }),
                            }}
                            options={{
                                actionsColumnIndex: 999,
                                search: false,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
