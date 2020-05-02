import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {labels} from "../../_components/TableTextLabels";

export default class AdminGoalsPage extends React.Component {

    state = {
        page: 0,
        count: 1,
        data: [],
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = () => {
        axios.get(`/api/views/z-2-s`)
            .then(res => {
                const data= res.data;
                this.setState({ data});
            })
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
            { name: 'goalName', label: 'Цель ТС'},
            { name: 'taskName', label: 'Задача ТС'}
        ];

        const { data, page, count, isLoading } = this.state;

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
