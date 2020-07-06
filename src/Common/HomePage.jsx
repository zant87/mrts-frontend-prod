import React from 'react';
import {
    MDBCol,
    MDBRow,
} from 'mdbreact';
import {authenticationService} from '@/_services';
import MintransLogo from "@/_assets/logo-mintrans_.png";
import {Role} from "@/_helpers";

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            currentUserRole: authenticationService.currentUserRoleValue.role,
        };

    }
    render() {

        // console.log('User is', this.state.currentUser);
        // console.log('Role is', this.state.currentUserRole);

        return (


            <React.Fragment>
                <MDBRow center>
                    <h1>{this.state.currentUser.fullname}!</h1>
                </MDBRow>
                <MDBRow center>
                    <MDBCol size={8} className='text-center'>
                        {this.state.currentUserRole === Role.Analyst && (
                            <h3>Вы вошли в АРМ «Аналитик» функциональной задачи
                                «Мониторинг реализации Транспортной стратегии Российской Федерации»
                                АСУ ТК</h3>
                        )}
                        {this.state.currentUserRole === Role.Operator && (
                            <h3>Вы вошли в АРМ «Оператор» функциональной задачи
                                «Мониторинг реализации Транспортной стратегии Российской Федерации»
                                АСУ ТК</h3>
                        )}
                        {this.state.currentUserRole === Role.Admin && (
                            <h3>Вы вошли в АРМ «Администратор» функциональной задачи
                                «Мониторинг реализации Транспортной стратегии Российской Федерации»
                                АСУ ТК</h3>
                        )}
                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <img src={MintransLogo}/>
                </MDBRow>
            </React.Fragment>
        );
    }
}

export default HomePage;
