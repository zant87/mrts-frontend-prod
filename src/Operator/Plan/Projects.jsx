import React from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import appAxios from "../../_services/appAxios";

export default class OperatorPlanProjectsPage extends React.Component {

    state = {
        page: 0,
        count: 1,
        data: [],
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        this.setState({
            isLoading: true,
        });
        appAxios.get(`/views/k-3-s-all`)
            .then(res => {
                const data = res.data;
                this.setState({data: data, isLoading: false,});
            })
    };

    render() {


        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'transportStrategyName', title: 'Редакция ТС'},
            {field: 'projectCode', title: 'Обозначение проекта'},
            {field: 'projectName', title: 'Проект'},
            {field: 'scenarioName', title: 'Вариант реализации стратегии'},
            {field: 'cost', title: 'Общие затраты млрд. руб'},
            {field: 'workStage', title: 'Стадия работ'},
            {field: 'geolink', title: 'Географическая привязка'},
        ];

        const tableRef = React.createRef();
        const {data, isLoading} = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        <MaterialTable
                            title="Крупные инвестиционные проекты"
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
