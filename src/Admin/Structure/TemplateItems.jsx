import React from 'react';
import {MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import TableContainer from "../../_components/TableContainer";
import TemplateEdit from "./TemplateEdit";
import TemplateItemEdit from "./TemplateItemEdit";

export default class AdminStructureTemplateItemsPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        properties: {},
        templates: {},
        initialized: false
    };

    getProperties = () => appAxios.get(`user-properties`).catch(err => null);
    getTemplates = () => appAxios.get(`project-templates`).catch(err => null);

    async componentDidMount() {
        try {
            const [rProperties, rTemplates] = await Axios.all([this.getProperties(), this.getTemplates()]);

            this.setState(
                {
                    initialized: true,
                    properties: rProperties.data,
                    templates: rTemplates.data,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
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
            {field: 'projectTemplateName', title: 'Шаблон проекта'},
            {field: 'userPropertyName', title: 'Показатель'},
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
                        url: `project-template-items/${rowData.id}`,
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
                    title={'Элементы карточки проектов'}
                    baseUrl={'project-template-items-page'}
                    loadAll={true}
                    tableRef={this.tableRef}
                    actions={actions}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <TemplateItemEdit
                                data={this.state.row}
                                action={this.state.action}
                                projectTemplates={this.state.templates}
                                userProperties={this.state.properties}
                                tableRef={this.tableRef}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        )
    }
}
