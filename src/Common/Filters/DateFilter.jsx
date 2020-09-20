import React, {useState} from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import "moment/locale/ru";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import MomentUtils from '@date-io/moment';
import TodayIcon from '@material-ui/icons/Today';
import moment from "moment";

const DateFilter = props => {

    const [date, setDate] = useState(props.filter.value);

    const onDateChange = (date) => {

        if (!moment(date).isValid())
            return;

        const filter = {
            id: props.id,
            value: moment(date).format('yyyy-MM-DD'),
            operator: props.filter.operator,
            type: props.filter.type
        };

        setDate(moment(date).format('yyyy-MM-DD'));
        props.changed(filter);
        props.filterChanged(props.columnId, moment(date).format('yyyy-MM-DD'));
        console.log(`Changing Value on column ${props.id} =`, moment(date).format('yyyy-MM-DD'));
    }

    const onDateClear = () => {
        const filter = {
            id: props.id,
            value: null,
            operator: props.filter.operator,
            type: props.filter.type
        };
        setDate(null);
        props.changed(filter);
        props.filterChanged(props.columnId, null);
        console.log(`Changing Value on column ${props.id} =`, null);
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                clearable
                value={date}
                InputProps={{
                    endAdornment: (
                        <IconButton size='small' onClick={onDateClear}>
                            <ClearIcon fontSize='small'/>
                        </IconButton>
                    )
                }}
                InputAdornmentProps={{
                    position: "start"
                }}
                onChange={(date) => onDateChange(date)}
                format="DD.MM.yyyy"
                cancelLabel="Отмена"
                invalidDateMessage="Неверный формат"
                clearLabel="Очистить"
                okLabel="Применить"
                keyboardIcon={<TodayIcon fontSize='small'/>}
            />
        </MuiPickersUtilsProvider>
    );
}
export default DateFilter;
