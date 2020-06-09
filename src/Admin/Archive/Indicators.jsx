import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getParameterValues } from "@/_reducers/archive-reducer";
import {
  getTransportTypes,
  getYears,
  getQuarters,
  getScenarios,
} from "@/_reducers/dynamics-reducer";

import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow, MDBCol, MDBSelect, MDBBtn} from "mdbreact";
import TableContainer from "./common/TableContainer";
import PivotContainer from "./PivotContainer";
import appAxios from "../../_services/appAxios";

/*
  TODO:
    Нужны серверные фильтры на года и источник информации. 

    Также они нужны в пивоте "OТЧЕТНЫЕ ПОКАЗАТЕЛИ" 
      case: ФАКТИЧЕСКИЕ ЗНАЧЕНИЯ ПОКАЗАТЕЛЕЙ
*/

class AdminArchiveIndicatorsPage extends React.Component  {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,

        transportTypeId: '',
        scenarioId: '',
        okudId: '',
        indicatorId: '',
        year: '',
        quarterId: '',
        beginDate: '',
        endDate: '',

        transportTypeList: [],
        scenarioList: [], 
        indicatorList: [],
        okudList: [],         
        beginDateList: [], 
        endDateList: [],
        yearList: [],  
        quarterList: [],
    }

    componentDidMount() {
        // this.getData();

        this.props.getTransportTypes();
        // this.props.getInds();
        // this.props.getYears();
        // this.props.getQuarters();
        // this.props.getScenarios();
    }

    filterData = () => {
        const { transportTypeId, scenarioId, okudId, indicatorId, year, quarterId, beginDate, endDate } = this.state;
        // this.props.getParameterValues(transportTypeId, dataProviderId, okudId, parameterId, year, quarterId);
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
    setTransportType = e => {
        this.setState({
            transportTypeId: e.toString()
        });
    }

    setScenario = e => {
        this.setState({
            scenarioId: e.toString()
        });
    }

    setOkud = e => {
        this.setState({
            okudId: e.toString()
        });
    }

    setIndicator = e => {
        this.setState({
            indicatorId: e.toString()
        });
    }
    
    setYear = e => {
        this.setState({
            year: e.toString()
        });
    }
    setQuarter = e => {
        this.setState({
            quarterId: e.toString()
        });
    }

    onReset = () => {

       this.setState({
            transportTypeId: '',
            scenarioId: '',
            okudId: '',
            indicatorId: '',
            year: '',
            quarterId: '',
            data: [],
       });
       /*this.getTransportTypeList();
       this.getDataProviderList();
       this.getParameterList();
       this.getOkudList();
       this.getQuarterList();
       this.getDataYearList();*/
       
    }

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

        let transportTypes = [];
        if (this.props.transportTypes) {
                transportTypes = this.props.transportTypes.map(item => {
                        return { value: item.id, text: item.name, checked: false };
                })
        }

         let scenarios = [];
        /*if (this.props.scenarios) {
                scenarios = this.props.scenarios.map(item => {
                        return { value: item.id, text: item.name, checked: false };
                })
        } */

        let years = [];
        /*if (this.props.years) {
                years = this.props.years.map(item => {
                        return { value: item.yesr, text: item.year, checked: false };
                })
        } */

        let quarters = [];
        /*if (this.props.quarters) {
                quarters = this.props.quarters.map(item => {
                        return { value: item.id, text: item.name, checked: false };
                })
        } */

        // console.log("transportTypes: %j", transportTypes)

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
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'transportTypeId'}
                                   label="Вид транспорта"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={transportTypes}
                                   getValue={this.state.transportTypeList}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'scenarioId'}
                                   label="Сценарий"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.scenarioList}
                                   getValue={this.setScenario}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'okudId'}
                                   label="ОКУД"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.okudList}
                                   getValue={this.setOkud}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBBtn color="primary" type="none" onClick={this.getParameterData}>Получить данные</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow around={true}>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'indicatorId'}
                                   label="Показатель"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.indicatorList}
                                   getValue={this.setIndicator}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'year'}
                                   label="Отчетный год"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.yearList}
                                   getValue={this.setYear}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBSelect searchId={'quarterId'}
                                   label="Отчетный квартал"
                                   search={true}
                                   searchLabel={'Поиск'}
                                   options={this.state.quarterList}
                                   getValue={this.setQuarter}>
                        </MDBSelect>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                        <MDBBtn color="primary" type="none" onClick={this.onReset}>Oчистить фильтры</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                   <TableContainer data={data} isLoading={isLoading} columns={columns} title={"Архив расчета индикаторов ТС"}/>  
                   {/* <PivotContainer pFields={pivotFields} pData={this.state.data} isPLoading={isLoading} title={"Архив расчета индикаторов ТС"}/>  */}
                </MDBRow>
            </MDBContainer>
        );
    }
}

let mapStateToProps = (state) => {
  return {
    parameterVals: state.archivePage.parameterVals,
    isFetchingParameterData: state.archivePage.isFetchingParameterData,

    transportTypes: state.dynamicsPage.transportTypes,
    quarters: state.dynamicsPage.quarters,
    years: state.dynamicsPage.years,
    scenarios: state.dynamicsPage.scenarios,
  };
};

export default compose(connect(mapStateToProps, {
                                getParameterValues,
                                getTransportTypes,
                                getYears,
                                getQuarters,
                                getScenarios
                              }), withRouter )(AdminArchiveIndicatorsPage);




                              /*const pivotFields = [{
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
                            }]; */
