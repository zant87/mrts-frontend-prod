import React from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, toast } from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";
import ReportsNav from "./ReportsNav";
import PivotGrid, {
    FieldChooser,
    Export,
    FieldPanel
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";

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
            {field: 'year', title: 'Отчетный год', editable: 'never'},
            {field: 'directionName', title: 'Направление расходов', editable: 'never'},
            {field: 'costTypeName', title: 'Вид расходов', editable: 'never'},
            {field: 'fact', title: 'Фактические объемы исполнения, млн. руб.'},
            // { field: 'plan', title: 'План исполнения, млн. руб.', hidden: true, initialEditValue: 0}
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

       /* return (
            <MDBContainer fluid>
               <ReportsNav activeItem={this.state.activeItem} onHandleToggle={this.toggle} />
                <MDBTabContent activeItem={this.state.activeItem} className="card">
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
        const {data, page, count, isLoading} = this.state; */
        
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        <MaterialTable
                            title="Объемы привлечения внебюджетных средств"
                            columns={columns}
                            tableRef={tableRef}
                            data={query =>
                                new Promise((resolve, reject) => {
                                    appAxios.get(`/views/k-10-s?page=${query.page}&size=${query.pageSize}&sort=id,desc`)
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
                                                url: `/views/k-10-s/update?pID=${newData.id}&pDoc=${newData.documentId}&pPlan=${newData.plan}&pFact=${newData.fact}`,
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
                                pageSizeOptions: [20, 50, 100]
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
