import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import CustomToolbar from "../../_components/CustomToolbar";
import axios from "axios";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";

export default class OperatorReportActivitiesPage extends React.Component {

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
        axios.get(`/api/views/k-6-s`)
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

        axios.get(`/api/views/k-6-s?page=${page}&size=${numberOfRows}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'activityReportId', label: '#'},
            { name: 'activityCode', label: 'Обозначение мероприятия', options: {display: 'excluded', filter: false}},
            { name: 'activityName', label: 'Наименование мероприятия', options: {filter: false}},
            { name: 'documentType', label: 'Вид документа'},
            { name: 'activityDescription', label: 'Содержание мероприятия', options: {filter: false}},
            { name: 'yearNumber', label: 'Отчетный год'},
            { name: 'quarterName', label: 'Отчетный квартал'},
            { name: 'reportDescription', label: 'Отчет исполнителя'},
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
            { name: 'activityId', label: 'activityId', options: {display: 'excluded', filter: false}},
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
            customToolbar: () => {
                return (
                    <CustomToolbar />
                );
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
                            title={"Выполнение мероприятий по реализации ТС"}
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
