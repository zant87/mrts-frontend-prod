import React from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBSelect, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class AdminLoadingFromGIBDDPage extends React.Component {

    state = {
        startYear: 2014,
        endYear: 2015,
        isLoading: false
    };

    doImport = async () => {
        const responseData = {
            startYear: this.state.startYear,
            endYear: this.state.endYear,
        };

        appAxios({
            url: `/import/gibdd`,
            method: 'POST',
            data: responseData
        }).then((response) => {
            if (response.data > 0)
                toast.success(`Выполнена синхронизация с ГИБДД с кодом ${response.data}`, {
                    closeButton: false
                })
            else
                toast.error(`Ошибка синхронизации с ГИБДД с кодом ${response.data}`, {
                    closeButton: false
                });
        }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка синхронизации с ГИБДД без кода`, {
                closeButton: false
            });
        });
    }

    render() {
        return (
            <MDBCol md='8' className='mx-auto my-5'>

                <h2 className='text-center my-2'>Синхронизация с ГИБДД </h2>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год начала" value={this.state.startYear} type="number" name="start"
                                  onChange={this.onChangeHandler}/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBInput label="Год окончания" value={this.state.endYear} type="number" name="end"
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
