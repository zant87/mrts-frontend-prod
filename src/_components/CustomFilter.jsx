import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const CustomFilter = (props) => {

    const filterTypes = [
        {value: '.equals', label: '=',},
        {value: '.greaterThan', label: '>',},
        {value: '.lessThan', label: '<',},
        {value: '.greaterThanOrEqual', label: '>=',},
        {value: '.lessThanOrEqual', label: '<=',},
    ];

    const [filter, setFilter] = React.useState('.equals');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    console.log(props);
    return (
        <FormGroup row={true}>
            <TextField
                id="filterTypes"
                select
                value={filter}
                onChange={handleChange}>
                {filterTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                value={props.columnDef.tableData.filterValue || ""}
                onChange={(event) => {
                    props.onFilterChanged(
                        props.columnDef.tableData.id,
                        event.target.value,
                        filter
                    );
                }}
            />
        </FormGroup>
    );
}

export default CustomFilter;
