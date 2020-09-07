import React from 'react';
import {MDBContainer, MDBRow, MDBFileInput, MDBBtn, toast, MDBCol, MDBSpinner} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {authenticationService} from "../../_services";

export default class AdminLoadingResourcesFromXLSXPage extends React.Component {

    state = {
        file: null,
        isLoading: false,
        user: null
    }

    getUser = (id) => appAxios.get(`users?username.equals=${id}`)
        .then(response => {
            console.log('User = ', response.data[0]);
            this.setState({user: response.data[0]});
        })
        .catch(err => null);

    componentDidMount() {
        this.getUser(authenticationService.currentUserValue.id);
    }

    fileInputHandler = e => {
        console.log(e[0]);
        this.setState({file: e[0]});
    }

    fileUpload = async () => {

        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('username', this.state.user.username);

        console.log('Посылаем на сервер =', formData);

        appAxios({
            url: `/budget-batches-upload`,
            method: 'POST',
            data: formData
        }).then((response) => {
            console.log('%cУспешно', 'color: green');
            toast.success(`Синхронизация с ID ${response.data} запущена`, {closeButton: false});
        }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка загрузки XLSX файла`, {closeButton: false});
        });

    }

    render() {

        console.log(this.state);

        return (
            <MDBContainer>
                <MDBRow center>
                    <h2>Загрузка ресурсного обеспечения</h2>
                </MDBRow>
                <MDBRow center>
                    <MDBCol>
                        <MDBFileInput btnColor="success"
                                      reset
                                      getValue={this.fileInputHandler}
                                      textFieldTitle='Файл для загрузки...'
                                      btnTitle='Выберите файл'/>
                    </MDBCol>
                </MDBRow>
                <MDBBtn color="success" onClick={this.fileUpload}>Загрузка</MDBBtn>
                {/*<MDBRow center>*/}
                {/*    <MDBCol middle={true}>{this.state.isLoading && <MDBSpinner multicolor small={true}/>}</MDBCol>*/}
                {/*    <MDBCol></MDBCol>*/}
                {/*</MDBRow>*/}
            </MDBContainer>
        );
    }
};
