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
import ClearIcon from "@material-ui/icons/Clear";
import {IconButton} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const NumericFilter = props => {

    const [modal, setModal] = useState(false);
    const regex = props.filter.type === 'integer' ? /(^\d+$| )/i : /(?<=^| )\d+(\.\d+)?(?=$| )/i;

    const onIconClick = () => {
        console.log(`NumericFilter on column ${props.id} with props =`, props);
        setModal(!modal);
    }

    const toggleFilterModal = () => {
        setModal(!modal);
    }

    const onClearIconClicked = (event) => {

        console.log('Resetting Data');

        const filter = {
            id: props.id,
            type: props.filter.type,
            operator: props.filter.operator,
            value: event,
        };

        props.changed(filter);
        props.filterChanged(props.columnId, event);
    }

    const {handleSubmit, errors, control} = useForm();

    const onSubmit = data => {
        console.log('Submitting Data =', data);
        setModal(!modal);

        const filter = {
            id: props.id,
            value: data.value,
            operator: data.operator,
            type: props.filter.type
        };

        props.changed(filter);
        props.filterChanged(props.columnId, data.value);
    }

    return (
        <React.Fragment>
            <TextField
                id={props.id}
                defaultValue={props.filter.value ? props.filter.value : ''}
                disabled
                InputProps={
                    {
                        startAdornment: (
                            <IconButton size='small' className='mr-3' onClick={onIconClick}>
                                <MDBIcon icon='calculator'/>
                            </IconButton>
                        ),
                        endAdornment: (<IconButton size='small' onClick={() => onClearIconClicked(null)}><ClearIcon
                            fontSize='small'/></IconButton>)
                    }
                }/>
            <MDBModal isOpen={modal} toggle={toggleFilterModal} backdrop={true} size='sm'>
                <MDBModalHeader toggle={toggleFilterModal}>Выберите фильтр</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <MDBRow center>
                                <FormControl fullWidth={true} className='mx-auto'>
                                    <InputLabel id={"numeric-conditionals" + props.id + "_modal"}>Тип
                                        отношения</InputLabel>
                                    <Controller
                                        control={control}
                                        rules={{required: true}}
                                        name="operator"
                                        as={<Select className='my-3' id={"numeric-conditionals" + props.id + "_modal"}>
                                            <MenuItem value={'equals'}>Равно</MenuItem>
                                            <MenuItem value={'notEquals'}>Не равно</MenuItem>
                                            <MenuItem value={'greaterThan'}>Больше</MenuItem>
                                            <MenuItem value={'lessThan'}>Меньше</MenuItem>
                                            <MenuItem value={'greaterThanOrEqual'}>Больше или равно</MenuItem>
                                            <MenuItem value={'lessThanOrEqual'}>Меньше или равно</MenuItem>
                                        </Select>}
                                        defaultValue={props.filter.operator}/>
                                    <Controller rules={{pattern: regex}}
                                                as={<TextField
                                                    error={!!errors.value}
                                                    helperText={errors.value ? 'Введите допустимое значение' : null}
                                                    className='mb-3'/>}
                                                name="value"
                                                label="Значение"
                                                control={control}
                                                defaultValue={props.filter.value ? props.filter.value : ''}/>
                                </FormControl>
                            </MDBRow>
                            <MDBRow center className='my-3'>
                                <MDBBtn color="indigo" size="sm" type='submit'>Применить</MDBBtn>
                            </MDBRow>
                        </form>
                    </MDBContainer>
                </MDBModalBody>
            </MDBModal>
        </React.Fragment>
    );
};

export default NumericFilter;
