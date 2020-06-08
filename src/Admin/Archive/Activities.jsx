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
        this.getData();
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
            {field: 'okudName', title: 'ОКУД', filtering: true, editable: 'never'},
            {field: 'parameterName', title: 'Показатель', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Тип транспорта', filtering: true, editable: 'never'},
            {field: 'dataProviderCode', title: 'Отчетный квартал', filtering: true, editable: 'never'},
            {field: 'value', title: 'Значение показателя', filtering: true, editable: 'never' },
        ];

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
