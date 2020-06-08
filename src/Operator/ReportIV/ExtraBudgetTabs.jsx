import React, {Component} from "react";
import {MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon} from "mdbreact";
import appAxios from "../../_services/appAxios";
import ReportsNav from "./common/ReportsNav";
import TableContainer from "./common/TableContainer";
import PivotContainer from "./common/PivotContainer";

class OperatorReportExtraBudgetTabsPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        pivotData: [],
        isLoading: false,
        isPivotLoading: false,
        activeItem: "1"
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-10-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

        const { data, pivotData, page, count, isLoading, isLoadingPivot } = this.state;

        const TITLE = "Бюджетное финансирование транспорта";
        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'dataProviderName', title: 'Источник данных', editable: 'never'},
            {field: 'transportTypeName', title: 'Вид транспорта', editable: 'never'},
            {field: 'formCode', title: 'Форма', editable: 'never'},
            {field: 'parameterName', title: 'Показатель', editable: 'never'},
            {field: 'year', title: 'Отчетный год', editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', editable: 'never'},
            {field: 'okeiName', title: 'Единица измерения', editable: 'never'},
            {field: 'value', title: 'Значение показателя', filtering: false},
        ];

        const pivotFields = [
                                {
                                    dataField: 'id',
                                    visible: false
                                },
                                {
                                    dataField: 'documentCode',
                                    visible: false
                                },
                                {
                                    dataField: 'documentName',
                                    visible: false
                                },
                                {
                                    dataField: 'documentDate',
                                    visible: false
                                },
                                {
                                    dataField: 'quarter',
                                    visible: false
                                },
                                {
                                    dataField: 'expenditureCode',
                                    visible: false
                                },
                                {
                                    dataField: 'transportStrategyVersionCode',
                                    visible: false
                                },
                                {
                                    dataField: 'transportStrategyVersionName',
                                    visible: false
                                },
                                {
                                    dataField: 'beginDate',
                                    visible: false
                                },
                                {
                                    dataField: 'endDate',
                                    visible: false
                                },
                                {
                                    dataField: 'documentId',
                                    visible: false
                                },
                                {
                                    dataField: 'expenditureId',
                                    visible: false
                                },
                                {
                                    dataField: 'transportStrategyVersionId',
                                    visible: false
                                },
                                {
                                    caption: 'Направление расходов',
                                    width: 120,
                                    dataField: 'expenditureName',
                                    area: 'row'
                                },
                                {
                                    caption: 'Отчетный год',
                                    dataField: 'year',
                                    dataType: 'number',
                                    area: 'column'
                                },
                                {
                                    caption: 'Запланировано',
                                    dataField: 'plan',
                                    dataType: 'number',
                                    summaryType: 'sum',
                                    area: 'data'
                                },
                                {
                                    caption: 'Кассовое исполнение',
                                    dataField: 'fact',
                                    dataType: 'number',
                                    summaryType: 'sum',
                                    area: 'data'
                                }
                            ];

        return (

            <MDBContainer fluid>
                <ReportsNav activeItem={this.state.activeItem} onHandleToggle={this.toggle} />
                <MDBTabContent className="card" activeItem={this.state.activeItemJustified}>
                        <MDBTabPane tabId="1" role="tabpanel">
                             <TableContainer data={data} isLoading={isLoading} columns={columns} title={TITLE}/> 
                        </MDBTabPane>
                        <MDBTabPane tabId="2" role="tabpanel">
                             <PivotContainer pFields={pivotFields} pData={data} isPLoading={isLoading} title={TITLE} />
                        </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        );
    }
}

export default OperatorReportExtraBudgetTabsPage;
