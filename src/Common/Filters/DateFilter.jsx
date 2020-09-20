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
import {
    MDBBtn,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBRow,
} from "mdbreact";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const DateFilter = props => {

    const [operator, setOperator] = useState(props.filter.operator);
    const [value, setValue] = useState(props.filter.value);
    const [modal, setModal] = useState(false);
    const [displayValue, setDisplayValue] = useState(props.filter.value ? moment(props.filter.value).format('DD.MM.yyyy') : null);

    const toggleFilterModal = () => {
        setModal(!modal);
    }

    const onChangeValue = (value) => {
        if (!moment(value).isValid())
            return;

        const filter = {
            id: props.id,
            value: moment(value).format('yyyy-MM-DD'),
            operator: props.filter.operator,
            type: props.filter.type
        };

        setValue(moment(value).format('yyyy-MM-DD'));
        props.changed(filter);
        props.filterChanged(props.columnId, moment(value).format('yyyy-MM-DD'));
        console.log(`Changing Value on column ${props.id} =`, moment(value).format('yyyy-MM-DD'));
    }

    const onClearIconClicked = () => {
        const filter = {
            id: props.id,
            value: null,
            operator: props.filter.operator,
            type: props.filter.type
        };
        setValue(null);
        props.changed(filter);
        props.filterChanged(props.columnId, null);
        console.log(`Changing Value on column ${props.id} =`, null);
    }

    const onIconClick = () => {
        console.log(`DateFilter on column ${props.id} with props =`, props);
        setModal(!modal);
    }

    const onChangeOperator = (event) => {
        setOperator(event.target.value);
        console.log(`Changing Conditional on column ${props.id} =`, event.target.value);
    };

    const onApplyFilterClick = () => {
        setModal(!modal);
        const filter = {
            id: props.id,
            value: value,
            operator: operator,
            type: props.filter.type
        };
        props.changed(filter);
        props.filterChanged(props.columnId, value);
    }

    return (
        <React.Fragment>
            <TextField
                id={props.id}
                type='text'
                defaultValue={displayValue}
                disabled
                InputProps={
                    {
                        startAdornment: (
                            <IconButton size='small' className='mr-3' onClick={onIconClick}>
                                <TodayIcon fontSize='small'/>
                            </IconButton>
                        ),
                        endAdornment: (<IconButton size='small' onClick={onClearIconClicked}><ClearIcon
                            fontSize='small'/></IconButton>)
                    }
                }/>
            <MDBModal isOpen={modal} toggle={toggleFilterModal} backdrop={true} size='sm'>
                <MDBModalHeader toggle={toggleFilterModal}>Выберите фильтр</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <MDBRow center>
                            <FormControl fullWidth={true} className='mx-3'>
                                <InputLabel id={"date-conditionals" + props.id + "_modal"}>Тип отношения</InputLabel>
                                <Select className={'my-3'}
                                        labelId={"date-conditionals" + props.id + "_modal"}
                                        id={props.id + "_select_modal"}
                                        value={operator}
                                        onChange={onChangeOperator}>
                                    <MenuItem value={'equals'}>Равно</MenuItem>
                                    <MenuItem value={'notEquals'}>Не равно</MenuItem>
                                    <MenuItem value={'greaterThan'}>Больше</MenuItem>
                                    <MenuItem value={'lessThan'}>Меньше</MenuItem>
                                    <MenuItem value={'greaterThanOrEqual'}>Больше или равно</MenuItem>
                                    <MenuItem value={'lessThanOrEqual'}>Меньше или равно</MenuItem>
                                </Select>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        className='mt-3'
                                        variant="inline"
                                        value={value}
                                        InputAdornmentProps={{
                                            position: "start"
                                        }}
                                        onChange={(date) => onChangeValue(date)}
                                        format="DD.MM.yyyy"
                                        keyboardIcon={<TodayIcon fontSize='small'/>}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                        </MDBRow>
                        <MDBRow center className='my-4'>
                            <MDBBtn color="indigo" size="sm" onClick={onApplyFilterClick}>Применить</MDBBtn>
                            <MDBBtn color="indigo" size="sm"
                                    onClick={() => onChangeValue('2099-12-31')}>Последние</MDBBtn>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
            </MDBModal>
        </React.Fragment>


    );
}
export default DateFilter;
