import React from 'react';
import {MDBContainer, MDBRow, MDBFileInput, MDBBtn, toast, MDBCol, MDBSelect} from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class AdminLoadingFromXLSXPage extends React.Component {

    state = {
        file: null,
        frequency: 0,
        frequencyList: [],
        isLoading: false
    }

    componentDidMount() {
        this.getFrequency();
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
        formData.append('frequency', this.state.frequency)

        appAxios({
            url: `/batch-data-upload`,
            method: 'POST',
            data: formData
        }).then((response) => {
            toast.success(`${response.data}`, {closeButton: false});
        }).catch(function (error) {
            console.log(error);
            toast.error(`Ошибка загрузки XLSX файла`, {closeButton: false});
        });

    }

    getFrequency = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/frequencies`)
            .then(res => {
                const data = res.data.map(item => {
                    return {value: item.id, text: item.name};
                })
                this.setState({frequencyList: data, isLoading: false});
            })
    };

    setFrequency = event => {
        console.log(event.toString());
        this.setState({frequency: event.toString()})
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
                            options={this.state.frequencyList}
                            searchLabel={'Поиск'}
                            outline
                            label='Частота'
                            getValue={this.setFrequency}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBBtn color="success" onClick={this.fileUpload}>Загрузка</MDBBtn>
                </MDBRow>
            </MDBContainer>
        );
    }
};
