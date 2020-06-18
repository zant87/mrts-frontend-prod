import React from 'react';
import {
    MDBCol,
    MDBRow,
} from 'mdbreact';
import {authenticationService} from '@/_services';
import MintransLogo from "@/_assets/logo-mintrans_.png";

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            currentUserRole: authenticationService.currentUserRoleValue
        };
    }
    render() {
        return (
            <React.Fragment>
                <MDBRow center>
                    <h1>Добро пожаловать в МРТС!</h1>
                </MDBRow>
                <MDBRow center>
                    <h2>ИНФОРМАЦИОННО-АНАЛИТИЧЕСКАЯ СИСТЕМА РЕГУЛИРОВАНИЯ НА ТРАНСПОРТЕ</h2>
                </MDBRow>
                {/*<MDBRow center>*/}
                {/*    <p>ИНФОРМАЦИОННЫЙ ПОРТАЛ</p>*/}
                {/*</MDBRow>*/}
                <MDBRow center>
                    <img src={MintransLogo}/>
                </MDBRow>
            </React.Fragment>
        );
    }
}

export default HomePage;
