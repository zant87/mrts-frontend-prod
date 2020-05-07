import React, {Fragment} from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
import { labels } from "../../_components/TableTextLabels";
import Button from "@material-ui/core/Button";
import appAxios from "../../_services/appAxios";
import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

export default class OperatorReportFactPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        rowsPerPage: 20,
        isLoading: false,
        serverSideFilterList: [],
        filters: [[], [], [], [], [], [], [], [], []],
        dataProviderList: [],
        transportTypeList: [],
        parameterList: [],
        dataProviderFilter: "",
        transportTypeFilter: "",
        parameterNameFilter: ""
    };

    componentDidMount() {
        this.getData();
        this.getDataProviderList();
        this.getTransportTypeList();
        this.getParameterList();
    };

    getParameterList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/parameters`)
            .then(res => {
                const data = res.data.map(item => {
                    return item.name;
                })
                this.setState({parameterList: data, isLoading: false});
            });
    }

    getTransportTypeList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-transport-types`)
            .then(res => {
                const data = res.data.map(item => {
                    return item.name;
                })
                this.setState({transportTypeList: data, isLoading: false});
            });
    }


    getDataProviderList = () => {
        this.setState({ isLoading: true });
        appAxios.get(`/nsi-data-providers`)
            .then(res => {
                const data = res.data.map(item => {
                    return item.name;
                })
                this.setState({dataProviderList: data, isLoading: false});
            });
    }

    getData = () => {

        this.setState({ isLoading: true });

        let filterString = '';

        if (this.state.dataProviderFilter.length > 0)
            filterString = filterString.concat( '&dataProviderName.equals=', this.state.dataProviderFilter );

        if (this.state.transportTypeFilter.length > 0)
            filterString = filterString.concat( '&transportTypeName.equals=', this.state.transportTypeFilter );

        if (this.state.parameterNameFilter.length > 0)
            filterString = filterString.concat( '&parameterName.equals=', this.state.parameterNameFilter );

        appAxios.get(`/views/k-5-s?sort=id,desc${filterString}`)
            .then(res => {
                console.log(res);
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });

    };

    onChangePage = (page, numberOfRows) => {

        this.setState({
            isLoading: true,
        });

        let filterString = '';

        if (this.state.dataProviderFilter.length > 0)
            filterString = filterString.concat( '&dataProviderName.equals=', this.state.dataProviderFilter );

        if (this.state.transportTypeFilter.length > 0)
            filterString = filterString.concat( '&transportTypeName.equals=', this.state.transportTypeFilter );

        if (this.state.parameterNameFilter.length > 0)
            filterString = filterString.concat( '&parameterName.equals=', this.state.parameterNameFilter );

        console.log(filterString);

        appAxios.get(`/views/k-5-s?page=${page}&size=${numberOfRows}&sort=id,desc${filterString}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: page, rowsPerPage: numberOfRows});
            });

    };

    onHandleFilterSubmit = filterList => () => {
        console.log('State: ', this.state);
        console.log('Выбранные фильтры: ', filterList);

        this.setState({ isLoading: true, filters: filterList });

        const dataProviderName = filterList[1];
        console.log(dataProviderName);

        const transportTypeName = filterList[2];
        console.log(transportTypeName);

        const parameterName = filterList[4];
        console.log(parameterName);

        this.setState({
            isLoading: true,
        });

        let filterString = '';

        if (filterList[1].length > 0)
            filterString = filterString.concat( '&dataProviderName.equals=', dataProviderName );

        if (filterList[2].length > 0)
            filterString = filterString.concat( '&transportTypeName.equals=', transportTypeName );

        if (filterList[4].length > 0)
            filterString = filterString.concat( '&parameterName.equals=', parameterName );

        console.log(filterString);

        appAxios.get(`/views/k-5-s?page=0&size=${this.state.rowsPerPage}&sort=id,desc${filterString}`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count, page: 0,
                    rowsPerPage: this.state.rowsPerPage, dataProviderFilter: dataProviderName,
                    transportTypeFilter: transportTypeName, parameterNameFilter: parameterName
                });
            });
    };

    render() {

        const columns = [
            { name: 'id', label: '#', options: {filter: false} },
            { name: 'dataProviderName', label: 'Источник данных', options: {filter: true,filterList: this.state.filters[1],
                    filterOptions: {
                        names: this.state.dataProviderList,
                    },
                }
            },
            { name: 'transportTypeName', label: 'Вид транспорта', options: {filter: true, filterList: this.state.filters[2],
                    filterOptions: {
                        names: this.state.transportTypeList,
                    },
                }
            },
            { name: 'formCode', label: 'Форма', options: {filter: false} },
            { name: 'parameterName', label: 'Показатель', options: {filter: true, filterList: this.state.filters[4],
                    filterOptions: {
                        names: this.state.parameterList,
                    },
                }
            },
            { name: 'year', label: 'Отчетный год', options: {filter: false} },
            { name: 'quarterName', label: 'Отчетный квартал', options: {filter: false} },
            { name: 'okeiName', label: 'Единица измерения', options: {filter: false} },
            { name: 'value', label: 'Значение показателя', options: {filter: false} },
            { name: "",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <ButtonUpdateColumn rowData = {tableMeta.rowData}/>
                        );
                    }
                }
            },
        ];

        const { data, page, count, isLoading } = this.state;

        const options = {
            serverSide: true,
            serverSideFilterList: this.state.serverSideFilterList,
            count: count,
            page: page,
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100, 1000, 2500, 5000],
            textLabels: labels,
            sortFilterList: false,
            print: false,
            search: false,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changePage':
                        this.onChangePage(tableState.page, tableState.rowsPerPage);
                        break;
                }
            },
            // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            //     <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
            // ),
            onChangeRowsPerPage: (numberOfRows) => {
                this.onChangePage(this.state.page, numberOfRows);
            },
            customFilterDialogFooter: filterList => {
                return (
                    <div style={{ marginTop: '40px' }}>
                        <Button variant="contained" onClick={this.onHandleFilterSubmit(filterList)}>Фильтровать</Button>
                    </div>
                );
            }
        };

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={ "Фактические значения показателей" }
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
