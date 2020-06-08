import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";
import TableContainer from "./common/TableContainer";
import appAxios from "../../_services/appAxios";

export default class AdminArchiveProjectsPage extends React.Component {

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
        appAxios.get(`/views/i-4-s-all`)
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
};
