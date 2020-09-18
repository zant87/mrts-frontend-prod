import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {
    MDBBtn,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader, MDBRow,
    MDBSelect
} from "mdbreact";

const NumericFilter = props => {

    const [filter, setFilter] = useState(
        {
            id: props.id,
            value: props.filter.value,
            operator: props.filter.operator,
            type: props.filter.type
        }
    );

    const [filterOptions, setFilterOptions] = useState(
        {
            options: [
                {
                    checked: props.filter.operator === '=',
                    value: "=",
                    text: "Равно"
                },
                {
                    checked: props.filter.operator === '!=',
                    // icon: 'not-equal',
                    value: "!=",
                    text: "Не равно"
                },
                {
                    checked: props.filter.operator === '>=',
                    value: ">=",
                    text: "Больше или равно"
                },
                {
                    checked: props.filter.operator === '<=',
                    value: "<=",
                    text: "Меньше или равно"
                }
            ]
        }
    );

    const [modal, setModal] = useState(false);

    const onIconClick = () => {
        console.log('NumericFilter props =', props);
        setModal(!modal);
    }

    const toggleFilterModal = () => {
        setModal(!modal);
    }

    const onApplyFilterClick = () => {
        setModal(!modal);
        props.changed(filter);
    }

    return <React.Fragment>
        <TextField
            id={props.id}
            type='number'
            defaultValue={filter.value}
            onChange={(e) => {
                console.log('Changing filter to =')
                const newFilter = filter;
                newFilter.value = e.target.value;
                setFilter(newFilter);
            }}
            InputProps={
                {
                    startAdornment: (
                        <div>
                            <MDBIcon icon='calculator' className='mr-3' onClick={onIconClick}/>
                        </div>),
                }
            }
        />
        <MDBModal isOpen={modal} toggle={toggleFilterModal} backdrop={true} size='sm'>
            <MDBModalHeader toggle={toggleFilterModal}>Выберите фильтр</MDBModalHeader>
            <MDBModalBody>
                <MDBContainer>
                    <MDBRow center>
                        <MDBSelect label="Тип отношения" options={filterOptions.options} getValue={(e) => {
                            let newFilter = filter;
                            newFilter.operator = e[0];
                            setFilter(newFilter);
                        }}/>
                    </MDBRow>
                    <MDBRow center>
                        <TextField
                            id={props.id + '_modal'}
                            type='number'
                            defaultValue={filter.value}
                            onChange={(e) => {
                                console.log('Changing filter to =')
                                const newFilter = filter;
                                newFilter.value = e.target.value;
                                setFilter(newFilter);
                            }}
                        />
                    </MDBRow>
                    <MDBRow center className='my-3' color='indigo'>
                        <MDBBtn onClick={onApplyFilterClick}>Применить</MDBBtn>
                    </MDBRow>
                </MDBContainer>
            </MDBModalBody>
        </MDBModal>
    </React.Fragment>
        ;
};

export default NumericFilter;
