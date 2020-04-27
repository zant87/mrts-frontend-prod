import React, {Fragment} from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import { labels } from "../../_components/TableTextLabels";

export default class OperatorPlanIndicatorsPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        rowsPerPage: 20,
        isLoading: false,
    };

    componentDidMount() {
        //сохранять state через redux
        this.getData();
    };

    getData = () => {
        this.setState({ isLoading: true });
        axios.get(`/api/views/k-1-s`)
            .then(res => {
                console.log(res.headers);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    onChangePage = (page, numberOfRows) => {
        this.setState({
            isLoading: true,
        });

        axios.get(`/api/views/k-1-s?page=${page}&size=${numberOfRows}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'id', label: '#', options: {filter: false} },
            { name: 'transportStrategyCode', label: 'Редакция ТС'},
            { name: 'scenarioName', label: 'Вариант реализации стратегии'},
            { name: 'goalName', label: 'Цель'},
            { name: 'indicatorName', label: 'Индикатор'},
            { name: 'transportTypeName', label: 'Вид транспорта'},
            { name: 'indicatorDate', label: 'Этап реализации стратегии'},
            { name: 'okeiId', label: 'OkeiId', options: {filter: false, display: 'excluded'} },
            { name: 'okeiName', label: 'Единица измерения'},
            { name: 'value', label: 'Значение индикатора'},
            { name: 'indicatorValueId', label: 'indicatorValueId', options: {filter: false, display: 'excluded'}}
        ];

        const { data, page, count, isLoading } = this.state;

        const options = {
            serverSide: true,
            count: count,
            page: page,
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
            textLabels: labels,
            sortFilterList: false,
            print: false,
            selectableRowsOnClick: true,
            selectableRows: 'single',
            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changePage':
                        this.onChangePage(tableState.page, tableState.rowsPerPage);
                        break;
                }
            },
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            ),
            onChangeRowsPerPage: (numberOfRows) => {
                this.onChangePage(this.state.page, numberOfRows);
            }
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={ "Индикаторы ТС по целям и задачам (план)" }
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
