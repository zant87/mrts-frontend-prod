import React from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSpinner } from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import appAxios from "../../_services/appAxios";
import { history } from "@/_helpers";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

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
        // appAxios.get(`/views/k-6-s?sort=id,desc`)
        appAxios.get(`/views/k-6-s?sort=id,desc&size=2000`)
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

        appAxios.get(`/views/k-6-s?page=${page}&size=${numberOfRows}&sort=id,desc`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });
    };

    render() {

        const columns = [
            { name: 'activityReportId', label: '#', options: {filter: false}},
            { name: 'activityCode', label: 'Обозначение мероприятия', options: {display: 'excluded', filter: false}},
            { name: 'activityName', label: 'Наименование мероприятия', options: {filter: false}},
            { name: 'documentType', label: 'Вид документа'},
            { name: 'activityDescription', label: 'Содержание мероприятия', options: {filter: false}},
            { name: 'yearNumber', label: 'Отчетный год'},
            { name: 'quarterName', label: 'Отчетный квартал'},
            { name: 'reportDescription', label: 'Отчет исполнителя', options: {filter: false}},
            { name: 'documentId', label: 'documentId', options: {display: 'excluded', filter: false}},
            { name: 'activityId', label: 'activityId', options: {display: 'excluded', filter: false}},
            { name: 'activityReportId', label: 'activityReportId', options: {display: 'excluded', filter: false}},
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
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
            textLabels: labels,
            print: false,
            selectableRows: 'none',
            // serverSide: true,
            // count: count,
            // page: page,
            // selectableRowsOnClick: true,
            // sortFilterList: false,
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
            // customToolbar: () => {
            //     return (
            //         <CustomToolbar />
            //     );
            // },
            // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            //     <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            // ),
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
