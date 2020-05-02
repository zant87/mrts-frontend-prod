import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner, toast, ToastContainer } from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {labels} from "../../_components/TableTextLabels";

export default class OperatorPlanActivitiesPage extends React.Component {

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
        axios.get(`/api/views/k-2-s`)
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

        axios.get(`/api/views/k-2-s?page=${page}&size=${numberOfRows}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });

        // toast.success('Success message', {
        //     closeButton: false
        // });

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
            { name: 'activityCode', label: 'Обозначение мероприятия'},
            { name: 'activityDescription', label: 'Содержание мероприятия', options:
                    {
                        filter: false,
                    }},
            { name: 'documentType', label: 'Вид документа'},
            { name: 'yearBegin', label: 'Начало реализации'},
            { name: 'yearEnd', label: 'Конец реализации'},
            { name: 'activityId', label: 'ИД Мероприятия', options:
                    {
                        display: 'excluded',
                        filter: false,
                    },
            },
            { name: 'transportStrategyVersionId', label: 'ИД ТС', options:
                    {
                        display: 'excluded',
                        filter: false,
                    },
            },
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
            selectableRows: 'none',
            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changePage':
                        this.onChangePage(tableState.page, tableState.rowsPerPage);
                        break;
                }
            },
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
                        title={"Мероприятия по реализации ТС"}
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
