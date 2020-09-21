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
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";


export default class OperatorReportProjectsMasterPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true,
        highlightModal: false,
        highlight: '',
        textToHighlight: [''],
        filtersList: {
            yearNumber: {
                type: "integer",
                operator: "equals",
                value: null
            },
            projectCode: {
                type: "text",
                operator: "contains",
                value: null
            },
            projectName: {
                type: "text",
                operator: "contains",
                value: null
            },
            directionName: {
                type: "text",
                operator: "contains",
                value: null
            },
            done: {
                type: "integer",
                operator: "equals",
                value: null
            },
            planBeginYear: {
                type: "integer",
                operator: "equals",
                value: null
            },
            factStarted: {
                type: "integer",
                operator: "equals",
                value: null
            },
            factFinished: {
                type: "integer",
                operator: "equals",
                value: null
            },
            realPlanCost: {
                type: "numeric",
                operator: "equals",
                value: null
            },
            fact: {
                type: "numeric",
                operator: "equals",
                value: null
            },
            description: {
                type: "text",
                operator: "contains",
                value: null
            },
        }
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

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
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
            {
                field: 'yearNumber', title: 'Отчетный год', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'projectCode', title: 'Обозначение проекта', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.projectCode}/>
                }
            },
            {
                field: 'projectName', title: 'Содержание проекта', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.projectName}/>
                }
            },
            {
                field: 'directionName', title: 'Вид транспорта', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.directionName}/>
                }
            },
            {
                field: 'done', title: 'Уровень технической готовности, %', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'planBeginYear', title: 'Сроки реализации плановые', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'factStarted', title: 'Начало фактической реализации', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'factFinished', title: 'Конец фактической реализации', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'realPlanCost', title: 'Общие затраты (плановые), млн. руб.', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'fact', title: 'Общие затраты (факт), млн. руб', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'description', title: 'Фактические результаты', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.description}/>
                }
            },
        ];

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    title={'Отчет о выполнении крупных инвестиционных проектов'}
                    filtersList={this.state.filtersList}
                    baseUrl={'views/k-7-masters'}
                    actions={actions}
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
