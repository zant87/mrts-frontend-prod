import React, { useRef } from 'react';
import { MDBContainer, MDBSpinner, MDBRow, MDBCol, toast } from "mdbreact";
import appAxios from "../../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../../_components/MaterialTableLocalization";

const TableContainer = (props) => { 

    const tableRef = useRef(null)
    return (
            <MDBContainer fluid>
                <MDBRow center>
                            <MDBCol md={'12'} className='my-5 mx-auto'>
                                <MaterialTable
                                    title={props.title}
                                    columns={props.columns}
                                    isLoading={props.isLoading}
                                    tableRef={tableRef}
                                    localization={ruLocalization}
                                    data={props.data}

                                    /* data={query =>
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
                                        })} */

                                    options={{
                                        actionsColumnIndex: 999,
                                        search: true,
                                        pageSize: 20,
                                        pageSizeOptions: [20, 50, 100],
                                        filtering: true
                                    }}
                                />
                            </MDBCol>
                          </MDBRow>
            </MDBContainer>); 
};
export default TableContainer;



/*function BasicFiltering() {
  return (
    <MaterialTable
      title="Basic Filtering Preview"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}        
      options={{
        filtering: true
      }}
    />
  )
}*/
