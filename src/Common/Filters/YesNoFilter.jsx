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

const YesNoFilter = props => {

    const [modal, setModal] = useState(false);

    const onIconClick = () => {
        console.log(`YesNoFilter on column ${props.id} with props =`, props);
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
            {/*<TextField*/}
            {/*    id={props.id}*/}
            {/*    defaultValue={props.filter.value ? props.filter.value : ''}*/}
            {/*    disabled*/}
            {/*    type='checkbox'*/}
            {/*    InputProps={*/}
            {/*        {*/}
            {/*            startAdornment: (*/}
            {/*                <IconButton size='small' className='mr-3' onClick={onIconClick}>*/}
            {/*                    <MDBIcon far icon="check-square" />*/}
            {/*                </IconButton>*/}
            {/*            ),*/}
            {/*            endAdornment: (<IconButton size='small' onClick={() => onClearIconClicked(null)}><ClearIcon*/}
            {/*                fontSize='small'/></IconButton>)*/}
            {/*        }*/}
            {/*    }/>*/}
        </React.Fragment>
    );
};

export default YesNoFilter;
