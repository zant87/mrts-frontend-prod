import React from 'react';
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBScrollbar,
    MDBRow,
    toast
} from "mdbreact";
import appAxios from "../../_services/appAxios";
import "../../scrollbar.css";
import TableContainer from "../../Containers/TableContainer";
import FormulaEdit from "./FormulaEdit";

export default class AdminStructureFormulasPage extends React.Component {

    state = {
        modal: false,
        row: {}
    }

    tableRef = React.createRef();

    toggleModal = (rowData, action) => {
        console.log(rowData);
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'transportTypeName', filtering: true, title: 'Вид транспорта', editable: 'never'},
            {field: 'name', title: 'Наименование', filtering: true, editable: 'never'},
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    this.toggleModal(rowData);
                }
            }
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Формулы расчета индикаторов'}
                    baseUrl={'indicators-page'}
                    loadAll={true}
                    tableRef={this.tableRef}
                    actions={actions}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <FormulaEdit data={this.state.row} tableRef={this.tableRef}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
}
