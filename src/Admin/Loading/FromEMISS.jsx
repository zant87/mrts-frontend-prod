import React from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class AdminLoadingFromEMISSPage extends React.Component {

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

        appAxios({
            url: `/import/emiss`,
            method: 'POST',
            data: responseData
        }).then((response) => {
            if (response.data >= 0)
                toast.success(`Выполнена синхронизация с ЕМИСС с кодом ${response.data}`, {
                    closeButton: false
                })
            else
                toast.error(`Ошибка синхронизации с ЕМИСС с кодом ${response.data}`, {
                    closeButton: false
                });
        }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка синхронизации с ЕМИСС без кода`, {
                closeButton: false
            });
        });
    }

    onChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    render() {
        return (
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Синхронизация с ЕМИСС</h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год начала" value={this.state.start} type="number" name="start"
                                  onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год окончания" value={this.state.end} type="number" name="end"
                                  onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow center={true}>
                    <MDBBtn color="success" type="none" onClick={this.doImport}>
                        Синхронизация
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        );
    }
};
