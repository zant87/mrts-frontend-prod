import React from 'react';
import {MDBContainer, MDBRow, MDBCol, toast} from "mdbreact";
import appAxios from "../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "./MaterialTableLocalization";

export default class TableContainer extends React.Component {

    constructor(props) {
        super(props);
    }
    

    render() {

        const options = this.props.options ? this.props.options : {
            pageSize: 20,
            pageSizeOptions: [20, 50, 100],
            actionsColumnIndex: 999,
            filtering: true,
            search: false,
            columnsButton: true
        };

        const loadAll = this.props.loadAll ? this.props.loadAll : false;
        const filterMinimalLength = this.props.filterMinimalLength ? this.props.filterMinimalLength : 3;
        const tableRef = this.props.tableRef ? this.props.tableRef : React.createRef();
        const filtersList = this.props.filtersList ? this.props.filtersList : null;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title={this.props.title}
                            columns={this.props.columns}
                            tableRef={tableRef}
                            localization={ruLocalization}
                            options={options}
                            actions={this.props.actions}
                            data={query =>
                                new Promise((resolve, reject) => {

                                    console.log('Параметры запроса', query);
                                    console.log('Фильтры', filtersList);

                                    let url = `/${this.props.baseUrl}?page=${query.page}&size=${query.pageSize}`;
                                    let filtersEnabled = false;

                                    if (query.orderBy) {
                                        url += `&sort=${query.orderBy.field},${query.orderDirection}`;
                                    }

                                    if (query.filters.length > 0) {
                                        query.filters.forEach(element => {
                                                if (element.value.length >= filterMinimalLength) {

                                                    if (filtersList && filtersList[element.column.field]) {
                                                        console.log(element.column.field, 'filter is', filtersList[element.column.field]);
                                                        url += `&${element.column.field}.${filtersList[element.column.field]}=${element.value}`;
                                                    } else {
                                                        url += `&${element.column.field}.contains=${element.value}`;
                                                    }

                                                    filtersEnabled = true;
                                                }
                                        });
                                    }

                                    console.log('Запрос', url);

                                    if (loadAll) {
                                        appAxios.get(url)
                                            .then(res => {
                                                const count = Number(res.headers['x-total-count']);
                                                const data = res.data;

                                                resolve({
                                                    data: data,
                                                    page: query.page,
                                                        totalCount: count
                                                    });
                                                });
                                        } else if (filtersEnabled) {
                                            appAxios.get(url)
                                                .then(res => {
                                                    const count = Number(res.headers['x-total-count']);
                                                    const data = res.data;
                                                    resolve({
                                                        data: data,
                                                        page: query.page,
                                                        totalCount: count
                                                    });
                                                });
                                        } else {
                                            resolve(
                                                {
                                                    data: [],
                                                    page: 0,
                                                    totalCount: 0
                                                }
                                            );
                                        }
                                    }
                                )
                            }
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

