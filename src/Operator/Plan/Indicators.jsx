import React from 'react';
import appAxios from "../../_services/appAxios";
import TableContainer from "../../_components/TableContainer";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import Axios from "axios";
import IndicatorsEdit from "./IndicatorsEdit";

export default class OperatorPlanIndicatorsPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        okeis: {},
        initialized: false
    }

    getOkeis = () => appAxios.get(`nsi-okeis`).catch(err => null);
    tableRef = React.createRef();

    async componentDidMount() {
        try {
            const [rOkeis] = await Axios.all([this.getOkeis()]);

            this.setState(
                {
                    okeis: rOkeis.data,
                    initialized: true
                }
            );

        } catch (err) {
            console.log(err.message);
        }
    }

    toggleModal = (rowData, action) => {
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'transportStrategyCode', title: 'Редакция ТС'},
            {field: 'scenarioName', title: 'Вариант реализации стратегии'},
            {field: 'goalName', title: 'Цель'},
            {field: 'indicatorName', title: 'Индикатор'},
            {field: 'transportTypeName', title: 'Вид транспорта'},
            {field: 'indicatorDate', title: 'Этап реализации стратегии', type: 'date', filtering: false},
            {field: 'okeiName', title: 'Единица измерения'},
            {field: 'value', title: 'Значение индикатора', filtering: false},
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            }
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Индикаторы ТС по целям и задачам (план)'}
                    baseUrl={'views/k-1-s'}
                    actions={actions}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <IndicatorsEdit
                                data={this.state.row}
                                okeis={this.state.okeis}
                                action={this.state.action}
                                tableRef={this.tableRef}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
};
