import React from 'react';
import {MDBCol, MDBContainer, MDBIframe, MDBRow, MDBScrollbar} from 'mdbreact';

class SwaggerPage extends React.Component {

    render() {
        return (
        <MDBContainer fluid>
            <MDBRow center>
                <MDBCol md={'12'} className='my-3 mx-auto'>
                    <MDBIframe
                        src="http://10.10.10.187:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config"/>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        )
    }
}

export default SwaggerPage;
