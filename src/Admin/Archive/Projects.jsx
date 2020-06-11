import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getParameterValues } from "@/_reducers/archive-reducer";

import moment from "moment";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow, MDBCol, MDBSelect, MDBDatePicker, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";
import TableContainer from "./common/TableContainer";
import appAxios from "../../_services/appAxios";

class AdminArchiveProjectsPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
        modal: false,
        date: "2019-12-31",

        projectId: '',
        planBeginYear: '',
        planEndYear: '',
        year: '',
        quarterId: '',

        beginDate: '',
        endDate: '',

        projectList: [],
        yearList: [],
        quarterList: [],
    }

    componentDidMount() {
        this.getData();
    }

    onReset = () => {

       this.setState({
            projectId: '',
            planBeginYear: '',
            planEndYear: '',
            beginDate: '',
            endDate: '',
            year: '',
            quarterId: '',
       });
       
       this.getProjectList();
       this.getQuarterList();
       this.getDataYearList();
    }

    filterData = async () => {

        const { projectId, planBeginYear, planEndYear, year, quarterId } = this.state;
        this.setState({isLoading: true});
        this.toggle();

        appAxios.get(`/views/i-4-s-all?projectId.equals=` + projectId + 
                                          `&planBeginYear.equals=` + planBeginYear + 
                                          `&planEndYear.equals=` + planEndYear +
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
        appAxios.get(`/views/i-4-s-all`)
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


    getProjectList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/projects`)
            .then(res => {
                let selected;
                const data = res.data.map(item => {
                        return {value: item.id, text: item.name, checked: false};
                })
                this.setState({projectList: data, isLoading: false});
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

            {field: 'projectName', title: 'Имя проекта', filtering: true, editable: 'never'},

            {field: 'planBeginYear', title: 'Год начала', filtering: true },
            {field: 'planEndYear', title: 'Год окончания', filtering: true },

            {field: 'planCost', title: 'План', filtering: true, editable: 'never'},
            {field: 'reportFactCost', title: 'Отчетный факт', filtering: true, editable: 'never'},
            {field: 'factCost', title: 'Факт', filtering: true, editable: 'never'},

            {field: 'beginDate', title: 'Начало периода', filtering: true },
            {field: 'endDate', title: 'Конец периода', filtering: true },
        ];

        const { data, isLoading } = this.state;


        /*"id": 53,
            "transportStrategyCode": "VER_12_05_2018",
            "year": 2018,
            "quarterName": "IV квартал",

            "projectCode": "PROJ_I_51",
            "projectName": "Скоростное движение на направлении Новосибирск - Барнаул ",
            "workStage": "1",

            "planBeginYear": 2026,
            "planEndYear": 2029,

            "planCost": 61.9,


            "reportDescription": null,
            "reportDescriptionFormatted": null,
            "reportDone": null,
            "report": null,
            "reportFactBeginYear": null,
            "reportFactEndYear": null,



            "reportFactCost": 4000,
            "factCost": 2400,

            "beginDate": "2020-06-03",
            "endDate": "2099-12-31",


            "transportStrategyVersionId": 3,
            "quarterId": 4,
            "projectId": 315,
            "projectReportId": 53
            */


        return (
            <MDBContainer fluid>
                <MDBRow className='mt-5'>
                    <MDBBreadcrumb>
                        <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
                        <MDBBreadcrumbItem>Архив</MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>Архив выполнения крупных инвестиционных проектов</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBRow>
                <MDBRow>
                   <TableContainer data={this.state.data} isLoading={this.state.isLoading} columns={columns} title={"Архив выполнения крупных инвестиционных проектов"}/> 
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
                              }), withRouter )(AdminArchiveProjectsPage);
