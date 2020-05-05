import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";

export default class OperatorReportAppropriationsPage extends React.Component {

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
        appAxios.get(`/views/k-10-s`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    onChangePage = (page, numberOfRows) => {
        this.setState({
            isLoading: true,
        });

        appAxios.get(`/views/k-10-s?page=${page}&size=${numberOfRows}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'year', label: 'Отчетный год'},
            { name: 'directionName', label: 'Направление расходов' },
            { name: 'fundingName', label: 'Источник финансирования'},
            { name: 'costTypeName', label: 'Вид расходов'},
            { name: 'plan', label: 'Запланировано, млн. руб.' },
            { name: 'fact', label: 'Кассовое исполнение, млн. руб.'},
            { name: 'id', label: 'id', options: {display: 'excluded', filter: false}},
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
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
            onChangeRowsPerPage: (numberOfRows) => {
                this.onChangePage(this.state.page, numberOfRows);
            },
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            ),
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={"Бюджетное финансирование транспорта"}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
