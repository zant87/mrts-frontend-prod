import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import TableContainer from "../../_components/TableContainer";
import ProjectExtensionEdit from "./ProjectExtensionEdit";
import Axios from "axios";

export default class AdminStructureProjectsExtensionPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        projects: {},
        properties: {},
        documents: {},
        initialized: false
    }

    tableRef = React.createRef();

    getProjects = () => appAxios.get(`projects`).catch(err => null);
    getProperties = () => appAxios.get(`user-properties`).catch(err => null);
    getDocuments = () => appAxios.get(`documents`).catch(err => null);

    async componentDidMount() {
        try {
            const [rProjects, rProperties, rDocuments] = await Axios.all([this.getProjects(), this.getProperties(), this.getDocuments()]);

            this.setState(
                {
                    projects: rProjects.data,
                    properties: rProperties.data,
                    documents: rDocuments.data,
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
            {field: 'projectName', title: 'Проект', filtering: true},
            {field: 'userPropertyName', title: 'Свойство', filtering: true},
            {field: 'documentName', title: 'Документ', filtering: true},
            {field: 'documentDate', title: 'Дата документа', type: 'date', filtering: false},
            {field: 'numberValue', title: 'Числовое значение', filtering: false},
            {field: 'stringValue', title: 'Строковое значение', filtering: false},
        ]

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
                        url: `project-extendeds/${rowData.id}`,
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
                    title={'Отчет по проекту'}
                    baseUrl={'project-extendeds-page'}
                    actions={actions}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ProjectExtensionEdit
                                data={this.state.row}
                                action={this.state.action}
                                projects={this.state.projects}
                                documents={this.state.documents}
                                properties={this.state.properties}
                                tableRef={this.tableRef}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
}
