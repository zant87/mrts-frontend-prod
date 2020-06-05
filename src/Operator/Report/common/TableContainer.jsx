import React, { useRef } from 'react';
import { MDBContainer, MDBSpinner, MDBRow, MDBCol, toast } from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
// import {labels} from "../../_components/TableTextLabels";
// import CustomToolbarSelect from "../../_components/CustomToolbarSelect";
// import ButtonUpdateColumn from "../../_components/ButtonUpdateColumn";

const TableContainer = (props) => { 

    const tableRef = useRef(null)
    return (
            <MDBContainer fluid>
                <MDBRow center>
                            <MDBCol md={'12'} className='my-5 mx-auto'>
                                <MaterialTable
                                    title={props.title}
                                    columns={props.columns}
                                    tableRef={tableRef}
                                    data={query =>
                                        new Promise((resolve, reject) => {
                                                appAxios.get(`/views/` + props.getApi + `?page=${query.page}&size=${query.pageSize}&sort=id,desc`)
                                                .then(res => {
                                                    const count = Number(res.headers['x-total-count']);
                                                    const data = res.data;

                                                    resolve({
                                                        data: data,
                                                        page: query.page,
                                                        totalCount: count
                                                    });
                                                });
                                        })}

                                    editable={{
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataUpdate = [...data];
                                                    const index = oldData.tableData.id;
                                                    dataUpdate[index] = newData;

                                                    console.log(newData);

                                                    appAxios({
                                                        url: `/views/` + props.updateApi + `/update?pID=${newData.id}&pDoc=${newData.documentId}&pPlan=${newData.plan}&pFact=${newData.fact}`,
                                                        method: 'GET'
                                                    }).then((response) => {
                                                        const message = response.headers["x-mrts-backend-params"];
                                                        toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
                                                            closeButton: false
                                                        });
                                                    });

                                                    resolve();
                                                }, 1000)
                                            }),
                                    }}
                                    options={{
                                        actionsColumnIndex: 999,
                                        search: false,
                                        pageSize: 20,
                                        pageSizeOptions: [20, 50, 100],
                                    }}
                                />
                            </MDBCol>
                          </MDBRow>
            </MDBContainer>); 
};
export default TableContainer;
