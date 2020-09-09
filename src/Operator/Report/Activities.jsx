import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import ActivitiyEdit from "./Activities/ActivitiyEdit";
import HighlighModal from "./HighlighModal";
import Highlighter from "react-highlight-words";

export default class OperatorReportActivitiesPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true,
        highlightModal: false,
        highlight: '',
        textToHighlight: ['']
    };

    tableRef = React.createRef();

    toggleModal = (rowData, action) => {
        console.log(rowData);
        this.setState({
            modal: !this.state.modal,
            row: rowData,
            action: action
        });
    }

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

        const columns = [
            {field: 'activityReportId', title: '#', filtering: false},
            {
                field: 'activityCode', title: 'Код мероприятия', filtering: false,
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.activityCode}/>
                }
            },
            {
                field: 'executor', title: 'Исполнитель',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.executor}/>
                }
            },
            {
                field: 'documentType', title: 'Вид документа',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.documentType}/>
                }
            },
            {
                field: 'activityDescription', title: 'Содержание мероприятия',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.activityDescription}/>
                }
            },
            {field: 'yearNumber', title: 'Отчетный год'},
            {field: 'quarterName', title: 'Отчетный квартал'},
            {field: 'beginYear', title: 'Плановое начало'},
            {field: 'endYear', title: 'Плановое окончание'},
            {
                field: 'reportDescription', title: 'Описание',
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.reportDescription}/>
                }
            },
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
                icon: 'highlight',
                tooltip: 'Подсветка',
                onClick: (rowData) => {
                    console.log('You clicked Highlight button =', rowData);
                    this.setState({highlightModal: true})
                },
                isFreeAction: true
            }
        ];

        const filtersList = {
            'yearNumber': 'numeric',
            'beginYear': 'numeric',
            'endYear': 'numeric',
        };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Отчеты о выполнении мероприятий по реализации Транспортной  стратегии'}
                    baseUrl={'views/k-6-s'}
                    actions={actions}
                    filtersList={filtersList}
                    tableRef={this.tableRef}
                    loadAll={true}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={false} size="lg">
                        <MDBModalHeader toggle={this.toggleModal}>Форма редактирования</MDBModalHeader>
                        <MDBModalBody>
                            <ActivitiyEdit
                                data={this.state.row}
                                action={this.state.action}
                                tableRef={this.tableRef}
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
