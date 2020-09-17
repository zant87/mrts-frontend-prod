import React from 'react';
import TableContainer from "../../Containers/TableContainer";
import {MDBDatePicker} from "mdbreact";
import moment from "mdbreact/node_modules/moment";
import "moment/locale/ru";

export default class OperatorControlDeviationsPage extends React.Component {

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false},
            {field: 'parameterCode', title: 'Код показателя'},
            {field: 'parameterName', title: 'Наименование показателя'},
            {field: 'okeiName', title: 'Единица измерений'},
            {field: 'frequencyName', title: 'Частота обновления'},
            {
                field: 'parameterDate', title: 'Отчетная дата', type: 'date',
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
                }
            },
            {field: 'year', title: 'Отчетный год'},
            {field: 'value', title: 'Значение', type: 'number', filtering: false},
            {field: 'previousValue', title: 'Значение в предшествующем году', type: 'number', filtering: false},
            {field: 'yty', title: 'Изменение г/г, %', type: 'number', filtering: false},
            {field: 'coefficient', title: 'Коэффициент вариации ряда', type: 'number', filtering: false},
        ];

        const filtersList = {
            'year': 'equals',
            'parameterDate': 'date'
        };

        const filterMinimalLength = 1;

        return (
            <React.Fragment>
                <TableContainer
                    columns={columns}
                    title={'Анализ отклонений'}
                    baseUrl={'views/control-parameter-y-2-ies'}
                    filtersList={filtersList}
                    filterMinimalLength={filterMinimalLength}
                    loadAll={true}
                />
            </React.Fragment>
        )
    }
};
