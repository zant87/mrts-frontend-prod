import React from "react";
import {MDBDatePicker} from "mdbreact";
import moment from "mdbreact/node_modules/moment";
import "moment/locale/ru";

const DateFilter = props => {
    return (
        <MDBDatePicker
            id={props.id}
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
}
export default DateFilter;
