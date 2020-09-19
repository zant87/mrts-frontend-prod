import React from "react";
import moment from "mdbreact/node_modules/moment";
import "moment/locale/ru";
import {MDBDatePicker} from "mdbreact";
import DateFilter from "../../Common/Filters/DateFilter";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";

export default class AdminArchiveIndicatorsPage extends React.Component {

    state = {
        filtersList: {
            id: {
                type: "numeric",
                operator: "=",
                value: null
            },
            year: {
                type: "numeric",
                operator: "=",
                value: null
            },
            quarterName: {
                type: "text",
                operator: "~",
                value: null
            },
            value: {
                type: "numeric",
                operator: "=",
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
        console.log('Table Ref = ', this.tableRef);
    }

    render() {
        const columns = [
            {
                field: "id", title: "#",
                filterComponent: props => {
                    console.log(`Column ${props.columnDef.field} props =`, props);
                    return <NumericFilter id={props.columnDef.field}
                                          columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged}
                                          changed={this.updateFilter}
                    />;
                }
            },
            {
                field: "year", title: "Отчетный год",
                filterComponent: props => {
                    console.log(`Column ${props.columnDef.field} props =`, props);
                    return <NumericFilter id={props.columnDef.field}
                                          columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged}
                                          changed={this.updateFilter}
                    />;
                }
            },
            {
                field: "quarterName", title: "Отчетный квартал", filtering: true,
                filterComponent: props => {
                    console.log(`Column ${props.columnDef.field} props =`, props);
                    return <StringFilter id={props.columnDef.field}
                                         columnId={props.columnDef.tableData.id}
                                         filter={this.state.filtersList[props.columnDef.field]}
                                         filterChanged={props.onFilterChanged}
                                         changed={this.updateFilter}
                    />;
                }
            },
            {field: "indicatorName", title: "Индикатор", filtering: true},
            {field: "scenarioName", title: "Сценарий", filtering: true},
            {field: "okeiCode", title: "ОКЕИ", filtering: true, editable: "never"},
            {field: "transportTypeName", title: "Вид транспорта", filtering: true},
            {
                field: "beginDate",
                title: "Дата расчета (изменения) значения",
                filtering: true,
                type: "date",
                filterComponent: props => <DateFilter/>
            },
            {
                field: "endDate",
                title: "Дата окончания действия значения",
                filtering: true,
                type: "date",
                filterComponent: (props) => {
                    return (
                        <MDBDatePicker
                            clearable={true}
                            invalidDateMessage="Неверный формат"
                            clearLabel="Очистить"
                            emptyLabel=""
                            keyboard={true}
                            okLabel="Применить"
                            locale={moment.locale("ru")}
                            valueDefault={null}
                            getValue={(event) => {
                                props.onFilterChanged(props.columnDef.tableData.id, event);
                            }}
                            format="DD.MM.YYYY"
                            cancelLabel="Отмена"
                        />
                    );
                },
            },
            {
                field: "value", title: "Значение индикатора",
                filterComponent: props => {
                    console.log(`Column ${props.columnDef.field} props =`, props);
                    return <NumericFilter id={props.columnDef.field}
                                          columnId={props.columnDef.tableData.id}
                                          filter={this.state.filtersList[props.columnDef.field]}
                                          filterChanged={props.onFilterChanged}
                                          changed={this.updateFilter}
                    />;
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
