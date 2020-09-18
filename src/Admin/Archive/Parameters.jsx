import React from "react";
import TableContainer from "../../Containers/TableContainer";
import moment from "mdbreact/node_modules/moment";
import "moment/locale/ru";
import {
    MDBBtnGroup,
    MDBContainer,
    MDBDatePicker,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBInput
} from "mdbreact";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import NumericFilter from "../../Common/Filters/NumericFilter";

export default class AdminArchiveParametersPage extends React.Component {

    clickIcon = () => {
        console.log('Icon clicked');
    };

    render() {
        const columns = [
            {field: "id", title: "#", filtering: false},
            {field: "year", title: "Отчетный год"},
            {field: "quarterName", title: "Отчетный квартал", filtering: true},
            {field: "okudName", title: "ОКУД", filtering: true},
            {field: "parameterName", title: "Показатель", filtering: true},
            {field: "transportTypeName", title: "Вид транспорта", filtering: true},
            {field: "dataProviderCode", title: "Источник", filtering: true},
            {
                field: "value", title: "Значение показателя", filtering: true, filterComponent: props => {
                    console.log(props);
                    return <NumericFilter id={props.columnDef.field}/>;
                }
            },
            {
                field: "beginDate",
                title: "Дата изменения записи",
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
                            getValue={(date) => {
                                props.onFilterChanged(props.columnDef.tableData.id, date);
                            }}
                            format="DD.MM.YYYY"
                            cancelLabel="Отмена"
                        />
                    );
                },
            },
            {
                field: "endDate",
                title: "Дата окончания действия записи",
                filtering: true,
                type: "date",
                filterComponent: (props) => {
                    return (
                        <MDBDatePicker
                            clearable={true}
                            clearLabel="Очистить"
                            emptyLabel=""
                            invalidDateMessage="Неверный формат"
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
            {field: "okeiName", title: "Единица измерений"},
        ];

        const filtersList = {
            year: "equals",
            beginDate: "date",
            endDate: "date",
        };

        const options = this.props.options
            ? this.props.options
            : {
                pageSize: 20,
                pageSizeOptions: [20, 50, 100],
                actionsColumnIndex: 999,
                filtering: true,
                search: false,
                columnsButton: true,
            };

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={"Архив показателей для расчета индикаторов ТС"}
                    baseUrl={"views/i-1-s"}
                    options={options}
                    filtersList={filtersList}
                    filterMinimalLength={0}
                    loadAll={true}
                />
            </React.Fragment>
        );
    }
}
