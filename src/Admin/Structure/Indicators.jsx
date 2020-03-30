import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';

export default class AdminIndicatorsPage extends React.Component {

    state = {
        page: 0,
        count: 1,
        data: [["Загружаем данные..."]],
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = () => {
        axios.get(`/api/views/z-1-s`)
            .then(res => {
                const data= res.data;
                this.setState({ data});
            })
    };



    render() {

        const columns = [
            { name: 'id', label: '#', options:
                    {
                        filter: false
                    }
            },
            { name: 'transportStrategyCode', label: 'Код ТС', options:
                    {
                        display: 'excluded',
                        filter: false,
                    },
            },
            { name: 'transportStrategyName', label: 'Редакция ТС'},
            { name: 'indicatorCode', label: 'Шифр'},
            { name: 'indicatorName', label: 'Индикатор ТС'},
            { name: 'goalName', label: 'Цель ТС'},
            { name: 'transportTypeName', label: 'Вид транспорта'}
        ];

        const { data, page, count, isLoading } = this.state;

        const options = {
            textLabels: {
                body: {
                    noMatch: "Ничего не найдено",
                    toolTip: "Сортировка",
                    columnHeaderTooltip: column => `Сортировка для ${column.label}`
                },
                pagination: {
                    next: "Следующая страница",
                    previous: "Предыдущая страница",
                    rowsPerPage: "Строк на страницу:",
                    displayRows: "из",
                },
                toolbar: {
                    search: "Поиск",
                    downloadCsv: "Скачать CSV",
                    print: "Печать",
                    viewColumns: "Столбцы",
                    filterTable: "Фильтры",
                },
                filter: {
                    all: "Все",
                    title: "Фильтры",
                    reset: "Сброс",
                },
                viewColumns: {
                    title: "Показать столбцы",
                    titleAria: "Показать/Спрятать столбцы",
                },
                selectedRows: {
                    text: "строк выбрано",
                    delete: "Удалить",
                    deleteAria: "Удалить выбранную(ые) строки",
                },
            },
            sortFilterList: false,
            print: false,
            selectableRowsOnClick: true,
            selectableRows: 'none',
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mb-5 mx-auto'>
                        <MUIDataTable
                            title={"Индикаторы по целям ТС"}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
};
