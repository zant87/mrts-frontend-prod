import React, {Fragment} from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import { labels } from "../../_components/TableTextLabels";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

export default class OperatorPlanResourcesPage extends React.Component {

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
        axios.get(`/api/views/k-4-s?sort=id,desc&size=2000`)
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

        axios.get(`/api/views/k-4-s?page=${page}&size=${numberOfRows}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
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
            { name: "",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <ButtonUpdateColumn rowData = {tableMeta.rowData}/>
                        );
                    }
                }
            },
        ];

        const { data, page, count, isLoading } = this.state;

        const options = {
            // count: count,
            // page: page,
            serverSide: false,
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
            textLabels: labels,
            print: false,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            // sortFilterList: false,
            // onTableChange: (action, tableState) => {
            //     switch (action) {
            //         case 'changePage':
            //             this.onChangePage(tableState.page, tableState.rowsPerPage);
            //             break;
            //     }
            // },
            // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            //     <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            // ),
            // onChangeRowsPerPage: (numberOfRows) => {
            //     this.onChangePage(this.state.page, numberOfRows);
            // }
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={ "Ресурсное обеспечение ТС (план)"}
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
