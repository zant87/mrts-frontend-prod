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

    /*
            @RequestParam("start") Integer start,
            @RequestParam("end") Integer end)
    */

    doSync =() => {
        this.setState({ isLoading: true });
        appAxios.get(`/calculation/sync?start=${this.state.start}&end=${this.state.end}`)
            .then(res => {
                const data = res.data;
                this.setState({result: data, isLoading: false});
                toast.success(`Успешная синхронизация с кодом ${data}`, {
                    closeButton: false
                });
            }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка при синхронизации`, {
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
                        <MDBInput label="Год начала" value={this.state.start} type="number" name="start" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год окончания" value={this.state.end} type="number" name="end" onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBBtn color="primary" type="none" onClick={this.doSync}>
                        Обновить
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        )
    }

}
