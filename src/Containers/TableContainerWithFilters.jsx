import React from "react";
import {MDBContainer, MDBRow, MDBCol, toast} from "mdbreact";
import appAxios from "../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../_components";
import "moment/locale/ru";

export default class TableContainerWithFilters extends React.Component {

    render() {
        const options = this.props.options
            ? this.props.options
            : {
                pageSize: 20,
                pageSizeOptions: [20, 50, 100],
                actionsColumnIndex: 999,
                filtering: true,
                search: false,
                columnsButton: true,
            };

        const loadAll = this.props.loadAll ? this.props.loadAll : false;
        const filterMinimalLength = this.props.filterMinimalLength ? this.props.filterMinimalLength : 3;
        const tableRef = this.props.tableRef ? this.props.tableRef : React.createRef();
        const filtersList = this.props.filtersList ? this.props.filtersList : null;
        const modifiedBaseUrl = this.props.modifiedBaseUrl ? this.props.modifiedBaseUrl : false;
        const editable = this.props.editable ? this.props.editable : null;

        console.log(tableRef);

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={"12"} className="my-2 mx-auto">
                        <MaterialTable
                            title={this.props.title}
                            columns={this.props.columns}
                            tableRef={tableRef}
                            localization={ruLocalization}
                            options={options}
                            actions={this.props.actions}
                            editable={this.props.editable}
                            data={(query) =>
                                new Promise((resolve, reject) => {
                                    console.log("Параметры запроса", query);

                                    let url = `/${this.props.baseUrl}?page=${query.page}&size=${query.pageSize}`;
                                    if (modifiedBaseUrl) url = `/${this.props.baseUrl}&page=${query.page}&size=${query.pageSize}`;
                                    let filtersEnabled = false;

                                    if (query.orderBy) {
                                        url += `&sort=${query.orderBy.field},${query.orderDirection}`;
                                    }

                                    if (filtersList) {
                                        console.log('Фильтры = ', filtersList);
                                        const filters = Object.keys(filtersList);
                                        filters.forEach((filter) => {
                                            if (filtersList[filter].value) {
                                                console.log(filtersList[filter]);
                                                url += `&${filter}.${filtersList[filter].operator}=${filtersList[filter].value}`;
                                            }
                                        });
                                    }

                                    console.log("Запрос", url);

                                    if (loadAll) {
                                        appAxios.get(url).then((res) => {
                                            const count = Number(res.headers["x-total-count"]);
                                            const data = res.data;

                                            resolve({
                                                data: data,
                                                page: query.page,
                                                totalCount: count,
                                            });
                                        });
                                    } else if (filtersEnabled) {
                                        appAxios.get(url).then((res) => {
                                            const count = Number(res.headers["x-total-count"]);
                                            const data = res.data;
                                            resolve({
                                                data: data,
                                                page: query.page,
                                                totalCount: count,
                                            });
                                        });
                                    } else {
                                        resolve({
                                            data: [],
                                            page: 0,
                                            totalCount: 0,
                                        });
                                    }
                                })
                            }
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
