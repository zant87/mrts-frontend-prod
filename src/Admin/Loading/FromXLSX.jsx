import React from 'react';
import {MDBContainer, MDBRow, MDBFileInput, MDBBtn, toast, MDBCol, MDBSelect, MDBSpinner} from "mdbreact";
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

        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('frequency', this.state.frequency);
        console.log('Посылаем на сервер =', formData);

        appAxios({
            url: `/batch-data-upload`,
            method: 'POST',
            data: formData
        }).then((response) => {
            console.log('%cУспешно', 'color: green');
            toast.success(`Синхронизация с ID ${response.data} запущена`, {closeButton: false});
        }).catch(function (error) {
            console.error(error);
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
                    <MDBCol middle={true}>{this.state.isLoading && <MDBSpinner multicolor small={true}/>}</MDBCol>
                    <MDBCol><MDBBtn color="success" onClick={this.fileUpload}>Загрузка</MDBBtn></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
};
