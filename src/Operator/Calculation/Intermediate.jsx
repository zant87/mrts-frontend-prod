//OperatorCalculationValuesPage
import React from "react";
import { MDBBtn, MDBCol, MDBDatePicker, MDBInput, MDBRow, MDBSelect, toast } from "mdbreact";
import moment from "moment";
import appAxios from "../../_services/appAxios";
import Preloader from "@/Common/Preloader/Preloader";

export default class OperatorCalculationIntermediatePage extends React.Component {
  state = {
    isLoading: false,
  };
  doCalculate = () => {
    console.log(this.state);

    this.setState({ isLoading: true });
    const url = `/calculation/interpolate`;

    console.log(url);

    appAxios
      .get(url)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        this.setState({ result: data, isLoading: false });
        toast.success(`Успешно выполнена интерполяция`, {
          closeButton: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error(`Ошибка при выполнении интерполяции`, {
          closeButton: false,
        });
      });
  };

  render() {
    return (
      <MDBCol md="8" className="mx-auto my-3">
        <h2 className="text-center my-3">Расчет промежуточных значений индикаторов</h2>

        <MDBRow between={true}>
          {this.state.isLoading ? <Preloader /> : ""}
          <MDBBtn color="primary" type="none" onClick={this.doCalculate}>
            Раcсчитать
          </MDBBtn>
        </MDBRow>
      </MDBCol>
    );
  }
}
