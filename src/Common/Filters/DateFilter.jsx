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


const DateFilter = props => {

    const [date, setDate] = useState(props.filter.value);

    const onDateChange = (date) => {
        const filter = {
            id: props.id,
            value: date,
            operator: props.filter.operator,
            type: props.filter.type
        };
        setDate(date());
        props.changed(filter);
        props.filterChanged(props.columnId, date);
        console.log(`Changing Value on column ${props.id} =`, date);
    }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                clearable
                value={date}
                InputProps={{
                    endAdornment: (
                        <IconButton size='small' onClick={() => setDate(null)}>
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
