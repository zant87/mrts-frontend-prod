import React from 'react';
import {authenticationService} from '@/_services';
import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
} from "mdbreact";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        // если залогинен переход на домашную страницу
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }

        this.state = {
            username: '',
            password: ''
        };
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    sendForm = () => {
        authenticationService.login(this.state.username, this.state.password)
            .then(
                user => {
                    const {from} = this.props.location.state || {from: {pathname: "/"}};
                    this.props.history.push(from);
                }
            );
    };

    render() {
        return (
                <MDBCol md='4' className='mx-auto'>
                    <MDBCard>
                        <MDBCardBody>
                            <div className='form-header indigo'>
                                <h3>
                                    <MDBIcon
                                        icon='user'
                                        className='mt-2 mb-2 text-white'
                                    />{' '}
                                </h3>
                            </div>

                            <MDBAlert color="primary">
                                <strong>Администратор</strong> - U: admin P: admin
                                <br/>
                                <strong>Аналитик</strong> - U: analyst P: analyst
                                <br/>
                                <strong>Оператор</strong> - U: operator P: operator
                            </MDBAlert>

                            <MDBInput
                                type='text'
                                label='Пользователь'
                                name="username"
                                value={this.state.name}
                                onInput={this.handleInput}/>
                            <MDBInput
                                type='password'
                                name="password"
                                label='Пароль'
                                value={this.state.password}
                                onInput={this.handleInput}/>

                            <div className='text-center mt-3 black-text'>
                                <MDBBtn className='indigo' size='lg' onClick={this.sendForm}>
                                    Войти
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
        )
    }
}

export {LoginPage};
