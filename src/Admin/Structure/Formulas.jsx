import React from 'react';
import TableContainer from "../../_components/TableContainer";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import FormualsEdit from "./FormualsEdit";

export default class AdminStructureFormulasPage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        modal: false,
        row: {}
    }

    toggleModal = (rowData) => {
        this.setState({
            modal: !this.state.modal,
            row: rowData
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
                    actions={actions}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <FormualsEdit data={this.state.row}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
}
