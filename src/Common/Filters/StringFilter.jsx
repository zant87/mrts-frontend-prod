import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {
    MDBBtn,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBRow,
} from "mdbreact";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FilterListIcon from '@material-ui/icons/FilterList';

const StringFilter = props => {

    const [operator, setOperator] = useState(props.filter.operator);
    const [value, setValue] = useState(props.filter.value);
    const [modal, setModal] = useState(false);

    const onIconClick = () => {
        console.log(`StringFilter on column ${props.id} with props =`, props);
        setModal(!modal);
    }

    const toggleFilterModal = () => {
        setModal(!modal);
    }

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

    const onChangeOperator = (event) => {
        console.log(`Changing Conditional on column ${props.id} =`, event.target.value);
        setOperator(event.target.value);
    };

    const onChangeValue = (event) => {
        console.log(`Changing Value on column ${props.id} =`, event.target.value);
        setValue(event.target.value);
    }

    return (
        <React.Fragment>
            <TextField
                id={props.id}
                type='text'
                defaultValue={value}
                disabled
                InputProps={{startAdornment: <FilterListIcon className='mr-3' onClick={onIconClick}/>}}/>
            <MDBModal isOpen={modal} toggle={toggleFilterModal} backdrop={true} size='sm'>
                <MDBModalHeader toggle={toggleFilterModal}>Выберите фильтр</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <MDBRow center>
                            <FormControl fullWidth={true} className='mx-3'>
                                <InputLabel id={"text-conditionals" + props.id + "_modal"}>Тип отношения</InputLabel>
                                <Select className={'my-3'}
                                        labelId={"text-conditionals" + props.id + "_modal"}
                                        id={props.id + "_select_modal"}
                                        value={operator}
                                        onChange={onChangeOperator}>
                                    <MenuItem value={'~'}>Содержит</MenuItem>
                                    <MenuItem value={'!~'}>Не содержит</MenuItem>
                                    <MenuItem value={'='}>Равно</MenuItem>
                                    <MenuItem value={'!='}>Не равно</MenuItem>
                                    <MenuItem value={'!0'}>"Не нулевое</MenuItem>
                                </Select>
                                <TextField
                                    id={props.id + '_value_modal'}
                                    type='text'
                                    label="Значение"
                                    defaultValue={value}
                                    onChange={onChangeValue}
                                />
                            </FormControl>
                        </MDBRow>
                        <MDBRow center className='my-4' color='indigo'>
                            <MDBBtn onClick={onApplyFilterClick}>Применить</MDBBtn>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
            </MDBModal>
        </React.Fragment>
    );
};

export default StringFilter;
