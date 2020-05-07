import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {labels} from "../../_components/TableTextLabels";

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

    getData = () => {
        this.setState({
            isLoading: true,
        });
        axios.get(`/api/views/k-3-s?sort=id,desc&size=2000`)
            .then(res => {
                const data= res.data;
                this.setState({ data: data, isLoading: false, });
            })
    };

    render() {


        const columns = [
            { name: 'id', label: '#'},
            { name: 'transportStrategyName', label: 'Редакция ТС'},
            { name: 'projectCode', label: 'Обозначение проекта'},
            { name: 'projectName', label: 'Проект'},
            { name: 'scenarioName', label: 'Вариант реализации стратегии'},
            { name: 'cost', label: 'Общие затраты млрд. руб'},
            { name: 'workStage', label: 'Стадия работ'},
            { name: 'geolink', label: 'Географическая привязка' },
        ];

        const { data, page, count, isLoading } = this.state;

        const options = {
            textLabels: labels,
            sortFilterList: false,
            print: false,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={"Крупные инвестиционные проекты"}
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
