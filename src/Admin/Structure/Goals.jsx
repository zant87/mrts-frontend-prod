import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {labels} from "../../_components/TableTextLabels";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";

export default class AdminStructureGoalsPage extends React.Component {

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
            // { field: 'id', title: '#', type: 'numeric' },
            {
                field: 'transportStrategyName', title: 'Редакция', defaultGroupOrder: 0,
                // cellStyle: {
                //     backgroundColor: '#039be5',
                //     color: '#FFF',
                //     width: '100px'
                // },
            },
            {field: 'goalName', title: 'Цель', defaultGroupOrder: 1},
            // { field: 'transportStrategyCode', type: 'numeric' },
            {field: 'taskName', title: 'Задача'}
        ];

        const { data, isLoading } = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title="Дерево целей и задач"
                            columns={columns}
                            data={data}
                            isLoading={isLoading}
                            options={{
                                grouping: true,
                                search: false,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                tableLayout: 'fixed'
                            }}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
};
