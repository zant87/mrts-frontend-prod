import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import TableContainer from "../../Containers/TableContainer";
import TemplateEdit from "./TemplateEdit";

export default class AdminStructureTemplatesPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        projects: {},
        initialized: false
    }

    getProjects = () => appAxios.get(`projects`).catch(err => null);

    async componentDidMount() {
        try {

            const [rProjects] = await Axios.all([this.getProjects()]);

            this.setState(
                {
                    projects: rProjects.data,
                    initialized: true,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }

    tableRef = React.createRef();

    toggleModal = (rowData, action) => {
        console.log(rowData);
        if (rowData && action) {
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
        }
        else {
            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'projectName', title: 'Проект', filtering: true},
            {field: 'code', title: 'Код', filtering: true},
            {field: 'name', title: 'Наименование', filtering: true},
            {field: 'description', title: 'Описание', filtering: true},
            {field: 'beginDate', title: 'Начало', type: 'date', filtering: false},
            {field: 'endDate', title: 'Конец', type: 'date', filtering: false},
        ];

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            },

            {
                icon: 'delete',
                tooltip: 'Удалить',
                onClick: (event, rowData) => {
                    appAxios({
                        url: `project-templates/${rowData.id}`,
                        method: 'DELETE',
                    }).then((response) => {
                        const message = response.headers["x-mrts-backend-params"];
                        toast.success(`Удалена запись с ID ${message}`, {
                            closeButton: false
                        });
                        this.tableRef.current.onQueryChange();
                    });
                }
            },
            {
                icon: 'add',
                tooltip: 'Добавить',
                isFreeAction: true,
                onClick: (event, rowData) => {
                    if (this.state.initialized) this.toggleModal(rowData, 'add');
                }
            }
        ];

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Шаблоны карточки проектов'}
                    baseUrl={'project-templates-page'}
                    loadAll={true}
                    tableRef={this.tableRef}
                    actions={actions}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <TemplateEdit
                                data={this.state.row}
                                action={this.state.action}
                                projects={this.state.projects}
                                tableRef={this.tableRef}
                                toggleModal={this.toggleModal}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
}
