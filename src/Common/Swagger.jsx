import React from 'react';
import {MDBContainer, MDBIframe} from 'mdbreact';

class SwaggerPage extends React.Component {

    render() {
        return (
            <MDBContainer fluid>
                <MDBIframe src="http://localhost:8080/swagger-ui/index.html"/>
            </MDBContainer>
        );
    }
}

export default SwaggerPage;
