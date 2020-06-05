import React from 'react';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdbreact";
import MUIDataTable from "mui-datatables";
import {labels} from "../../_components/TableTextLabels";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";

export default class AdminIndicatorsPage extends React.Component {

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
            // { field: 'id', label: '#', },
            // { field: 'transportStrategyCode', label: 'Код ТС', options: { display: 'excluded', filter: false } },
            {field: 'transportStrategyName', title: 'Редакция', defaultGroupOrder: 0},
            // { field: 'indicatorCode', title: 'Шифр'},
            {field: 'goalName', title: 'Цель', defaultGroupOrder: 1},
            {field: 'transportTypeName', title: 'Вид транспорта'},
            {field: 'indicatorName', title: 'Индикатор'},
        ];

        const {data, isLoading} = this.state;

        // const options = {
        //     rowsPerPage: 20,
        //     rowsPerPageOptions: [20, 50, 100],
        //     textLabels: labels,
        //     sortFilterList: false,
        //     print: false,
        //     selectableRowsOnClick: false,
        //     selectableRows: 'none',
        // };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {/*{isLoading && <MDBSpinner multicolor />}*/}
                        {/*<MUIDataTable*/}
                        {/*    title={"Индикаторы по целям ТС"}*/}
                        {/*    data={data}*/}
                        {/*    columns={columns}*/}
                        {/*    options={options}*/}
                        {/*/>*/}
                        <MaterialTable
                            title="Индикаторы по целям ТС"
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
