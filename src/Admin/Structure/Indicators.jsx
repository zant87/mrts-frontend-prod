import React from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import TableContainer from "../../_components/TableContainer";

export default class AdminStructureIndicatorsPage extends React.Component {

    state = {
        data: [],
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {

        this.setState({ isLoading: true });
        let res = await appAxios.get(`/views/z-1-s?sort=id,desc&size=2000`);
        let data = res.data;
        this.setState({ data: data, isLoading: false });

    };

    render() {

        const columns = [
            {field: 'transportStrategyName', title: 'Редакция', defaultGroupOrder: 0},
            {field: 'goalName', title: 'Цель', defaultGroupOrder: 1},
            {field: 'transportTypeName', title: 'Вид транспорта'},
            {field: 'indicatorName', title: 'Индикатор'},
        ];

        const options = {
            grouping: true,
            search: false,
            pageSize: 100,
            pageSizeOptions: [20, 50, 100],
            tableLayout: 'fixed'
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Индикаторы по целям ТС'}
                    baseUrl={'views/z-1-s'}
                    options={options}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
