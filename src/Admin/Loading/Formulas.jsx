import React from 'react';
import {MDBContainer, MDBRow, MDBFileInput, MDBBtn, toast, MDBCol, MDBSelect, MDBSpinner} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class AdminLoadingFormulasPage extends React.Component {

    state = {
        file: null,
        indicator: "",
        indicatorsList: [],
        isLoading: false
    }

    componentDidMount() {
        this.getIndicators();
    }

    fileInputHandler = e => {
        console.log(e[0]);
        this.setState({file: e[0]});
    }

    fileUpload = async () => {

        console.log(this.state.file);
        console.log('Грузим файл!');

        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('indicatorCode', this.state.indicator)

        appAxios({
            url: `/import/formula-upload`,
            method: 'POST',
            data: formData
        }).then((response) => {
            toast.success(`Импорт формулы завершён`, {closeButton: false});
        }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка импорта`, {closeButton: false});
        });

    }

    getIndicators = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/indicators`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.code, text: item.name};
                })
                this.setState({indicatorsList: data, isLoading: false});
            })
    };

    setIndicator = event => {
        console.log(event.toString());
        this.setState({indicator: event.toString()})
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow center>
                    <MDBCol>
                        <MDBFileInput btnColor="success"
                                      reset
                                      getValue={this.fileInputHandler}
                                      textFieldTitle='Файл для загрузки...'
                                      btnTitle='Выберите файл'/>
                    </MDBCol>
                    <MDBCol>
                        <MDBSelect
                            search={true}
                            options={this.state.indicatorsList}
                            searchLabel={'Поиск по индикаторам'}
                            outline
                            label='Индикатор'
                            getValue={this.setIndicator}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol middle={true}>{this.state.isLoading && <MDBSpinner multicolor small={true}/>}</MDBCol>
                    <MDBCol><MDBBtn color="success" onClick={this.fileUpload}>Загрузка</MDBBtn></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
};
