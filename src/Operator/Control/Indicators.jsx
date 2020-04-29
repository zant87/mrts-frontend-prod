import React from 'react';
import MUIDataTable from "mui-datatables";
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdbreact";
import { labels } from "../../_components/TableTextLabels";

export default class OperatorControlIndicatorsPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        rowsPerPage: 20,
        isLoading: false,
    };

    render() {

        const options = {
            textLabels: labels,
            sortFilterList: false,
            selectableRowsOnClick: true,
            selectableRows: 'none',
        };

        const { data, page, count, isLoading } = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-5 mx-auto'>
                        {isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable
                            title={"Контроль поступления и согласования данных по показателям для расчета индикаторов ТС"}
                            // data={data}
                            // columns={columns}
                            options={options}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
};
