import React from "react";
import "moment/locale/ru";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import DateFilter from "../../Common/Filters/DateFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";

export default class AdminArchiveParametersPage extends React.Component {

    state = {
        filtersList: {
            id: {
                type: "integer",
                operator: "equals",
                value: null
            },
            year: {
                type: "integer",
                operator: "equals",
                value: null
            },
            quarterName: {
                type: "text",
                operator: "contains",
                value: null
            },
            okudName: {
                type: "text",
                operator: "contains",
                value: null
            },
            parameterName: {
                type: "text",
                operator: "contains",
                value: null
            },
            transportTypeName: {
                type: "text",
                operator: "contains",
                value: null
            },
            dataProviderCode: {
                type: "text",
                operator: "contains",
                value: null
            },
            beginDate: {
                type: "date",
                operator: "equals",
                value: null
            },
            endDate: {
                type: "date",
                operator: "equals",
                value: null
            },
            okeiName: {
                type: "text",
                operator: "contains",
                value: null
            },
            value: {
                type: "numeric",
                operator: "equals",
                value: null
            }
        }
    };

    updateFilter = (e) => {
        console.log('Update Filter received =', e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log('New Filter =', newFilter);
        this.setState({filtersList: newFilter});
    }

    render() {
        const columns = [
            {
                field: "id", title: "#", filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "year", title: "Отчетный год", filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "quarterName", title: "Отчетный квартал", filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "okudName", title: "ОКУД", filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "parameterName", title: "Показатель", filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "transportTypeName", title: "Вид транспорта", filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "dataProviderCode", title: "Источник", filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "value", title: "Значение показателя", filtering: true,
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                },
            },
            {
                field: "beginDate",
                title: "Дата изменения записи",
                filtering: true,
                type: "date",
                filterComponent: props => {
                    return <DateFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                       filter={this.state.filtersList[props.columnDef.field]}
                                       filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "endDate",
                title: "Дата окончания действия записи",
                filtering: true,
                type: "date",
                filterComponent: props => {
                    return <DateFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                       filter={this.state.filtersList[props.columnDef.field]}
                                       filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "okeiName", title: "Единица измерений",
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
        ];

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    title={"Архив показателей для расчета индикаторов ТС"}
                    baseUrl={"views/i-1-s"}
                    filtersList={this.state.filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
