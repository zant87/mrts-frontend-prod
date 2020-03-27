import React from 'react';
import {
    MDBEdgeHeader,
    MDBFreeBird,
    MDBCol,
    MDBRow,
    MDBCardBody, MDBContainer
} from 'mdbreact';
import {authenticationService} from '@/_services';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
    }

    render() {
        const { currentUser } = this.state;
        return (
            <MDBCol md='8' className='mx-auto'>
                <MDBCardBody className='text-center'>
                    <MDBCardBody className='text-center'>
                        <h1 className='text-center'>Добро пожаловать в МРТС!</h1>
                        <MDBRow />
                        <p>Ваша роль: <strong>{currentUser.role}</strong></p>
                        <p>Ваша зовут: <strong>{currentUser.firstName} {currentUser.lastName}</strong></p>
                        <p className='pb-4 mt-4'>
                            Nam imperdiet porta pretium. Sed porta augue id sapien egestas ultricies. Pellentesque ac aliquam lorem, eget mattis nibh. Curabitur at augue nulla. Donec tristique nisl a egestas fringilla. Aliquam vestibulum sem eu rhoncus efficitur. Ut est metus, eleifend nec purus eget, commodo dictum magna. Nunc venenatis nulla ac libero interdum, id laoreet erat viverra.
                        </p>
                    </MDBCardBody>
                    <MDBRow />
                </MDBCardBody>
            </MDBCol>
        );
    }
}

export default HomePage;
