import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

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
        // appAxios.get(`/views/k-9-s?sort=id,desc`)
        appAxios.get(`/views/k-9-s-all`)
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

        appAxios.get(`/views/k-9-s?page=${page}&size=${numberOfRows}&sort=id,desc`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'year', label: 'Отчетный год', options: { filter: true} },
            { name: 'directionName', label: 'Направление расходов', options: { filter: true} },
            { name: 'fundingName', label: 'Источник финансирования', options: { filter: true} },
            { name: 'costTypeName', label: 'Вид расходов', options: { filter: true} },
            { name: 'plan', label: 'Запланировано, млн. руб.' , options: { filter: false} },
            { name: 'fact', label: 'Кассовое исполнение, млн. руб.', options: { filter: false} },
            { name: 'id', label: 'id', options: {display: 'excluded', filter: false}},
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
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
            // serverSide: true,
            // count: count,
            // page: page,
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
            textLabels: labels,
            print: false,
            selectableRows: 'none',
            // selectableRowsOnClick: true,
            // onTableChange: (action, tableState) => {
            //     switch (action) {
            //         case 'changePage':
            //             this.onChangePage(tableState.page, tableState.rowsPerPage);
            //             break;
            //     }
            // },
            // onChangeRowsPerPage: (numberOfRows) => {
            //     this.onChangePage(this.state.page, numberOfRows);
            // },
            // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            //     <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            // ),
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='mx-auto'>
                        {isLoading && <MDBSpinner multicolor/>}
                        <MUIDataTable
                            title={"Бюджетные ассигнования в рамках программ развития транспорта"}
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
