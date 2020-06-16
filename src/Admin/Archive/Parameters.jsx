import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import TableContainer from "./common/TableContainer";
import appAxios from "../../_services/appAxios";

export default class AdminArchiveParametersPage extends React.Component {

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
        appAxios.get(`/views/i-1-s-all`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };


    /* year": 2017,
    "quarterName": "I квартал",
    "okudCode": "0615096",
    "okudName": "1-море",
    "parameterCode": "МТ_ОТПРАВЛЕНО_ГРУЗОВ_СЕВЕР",
    "parameterName": "Отправлено грузов в районы Крайнего Севера и приравненные к ним местности (на морском транспорте)",
    "transportTypeName": "Морской транспорт",
    "dataProviderCode": "Росморречфлот",
    "beginDate": "2020-04-05",
    "endDate": "2099-12-31",
    "value": 473,
    "okudId": 12,
    "parameterId": 37,
    "transportTypeId": 17,
    "dataProviderId": 24,
    "quarterId": 1,
    "okeiId":
    */

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'year', title: 'Отчетный год', filtering: true, editable: 'never'},
            {field: 'quarterName', title: 'Отчетный квартал', filtering: true, editable: 'never'},
            {field: 'okudName', title: 'ОКУД', filtering: true, editable: 'never'},
            {field: 'parameterName', title: 'Показатель', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Тип транспорта', filtering: true, editable: 'never'},
            {field: 'dataProviderCode', title: 'Источник', filtering: true, editable: 'never'},
            {field: 'value', title: 'Значение показателя', filtering: true, editable: 'never'},
        ];

        const {data, isLoading} = this.state;

        return (
            <TableContainer data={this.state.data} isLoading={this.state.isLoading} columns={columns}
                            title={"Архив показателей для расчета индикаторов ТС"}/>
        );
    }
};

