import React from 'react';
import {
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    toast
} from "mdbreact";
import TableContainer from "../../Containers/TableContainer";
import ProjectsMasterEdit from "./ProjectsMaster/ProjectsMasterEdit";
import HighlighModal from "./HighlighModal";
import Highlighter from "react-highlight-words";


export default class OperatorReportProjectsMasterPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true,
        highlightModal: false,
        highlight: '',
        textToHighlight: ['']
    }

    toggleModal = (rowData, action) => {
        if (rowData && action) {
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
        } else {
            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    tableRef = React.createRef();


    toggleHighlight = () => {
        this.setState({
            highlightModal: !this.state.highlightModal,
        });
    }

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    doHighlight = () => {
        console.log('[Activities.jsx] doHighlight');
        const textToHighlight = this.state.textToHighlight;
        textToHighlight[0] = this.state.highlight;
        this.setState({
            textToHighlight: textToHighlight,
            highlightModal: false
        })
    }

    render() {

        const actions = [
            {
                icon: 'edit',
                tooltip: 'Редактировать',
                onClick: (event, rowData) => {
                    console.log(rowData);
                    if (this.state.initialized) this.toggleModal(rowData, 'edit');
                }
            },
            {
                icon: 'highlight',
                tooltip: 'Подсветка',
                onClick: (rowData) => {
                    console.log('You clicked Highlight button =', rowData);
                    this.setState({highlightModal: true})
                },
                isFreeAction: true
            }
        ];

        const columns = [
            {field: 'yearNumber', title: 'Отчетный год'},
            {
                field: 'projectCode', title: 'Обозначение проекта',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.projectCode}/>
                }
            },
            {
                field: 'projectName', title: 'Содержание проекта',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.projectName}/>
                }
            },
            {
                field: 'directionName', title: 'Вид транспорта',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.directionName}/>
                }
            },
            {field: 'done', title: 'Уровень технической готовности, %'},
            {field: 'planBeginYear', title: 'Сроки реализации плановые'},
            {field: 'factStarted', title: 'Начало фактической реализации'},
            {field: 'factFinished', title: 'Конец фактической реализации'},
            {field: 'realPlanCost', title: 'Общие затраты (плановые), млн. руб.'},
            {field: 'fact', title: 'Общие затраты (факт), млн. руб'},
            {
                field: 'description', title: 'Фактические результаты',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.description}/>
                }
            },
        ];

        const filtersList = {
            'yearNumber': 'equals',
            'done': 'numeric',
            'planBeginYear': 'numeric',
            'factStarted': 'numeric',
            'factFinished': 'numeric',
            'realPlanCost': 'numeric',
            'fact': 'numeric',
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Отчет о выполнении крупных инвестиционных проектов'}
                    filtersList={filtersList}
                    baseUrl={'views/k-7-masters'}
                    actions={actions}
                    filterMinimalLength={2}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="fluid">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ProjectsMasterEdit
                                data={this.state.row}
                                action={this.state.action}
                                tableRef={this.tableRef}
                                editable={true}
                                toggleModal={this.toggleModal}
                            />
                        </MDBModalBody>
                    </MDBModal>
                    <MDBModal isOpen={this.state.highlightModal} toggle={this.toggleHighlight} backdrop={true}>
                        <MDBModalHeader toggle={this.toggleHighlight}>Подсветка</MDBModalHeader>
                        
                        <MDBModalBody>
                            <HighlighModal
                                highlight={this.state.highlight}
                                doHighligh={this.doHighlight}
                                onChange={this.onChangeHandler}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        );
    }
}
