import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";
import TableContainer from "./common/TableContainer";
import PivotContainer from "./PivotContainer";
import appAxios from "../../_services/appAxios";

export default class AdminArchiveIndicatorsPage extends React.Component  {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/i-2-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

         const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год', filtering: true, editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true, editable: 'never'},


            {field: 'indicatorName', title: 'Показатель', filtering: true, editable: 'never'},

            {field: 'scenarioName', title: 'Сценарий', filtering: true, editable: 'never'},
            {field: 'okeiCode', title: 'ОКЕИ', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Тип транспорта', filtering: true, editable: 'never'},

            {field: 'beginDate', title: 'Начало периода', filtering: true },
            {field: 'endDate', title: 'Конец периода', filtering: true },
            {field: 'value', title: 'Значение показателя', filtering: true, editable: 'never' },
        ];

        const { data, isLoading } = this.state;

        const pivotFields = [{
                              caption: '#',
                              width: 120,
                              dataField: 'id'
                            }, {
                              caption: 'goalCode',
                              dataField: 'goalCode',
                              visible: false
                            },{
                              caption: 'Отчетный год',
                              dataField: 'year',
                              dataType: 'number',
                              area: 'column',
                              expanded: true
                            }, {
                              caption: 'Отчетный квартал',
                              dataField: 'quarterName',
                              area: 'column',
                              expanded: true
                            }, {
                              caption: 'Код показателя',
                              dataField: 'indicatorCode',
                              dataType: 'string',
                              area: 'row',
                              expanded: true
                            }, {
                              caption: 'Показатель',
                              dataField: 'indicatorName',
                              dataType: 'string',
                              area: 'row',
                              expanded: true
                            }
                            , {
                              caption: 'Сценарий',
                              dataField: 'scenarioName',
                              dataType: 'string',
                              area: 'row',
                              expanded: true
                            }
                            , {
                              caption: 'ОКЕИ',
                              dataField: 'okeiCode',
                              dataType: 'string',
                              area: 'row',
                              expanded: true
                            }
                            , {
                              caption: 'Тип транспорта',
                              dataField: 'transportTypeName',
                              dataType: 'string',
                              area: 'row',
                              expanded: true
                            }
                            , {
                              caption: 'Начало периода',
                              dataField: 'endDate',
                              area: 'column',
                              expanded: true
                            },
                            {
                              caption: 'Конец периода',
                              dataField: 'endDate',
                              area: 'column',
                              expanded: true
                            }, {
                              caption: 'Значение показателя',
                              dataField: 'value',
                              dataType: 'number',
                              summaryType: 'sum',
                              format: "#,###,###,##0.##",                
                              area: 'data',
                              expanded: true
                            },{
                              caption: 'quarterId',
                              dataField: 'quarterId',
                              visible: false
                            }, {
                              caption: 'goalId',
                              dataField: 'goalId',
                              visible: false
                            }, {
                              caption: 'indicatorId',
                              dataField: 'indicatorId',
                              visible: false
                            }, {
                              caption: 'indicatorValueId',
                              dataField: 'indicatorValueId',
                              visible: false
                            }, {
                              caption: 'okeiId',
                              dataField: 'okeiId',
                              visible: false
                            }, {
                              caption: 'transportTypeId',
                              dataField: 'transportTypeId',
                              visible: false
                            }];

        /* "id": 10909,
            "year": 2010,
            "quarterName": "IV квартал",

            "goalCode": "GOAL_01",
            "indicatorCode": "IND_1.12.1",

            "indicatorName": "Перевалка грузов портами России-морскими портами",
            "scenarioName": "Базовый",
            "okeiCode": "МЛН Т",

            "transportTypeName": "Морской транспорт",

            "beginDate": "2010-01-01",
            "endDate": "2099-12-31",

            "value": 526,

            "quarterId": 4,
            "goalId": 34,
            "indicatorId": 936,
            "scenarioId": 5,
            "indicatorValueId": 3111,
            "okeiId": 133,
            "transportTypeId": 17
            */
        return (
            <MDBContainer fluid>
                <MDBRow className='mt-5'>
                    <MDBBreadcrumb>
                        <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                        <MDBBreadcrumbItem>Архив</MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>Архив расчета индикаторов ТС</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBRow>
                <MDBRow>
                  {/* <TableContainer data={data} isLoading={isLoading} columns={columns} title={"Архив расчета индикаторов ТС"}/>  */}
                      <PivotContainer pFields={pivotFields} pData={this.state.data} isPLoading={isLoading} title={"Архив расчета индикаторов ТС"}/> 
                </MDBRow>
            </MDBContainer>
        );
    }
};
