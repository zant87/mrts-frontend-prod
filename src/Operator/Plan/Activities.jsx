import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner, toast, ToastContainer} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {labels} from "../../_components/TableTextLabels";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import appAxios from "../../_services/appAxios";

export default class OperatorPlanActivitiesPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false,
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        this.setState({isLoading: true});
        axios.get(`/api/views/k-2-s-all`)
            .then(res => {
                console.log(res.headers);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'transportStrategyCode', title: 'Код ТС'},
            {field: 'transportStrategyName', title: 'Редакция ТС'},
            {field: 'activityCode', title: 'Обозначение мероприятия'},
            {field: 'activityDescription', title: 'Содержание мероприятия'},
            {field: 'documentType', title: 'Вид документа'},
            {field: 'yearBegin', title: 'Начало реализации'},
            {field: 'yearEnd', title: 'Конец реализации'},
        ];

        const tableRef = React.createRef();
        const {data, isLoading} = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-3 mx-auto'>
                        <MaterialTable
                            title="Мероприятия по реализации ТС"
                            columns={columns}
                            tableRef={tableRef}
                            data={data}
                            isLoading={isLoading}
                            localization={ruLocalization}
                            options={{
                                search: true,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                filtering: true
                            }}
                        />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        )
    }
};
