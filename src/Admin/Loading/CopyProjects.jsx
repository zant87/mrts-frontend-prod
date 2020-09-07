import React from "react";
import { MDBContainer, MDBRow, MDBFileInput, MDBBtn, toast, MDBCol, MDBSelect, MDBSpinner, MDBRotatingCard } from "mdbreact";
import appAxios from "../../_services/appAxios";

export default class AdminLoadingCopyProjectsPage extends React.Component {
  state = {
    file: null,
    isLoading: false,
  };

  fileInputHandler = (e) => {
    console.log(e[0]);
    this.setState({ file: e[0] });
  };

  fileUpload = async () => {
    console.log(this.state.file);
    console.log("Грузим файл!");

    const formData = new FormData();
    formData.append("file", this.state.file);

    appAxios({
      url: `/calculation/copy-project-props`,
      method: "GET",
    })
      .then((response) => {
        toast.success(`Копирование выполнено`, { closeButton: false });
      })
      .catch(function (error) {
        console.log(error);
        toast.error(`Ошибка при копировании`, { closeButton: false });
      });
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow center>
          <h1>Обновление данных карточек инвестпроектов</h1>
        </MDBRow>
        <MDBRow between>
          <MDBCol middle={true}>{this.state.isLoading && <MDBSpinner multicolor small={true} />}</MDBCol>
          <MDBCol>
            <MDBBtn color="success" onClick={this.fileUpload}>
              Обновить
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
