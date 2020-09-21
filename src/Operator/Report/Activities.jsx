import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import ActivitiyEdit from "./Activities/ActivitiyEdit";
import HighlighModal from "./HighlighModal";
import Highlighter from "react-highlight-words";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";

export default class OperatorReportActivitiesPage extends React.Component {

    state = {
        modal: false,
        row: {},
        action: '',
        initialized: true,
        highlightModal: false,
        highlight: '',
        textToHighlight: [''],
        filtersList: {
            activityReportId: {
                type: "integer",
                operator: "equals",
                value: null
            },
            activityCode: {
                type: "text",
                operator: "contains",
                value: null
            },
            executor: {
                type: "text",
                operator: "contains",
                value: null
            },
            documentType: {
                type: "text",
                operator: "contains",
                value: null
            },
            activityDescription: {
                type: "text",
                operator: "contains",
                value: null
            },
            yearNumber: {
                type: "integer",
                operator: "equals",
                value: null
            },
            quarterName: {
                type: "text",
                operator: "contains",
                value: null
            },
            beginYear: {
                type: "integer",
                operator: "equals",
                value: null
            },
            endYear: {
                type: "integer",
                operator: "equals",
                value: null
            },
            reportDescription: {
                type: "text",
                operator: "contains",
                value: null
            },
        }
    };

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
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
        } else {
            this.setState({
                modal: !this.state.modal,
            });
        }
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
            {
                field: 'activityReportId', title: '#', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'activityCode', title: 'Код мероприятия', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.activityCode}/>
                }
            },
            {
                field: 'executor', title: 'Исполнитель', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;

                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.executor}/>
                }
            },
            {
                field: 'documentType', title: 'Вид документа', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.documentType}/>
                }
            },
            {
                field: 'activityDescription', title: 'Содержание мероприятия', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
                render: (row) => {
                    return <Highlighter highlightClassName="Highlight"
                                        searchWords={this.state.textToHighlight}
                                        textToHighlight={row.activityDescription}/>
                }
            },
            {
                field: 'yearNumber', title: 'Отчетный год', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'quarterName', title: 'Отчетный квартал', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'beginYear', title: 'Плановое начало', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'endYear', title: 'Плановое окончание', filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: 'reportDescription', title: 'Описание', filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
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

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    title={'Отчеты о выполнении мероприятий по реализации Транспортной  стратегии'}
                    baseUrl={'views/k-6-s'}
                    actions={actions}
                    filtersList={this.state.filtersList}
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
