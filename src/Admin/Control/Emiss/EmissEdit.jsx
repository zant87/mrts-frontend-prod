import React from "react";
import {MDBBtn, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import {useForm, Controller} from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const AdminControlEmissEditPage = props => {

    const {handleSubmit, errors, control} = useForm();

    const onSubmit = data => {

        console.log('Submitting Data =', data);

        if (props.action === 'add') {
            appAxios({
                url: `emiss-forms`,
                method: 'POST',
                data: data
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно добавлена запись с ID ${message}`, {
                    closeButton: false
                });
                props.toggleModal();
                props.tableRef.current.onQueryChange();
            });
        } else {
            appAxios({
                url: `emiss-forms`,
                method: 'PUT',
                data: data
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно обновлена запись с ID ${message}`, {
                    closeButton: false
                });
                props.toggleModal();
                props.tableRef.current.onQueryChange();
            });
        }
    }

    return (
        <div className="scrollbar my-1 mx-auto" style={{maxHeight: '85vh'}}>
            <React.Fragment>
                <MDBContainer>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBRow center>
                            <FormControl fullWidth={true} className='mx-auto'>
                                <Controller as={<TextField disabled className='mb-3'/>}
                                            name="id"
                                            label="#"
                                            control={control}
                                            defaultValue={props.data ? props.data.id : ''}/>
                                <Controller as={<TextField className='mb-3'/>}
                                            name="name"
                                            label="Наименование формы"
                                            control={control}
                                            defaultValue={props.data ? props.data.name : ''}/>
                                <Controller as={<TextField className='mb-3'/>}
                                            name="responsible"
                                            label="Ответственный"
                                            control={control}
                                            defaultValue={props.data ? props.data.responsible : ''}/>
                                <Controller as={<TextField className='mb-3'/>}
                                            name="email"
                                            label="Электронная почта"
                                            control={control}
                                            defaultValue={props.data ? props.data.email : ''}/>
                                <Controller as={<TextField className='mb-3'/>}
                                            name="phone"
                                            label="Телефон"
                                            control={control}
                                            defaultValue={props.data ? props.data.phone : ''}/>
                            </FormControl>
                        </MDBRow>
                        <MDBRow center className='my-3'>
                            <MDBBtn color="indigo" size="sm" type='submit'>Применить</MDBBtn>
                        </MDBRow>
                    </form>
                </MDBContainer>
            </React.Fragment>

        </div>
    );
}

export default AdminControlEmissEditPage;
