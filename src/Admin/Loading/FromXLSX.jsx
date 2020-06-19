import React from 'react';
import {MDBContainer, MDBRow, MDBFileInput} from "mdbreact";
import MDBFileupload from 'mdb-react-fileupload';

export default class AdminLoadingFromXLSXPage extends React.Component {

    state = {
        selectedFile: null,
    }

    onSubmitHandler = e => {

        console.log(e);

        e.preventDefault();

        let data = new FormData();
        data.append('file', this.state.selectedFile);

        console.log('submit', data)

        // this.fileupload.resetPreview();
    }

    fileInputHandler = e => {
        console.log(e);
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow center>
                    <form>
                        <MDBFileupload
                            getValue={this.fileInputHandler}
                            maxFileSize="5M"
                            showRemove
                            showErrors
                            showSubmitButton
                            messageDefault='Перетащите файл для загрузки или нажмите сюда'
                            minWidth='300'
                            messageError='Ошибка при загрузке файла'
                            messageRemove='Удалить'
                            messageReplace='Заменить загруженный файл'
                            messageSubmit='Отправить'
                            onSubmitHandler={this.onSubmitHandler}
                            ref={fileupload => this.fileupload = fileupload}
                        />
                    </form>
                </MDBRow>
                <MDBRow center>
                    <MDBFileInput btnColor="default" getValue={this.fileInputHandler}/>
                </MDBRow>
            </MDBContainer>
        );
    }
};
