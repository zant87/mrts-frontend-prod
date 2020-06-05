import React from 'react';
import { MDBContainer, MDBSpinner, MDBRow, MDBCol } from "mdbreact";
import MUIDataTable from "mui-datatables";

const TableContainerMUI = (props) => { 
    return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-4 mx-auto'>
                        {props.isLoading && <MDBSpinner multicolor />}
                        <MUIDataTable title={props.title} data={props.data} columns={props.cols} options={props.opts} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>); 
};
export default TableContainer;
