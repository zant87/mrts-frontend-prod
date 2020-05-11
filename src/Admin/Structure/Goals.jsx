import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {labels} from "../../_components/TableTextLabels";
import appAxios from "../../_services/appAxios";

export default class AdminGoalsPage extends React.Component {

    state = {
        data: [],
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {

        this.setState({ isLoading: true });
        let res = await appAxios.get(`/views/z-2-s?sort=id,desc&size=2000`);
        let data = res.data;
        this.setState({ data: data, isLoading: false });

    };

    render() {

        const columns = [
            { name: 'id', label: '#', options: { filter: false } },
            { name: 'transportStrategyCode', label: 'Код ТС', options: { display: 'excluded', filter: false } },
            { name: 'transportStrategyName', label: 'Редакция ТС'},
            { name: 'goalName', label: 'Цель ТС'},
            { name: 'taskName', label: 'Задача ТС'}
        ];

        const { data, isLoading } = this.state;

        const options = {
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
            textLabels: labels,
            sortFilterList: false,
            print: false,
            selectableRowsOnClick: true,
            selectableRows: 'none',
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={"Дерево целей и задач"}
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
