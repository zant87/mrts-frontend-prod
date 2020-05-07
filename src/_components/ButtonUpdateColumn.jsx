import React from "react";
import {MDBBtn, MDBIcon} from "mdbreact";
import { history } from "@/_helpers";

class ButtonUpdateColumn extends React.Component {
    render() {
        return (
            <MDBBtn tag="a" size="sm" floating gradient="blue" onClick={
                () => {
                    const row = this.props.rowData;
                    console.log(`Посылаем в форму редактирования URL: ${history.location.pathname}/${row[0]}`);
                    console.log('Данные = ', row);
                    history.push(`${history.location.pathname}/${row[0]}`, row);
                }}>
                <MDBIcon icon="pencil-alt" />
            </MDBBtn>
        )
    }
}

export default ButtonUpdateColumn;
