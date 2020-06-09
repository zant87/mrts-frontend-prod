import React from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

export default class AdminParametersPage extends React.Component {

    render() {

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <h1>Показатели для расчета индикаторов ТС</h1>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
