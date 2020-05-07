import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {labels} from "../../_components/TableTextLabels";

export default class AdminIndicatorsPage extends React.Component {

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

        axios.get(`/api/views/z-1-s?sort=id,desc&size=2000`)
            .then(res => {
                const data= res.data;
                this.setState({data: data, isLoading: false});
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
            { name: 'indicatorCode', label: 'Шифр'},
            { name: 'indicatorName', label: 'Индикатор ТС'},
            { name: 'goalName', label: 'Цель ТС'},
            { name: 'transportTypeName', label: 'Вид транспорта'}
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
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={"Индикаторы по целям ТС"}
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
