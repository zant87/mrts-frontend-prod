import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow} from "mdbreact";
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

export default class AdminArchiveActivitiesPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
    }

    componentDidMount() {
        // this.getData();
    }

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
};
