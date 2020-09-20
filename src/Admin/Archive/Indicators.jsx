import React from "react";
import DateFilter from "../../Common/Filters/DateFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";

export default class AdminArchiveIndicatorsPage extends React.Component {

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
            indicatorName: {
                type: "text",
                operator: "contains",
                value: null
            },
            scenarioName: {
                type: "text",
                operator: "contains",
                value: null
            },
            okeiCode: {
                type: "text",
                operator: "contains",
                value: null
            },
            transportTypeName: {
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
            value: {
                type: "numeric",
                operator: "equals",
                value: null
            }
        }
    };

    tableRef = React.createRef();

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
                field: "id", title: "#",
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "year", title: "Отчетный год",
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
                field: "indicatorName", title: "Индикатор", filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "scenarioName", title: "Сценарий", filtering: true,
                filterComponent: props => {
                    return <StringFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "okeiCode", title: "ОКЕИ", filtering: true,
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
                field: "beginDate",
                title: "Дата расчета (изменения) значения",
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
                title: "Дата окончания действия значения",
                filtering: true,
                type: "date",
                filterComponent: props => {
                    return <DateFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                       filter={this.state.filtersList[props.columnDef.field]}
                                       filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
            {
                field: "value", title: "Значение индикатора",
                filterComponent: props => {
                    return <NumericFilter id={props.columnDef.field} columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged} changed={this.updateFilter}/>;
                }
            },
        ];

        return (
            <React.Fragment>
                <TableContainerWithFilters
                    columns={columns}
                    tableRef={this.tableRef}
                    title={"Архив результатов расчета индикаторов ТС"}
                    baseUrl={"views/i-2-s"}
                    filtersList={this.state.filtersList}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
