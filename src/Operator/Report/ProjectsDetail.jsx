import React from 'react';
// import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";

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
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

export default class OperatorReportProjectsDetailPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        pivotData: [],
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
        this.getData();
        // this.getPivotData();
    };

    getData = () => {
        this.setState({ isLoading: true });
        // appAxios.get(`/views/k-7-details?sort=id,desc`)
        appAxios.get(`/views/k-7-details?sort=id,desc&size=2000`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    getPivotData = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/views/k-7-details?sort=id,desc`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({pivotData: data, isLoading: false, count: count});
            });
    };

    onChangePage = (page, numberOfRows) => {
        this.setState({
            isLoading: true,
        });

        appAxios.get(`/views/k-7-details?page=${page}&size=${numberOfRows}&sort=id,desc`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'yearNumber', label: 'Отчетный год'},
            { name: 'projectCode', label: 'Обозначение проекта' },
            { name: 'projectName', label: 'Содержание проекта' },
            { name: 'costTypename', label: 'Вид расходов'},
            { name: 'fundSourceName', label: 'Источник финансирования', options: {filter: false}},
            { name: 'plan', label: 'Предусмотрено на год', options: { filter: false } },
            { name: 'spent', label: 'Освоено на год', options: { filter: false } },
            { name: 'fact', label: 'Кассовые расходы за год', options: { filter: false } },
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
            { name: 'projectId', label: 'projectId', options: {display: 'excluded', filter: false}},
            { name: 'id', label: 'id', options: {display: 'excluded', filter: false}},
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
            selectableRowsOnClick: false,
            selectableRows: 'none',
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
                <MDBTabContent activeItem={this.state.activeItem} >
                  <MDBTabPane tabId="1" role="tabpanel">
                        <MDBContainer fluid>
                                <MDBRow center>
                                    <MDBCol md={'12'} className='my-5 mx-auto'>
                                        {isLoading && <MDBSpinner multicolor />}
                                        <MUIDataTable
                                            title={"Финансирование проектов ТС (detail)"}
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
                               <MDBRow md={'12'} center className='my-5 mx-auto'>
                                    <PivotGrid id="projectsMasterPivot"
                                      dataSource={new PivotGridDataSource({
                                        fields: [{
                                          caption: 'projectCode',
                                          width: 120,
                                          dataField: 'Обозначение проекта',
                                          area: 'row',
                                          expanded: true,
                                          sorted: true
                                        }, {
                                          caption: 'Общие затраты (плановые)',
                                          dataField: 'realPlanCost',
                                          dataType: 'number',
                                          width: 150,
                                          area: 'row',
                                          expanded: true
                                        }, {
                                          caption: 'Содержание проекта',
                                          dataField: 'projectName',
                                          dataType: 'string',                
                                          area: 'row',
                                          expanded: true
                                        }, {
                                          caption: 'done',
                                          dataField: 'Уровень технической готовности',
                                          dataType: 'string',
                                          area: 'row',
                                          expanded: true
                                        }, {
                                          caption: 'Сроки реализации плановые',
                                          dataField: 'planBeginYear',
                                          dataType: 'string',
                                          area: 'row',
                                        }, {
                                          caption: 'Отчетный год',
                                          dataField: 'yearNumber',
                                          dataType: 'string',
                                          area: 'row',
                                        }, {
                                          caption: 'Начало фактической реализации',
                                          dataField: 'factStarted',
                                          dataType: 'string',
                                          area: 'row',
                                        }, {
                                          caption: 'Конец фактической реализации',
                                          dataField: 'factFinished',
                                          dataType: 'string',
                                          area: 'row',
                                        }, {
                                          caption: 'Общие затраты (факт)',
                                          dataField: 'fact',
                                          dataType: 'number',
                                          area: 'data',
                                        },{
                                          caption: 'Фактические результаты',
                                          dataField: 'description',
                                          dataType: 'string',
                                          area: 'row',
                                        },{
                                          caption: 'documentId',
                                          dataField: 'documentId',
                                          dataType: 'string',
                                          area: 'row',
                                        }, {
                                          caption: 'projectId',
                                          dataField: 'projectId',
                                          dataType: 'string'
                                        }, {
                                          caption: 'id',
                                          dataField: 'id',
                                          dataType: 'string'
                                        }],
                                        store: data
                                      })}
                                      allowSortingBySummary={true}
                                      allowFiltering={true}
                                      allowSorting={true}
                                      allowExpandAll={true}
                                      height={440}
                                      showBorders={true}
                                      showColumnTotals={false}
                                      showColumnGrandTotals={false}
                                      showRowTotals={false}
                                      showRowGrandTotals={false}
                                       >
                                      <FieldPanel showColumnFields={true} />
                                      <FieldChooser enabled={true} />
                                      <Export enabled={true} fileName="Финансирование проектов (detail)" allowExportSelectedData={true} />
                                    </PivotGrid>
                               </MDBRow>
                            </MDBContainer>
                    </MDBTabPane>
                </MDBTabContent>

            </MDBContainer>
        );
    }
}
