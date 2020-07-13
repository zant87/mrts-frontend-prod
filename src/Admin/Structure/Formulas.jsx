import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import {history} from "@/_helpers";

export default class AdminStructureFormulasPage extends React.Component {

    async componentDidMount() {
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'transportTypeName', filtering: true, title: 'Вид транспорта', editable: 'never'},
            {field: 'name', title: 'Наименование', filtering: true, editable: 'never'},
        ];

        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title="Формулы расчета индикаторов"
                            columns={columns}
                            tableRef={tableRef}
                            data={query =>
                                new Promise((resolve, reject) => {

                                        let url = `/indicators-page?page=${query.page}&size=${query.pageSize}`;

                                        if (query.orderBy) {
                                            url += `&sort=${query.orderBy.field},${query.orderDirection}`;
                                        }

                                        if (query.filters.length > 0) {
                                            query.filters.forEach(element => {
                                                if (element.value.length > 3)
                                                    url += `&${element.column.field}.contains=${element.value}`;
                                            });
                                        }

                                        console.log(url);

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

                                    }
                                )
                            }
                            tableLayout={'fixed'}
                            localization={ruLocalization}
                            options={{
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                actionsColumnIndex: 999,
                                filtering: true
                            }}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Редактировать',
                                    onClick: (event, rowData) => {
                                        console.log(`Посылаем в форму редактирования URL: ${history.location.pathname}/${rowData.id}`);
                                        history.push(`${history.location.pathname}/${rowData.id}`, rowData);
                                    }
                                }
                            ]}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
