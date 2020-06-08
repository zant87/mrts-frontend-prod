import React, {Component} from "react";
import {MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon} from "mdbreact";
import appAxios from "../../_services/appAxios";
import ReportsNav from "./common/ReportsNav";
import TableContainer from "./common/TableContainerE";
import PivotContainer from "./common/PivotContainer";

class OperatorReportFactTabsPage extends React.Component {

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
        this.getPivotData();
    }

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/k-5-s-all`)
            .then(res => {
                console.log("data: %j", res.data)
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    getPivotData = async () => {
        this.setState({isPivotLoading: true});
        appAxios.get(`/views/k-5-s-all`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({pivotData: data, isPivotLoading: false, count: count});
            });
    };

    render() {

        const { data, pivotData, page, count, isLoading, isPivotLoading } = this.state;

        const TITLE = "Фактические значения показателей";
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
        const updateApi = 'k-5-s';

        const pivotFields = [  {
                                    dataField: 'id',
                                    visible: false
                                },{
                                    dataField: 'dataProviderName',
                                    visible: false
                                },{
                                    dataField: 'transportTypeCode',
                                    visible: false
                                },{
                                    dataField: 'formCode',
                                    visible: false
                                },{
                                    dataField: 'okudCode',
                                    visible: false
                                },{
                                    dataField: 'parameterCode',
                                    visible: false
                                },{
                                    dataField: 'transportTypeCode',
                                    visible: false
                                },{
                                    dataField: 'formParameterId',
                                    visible: false
                                },{
                                    dataField: 'monthId',
                                    visible: false
                                },{
                                    dataField: 'monthName',
                                    visible: false
                                },{
                                    dataField: 'quarterId',
                                    visible: false
                                },{
                                    dataField: 'dataProviderId',
                                    visible: false
                                },{
                                    dataField: 'dataProviderCode',
                                    visible: false
                                },{
                                    dataField: 'okeiCode',
                                    visible: false
                                },{
                                    dataField: 'okeiName',
                                    visible: false
                                },{
                                    dataField: 'okeiId',
                                    visible: false
                                },{
                                    dataField: 'formId',
                                    visible: false
                                },{
                                    dataField: 'formParameterId',
                                    visible: false
                                },{
                                    dataField: 'parameterId',
                                    visible: false
                                },{
                                    dataField: 'transportTypeId',
                                    visible: false
                                },{
                                    dataField: 'okudId',
                                    visible: false
                                },{
                                    caption: 'Вид транспорта',
                                    width: 120,
                                    dataField: 'transportTypeName',
                                    area: 'row'
                                },{
                                    caption: 'Источник данных',
                                    width: 120,
                                    dataField: 'dataProviderName',
                                    area: 'row'
                                },{
                                    caption: 'ОКУД',
                                    width: 120,
                                    dataField: 'okudName',
                                    area: 'row'
                                },{
                                    caption: 'Показатель',
                                    dataField: 'parameterName',
                                    width: 150,
                                    area: 'row'
                                },{
                                    caption: 'Отчетный год',
                                    dataField: 'year',
                                    dataType: 'number',
                                    area: 'column'
                                },{
                                    caption: 'Отчетный квартал',
                                    dataField: 'quarterName',
                                    area: 'column'
                                },{
                                    caption: 'Значение показателя',
                                    dataField: 'value',
                                    dataType: 'number',
                                    summaryType: 'sum',
                                    area: 'data'
                                }
                            ];

        return (
            <MDBContainer fluid>
                <ReportsNav activeItem={this.state.activeItem} onHandleToggle={this.toggle} />
                <MDBTabContent  className="card" activeItem={this.state.activeItem}>
                        <MDBTabPane tabId="1" role="tabpanel">
                            <TableContainer data={data} isLoading={isLoading} columns={columns} title={TITLE}/> 
                        </MDBTabPane>
                        <MDBTabPane tabId="2" role="tabpanel">
                             <PivotContainer pFields={pivotFields} pData={pivotData} isPLoading={isPivotLoading} title={TITLE} />
                        </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        );
    }
}

export default OperatorReportFactTabsPage;
