import React, {Fragment} from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import { labels } from "../../_components/TableTextLabels";

export default class OperatorPlanResourcesPage extends React.Component {

    state = {
        page: 0,
        count: 1,
        data: [["Загружаем данные..."]],
        rowsPerPage: 20,
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = () => {
        this.setState({ isLoading: true });
        axios.get(`/api/views/k-4-s`)
            .then(res => {
                console.log(res.headers);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    changePage = (page, rowsPerPage, sortFilterList) => {
        this.setState({
            isLoading: true,
        });

        axios.get(`/api/views/k-4-s?page=${page}&size=${rowsPerPage}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: rowsPerPage});
            });
    };

    columnSortChange = (changedColumn, direction) => {

        this.setState({
            isLoading: true,
        });

        const page = this.state.page;
        const rowsPerPage = this.state.rowsPerPage;
        let sortDirection;

        switch (direction) {
            case "ascending":
                direction = 'descending';
                sortDirection = 'asc';
                break;
            case 'descending':
                direction = 'ascending';
                sortDirection = 'desc';
                break;
            default:
                sortDirection = 'asc';
        }

        axios.get(`/api/views/k-4-s?page=${page}&size=${rowsPerPage}&sort=${changedColumn},${sortDirection}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page});
            });
    };

    render() {

        const columns = [
            { name: 'id', label: '#', options: { filter: false } },
            { name: 'transportStrategyCode', label: 'Редакция ТС'},
            { name: 'scenarioName', label: 'Вариант реализации стратегии'},
            { name: 'costTypeName', label: 'Вид вложений'},
            { name: 'directionName', label: 'Направление вложений'},
            { name: 'fundingSourceName', label: 'Источник финансирования'},
            { name: 'stageName', label: 'Период реализации стратегии'},
            { name: 'planingMin', label: 'Минимальное ресурсное обеспечение, млрд. руб.'},
            { name: 'planingMax', label: 'Максимальное ресурсное обеспечение, млрд. руб.'},
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
                        this.changePage(tableState.page, tableState.rowsPerPage);
                        break;
                }
            },
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            ),
            // onColumnSortChange: (changedColumn, direction) => {
            //     console.log(changedColumn, direction);
            //     this.columnSortChange(changedColumn, direction);
            // }
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner />}
                        <MUIDataTable
                            title={"Ресурсное обеспечение ТС (план)"}
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
