import React from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import 'moment/locale/ru';

export default class AdminLoadingFromMDDPage extends React.Component {

    state = {
        start: 2014,
        end: 2015,
        isLoading: false
    };

    doImport = async () => {

        const responseData = {
            startYear: this.state.start,
            endYear: this.state.end,
        };

        console.log('Посылаем на сервер =', responseData);

        appAxios({
            url: `/import/monitoring`,
            method: 'POST',
            data: responseData
        }).then((response) => {
            console.log('%cУспешно', 'color: green');
            if (response.data > 0)
                toast.success(`Выполнена синхронизация с ФЗ МДД с кодом ${response.data}`, {
                    closeButton: false
                })
            else
                toast.error(`Ошибка синхронизации с ФЗ МДД с кодом ${response.data}`, {
                    closeButton: false
                });
        }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка синхронизации с ФЗ МДД без кода`, {
                closeButton: false
            });
        });

    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    render() {
        return(
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Синхронизация с ФЗ "Мониторинг Дорожных Фондов" </h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год начала" value={this.state.start} type="number" name="start" outline
                                  onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год окончания" value={this.state.end} type="number" name="end" outline
                                  onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow center={true}>
                    <MDBBtn color="success" type="none" onClick={this.doImport}>
                        Синхронизация
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        )
    }

}
