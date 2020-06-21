import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getParameterValues } from "@/_reducers/archive-reducer";

import moment from "moment";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow, MDBCol, MDBSelect, MDBDatePicker, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";
import TableContainer from "./common/TableContainer";
import appAxios from "../../_services/appAxios";
/* http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-1-resource

http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-2-resource

http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-3-resource

http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/i-4-resource

количество записей передаётся в хедере x-total-count
для всех представлений есть метод all
как работают критерии можешь посмотреть в Аналитике

ну либо в swagger
*/

class AdminArchiveActivitiesPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
        modal: false,
        date: "2019-12-31",


        activityId: '',
        documentTypeId: '',


        year: '',
        quarterId: '',

        beginDate: '',
        endDate: '',

        quarterList: [],
        yearList: [],


        activityList: [],
        documentTypeList: []


    }

    componentDidMount() {
        // this.getData();

        this.getActivityList();
        this.getDocumentTypeList();
        this.getQuarterList();
        this.getDataYearList();
    }

    onReset = () => {

       this.setState({
            activityId: '',
            documentTypeId: '',
            beginDate: '',
            endDate: '',
            year: '',
            quarterId: '',
       });
       
       this.getActivityList();
       this.getDocumentTypeList();
       this.getQuarterList();
       this.getDataYearList();
    }

    filterData = async () => {

        const { activityId, documentTypeId, beginDate, endDate, year, quarterId } = this.state;
        this.setState({isLoading: true});
        this.toggle();

        appAxios.get(`/views/i-3-s-all?activityId.equals=` + activityId + 
                                          `&activityDocumentTypeId.equals=` + documentTypeId +                                           
                                          `&beginDate.equals=` + beginDate +
                                          `&endDate.equals=` + endDate +
                                          `&year.equals=` + year +
                                          `&quarterId.equals=` + quarterId)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
                this.onReset();
            });
    };

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/views/i-3-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

     toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
    

    getActivityList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/activities`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({activityList: data, isLoading: false});
            })
    };
    
    getDocumentTypeList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/document-types`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({documentTypeList: data, isLoading: false});
            })
    };

    getQuarterList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-quarters`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({quarterList: data, isLoading: false});
            })
    };

    getDataYearList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-years`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.year, text: item.year, checked: false};
                })
                this.setState({yearList: data, isLoading: false});
            })
    };

    getBeginDate = (value) => {
        const date = moment(value);
        this.setState({ beginDate: date.format('YYYY-MM-DD')});
    }

    getEndDate = (value) => {
        const date = moment(value);
        this.setState({ endDate: date.format('YYYY-MM-DD')});
    }

    setDocumentType = e => {
        this.setState({
            documentTypeId: e.toString()
        });
    }

    setActivity = e => {
        this.setState({
            activityId: e.toString()
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

  render() {

    const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год', filtering: true, editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true, editable: 'never'},


            {field: 'activityCode', title: 'КОД', filtering: true, editable: 'never'},
            {field: 'activityName', title: 'Мероприятие', filtering: true, editable: 'never'},
            {field: 'activityDocumentType', title: 'Тип документа', filtering: true, editable: 'never'},
            {field: 'activityExecutors', title: 'Исполнитель', filtering: true, editable: 'never'},

            {field: 'beginDate', title: 'Начало периода', filtering: true },
            {field: 'endDate', title: 'Конец периода', filtering: true },
        ];

        const { data, isLoading } = this.state;
        
        /*id": 1,
            "transportStrategyCode": "VER_12_05_2018",
            "year": 2018,
            "quarterName": "IV квартал",

            "activityCode": "ACT_7.191",

            "activityName": "Разработка методики подготовки обзоров (докладов) о ходе реализации Транспортной стратегии Российской Федерации на период до 2030 года",
            "activityDocumentType": "научно-исследовательская работа, ведомственный нормативный акт",
            "activityExecutors": "Минтранс России",

            "reportDescription": null,
            "report": null,

            "beginDate": "2020-06-03",
            "endDate": "2020-06-05",

            "transportStrategyVersionId": 3,
            "quarterId": 4,
            "activityId": 199
        */

    return (
        <MDBContainer fluid>
            <MDBRow className='mt-5'>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>Архив</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Архив выполнения мероприятий по реализации ТС</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBRow>
            <div className="text-right">
                   {this.state.searchBystr} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBBtn color="info" onClick={this.toggle}>Фильтры</MDBBtn>
                </div>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}  size="lg"  >
                  <MDBModalHeader toggle={this.toggle}>&nbsp;&nbsp;&nbsp;&nbsp;Архив выполнения мероприятий по реализации ТС</MDBModalHeader>
                  <MDBModalBody>


                      <MDBRow around={true}>
                          <MDBCol md="4" className="mb-4">
                              <MDBSelect searchId={'documentTypeId'}
                                         label="Тип документа"
                                         search={true}
                                         searchLabel={'Поиск'}
                                         options={this.state.documentTypeList}
                                         getValue={this.setDocumentType}>
                              </MDBSelect>
                          </MDBCol>
                          <MDBCol md="4" className="mb-4">
                              <MDBSelect searchId={'activityId'}
                                         label="Мероприятие"
                                         search={true}
                                         searchLabel={'Поиск'}
                                         options={this.state.activityList}
                                         getValue={this.setActivity}>
                              </MDBSelect>
                          </MDBCol>
                      </MDBRow>
                      <MDBRow around={true}>
                          <MDBCol md="4" className="mb-4">
                              <label htmlFor='datepicker'>Начало периода</label>
                              <MDBDatePicker getValue={this.getBeginDate}
                                             format='YYYY-MM-DD'
                                             locale={moment.locale('ru')}
                                             okLabel='ОК'
                                             name='beginDate'
                                             keyboard={true}
                                             invalidDateMessage='Неправильный формат даты'
                                             valueDefault={new Date(this.state.date)}
                                             cancelLabel='Отмена'/>
                          </MDBCol>
                          <MDBCol md="4" className="mb-4">
                              <label htmlFor='datepicker'>Конец периода</label>
                              <MDBDatePicker getValue={this.getEndDate}
                                             format='YYYY-MM-DD'
                                             locale={moment.locale('ru')}
                                             okLabel='ОК'
                                             name='endDate'
                                             keyboard={true}
                                             invalidDateMessage='Неправильный формат даты'
                                             valueDefault={new Date(this.state.date)}
                                             cancelLabel='Отмена'/>
                          </MDBCol>
                      </MDBRow>
                      <MDBRow around={true}>
                          <MDBCol md="4" className="mb-4">
                              <MDBSelect searchId={'year'}
                                         label="Отчетный год"
                                         search={true}
                                         searchLabel={'Поиск'}
                                         options={this.state.yearList}
                                         getValue={this.setYear}>
                              </MDBSelect>
                          </MDBCol>
                          <MDBCol md="4" className="mb-4">
                              <MDBSelect searchId={'quarterId'}
                                         label="Отчетный квартал"
                                         search={true}
                                         searchLabel={'Поиск'}
                                         options={this.state.quarterList}
                                         getValue={this.setQuarter}>
                              </MDBSelect>
                          </MDBCol>
                      </MDBRow>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Закрыть</MDBBtn>
                        <MDBBtn color="primary" onClick={this.filterData} >Получить данные</MDBBtn>
                      </MDBModalFooter>
                    </MDBModal>
            <MDBRow>
               <TableContainer data={this.state.data} isLoading={this.state.isLoading} columns={columns} title={"Архив выполнения мероприятий по реализации ТС"}/> 
            </MDBRow>
        </MDBContainer>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    parameterVals: state.archivePage.parameterVals,
    isFetchingParameterData: state.archivePage.isFetchingParameterData,
  };
};


export default compose(connect(mapStateToProps, {
                                getParameterValues,
                              }), withRouter )(AdminArchiveActivitiesPage);
