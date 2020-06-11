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
