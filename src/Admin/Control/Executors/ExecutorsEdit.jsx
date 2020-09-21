import React from "react";
import {MDBBtn, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import {useForm, Controller} from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const AdminControlExecutorsEditPage = props => {

    const {handleSubmit, errors, control} = useForm();

    const onSubmit = data => {
        console.log('Submitting Data =', data);
        appAxios({
            url: `users`,
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

    return (
        <div className="scrollbar my-1 mx-auto" style={{maxHeight: '85vh'}}>
            <React.Fragment>
                <MDBContainer>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {props.data ?
                            <MDBRow center>
                                <FormControl fullWidth={true} className='mx-auto'>
                                    <Controller as={<TextField disabled className='mb-3'/>}
                                                name="id"
                                                label="#"
                                                control={control}
                                                defaultValue={props.data.id}/>
                                    <Controller as={<TextField className='mb-3'/>}
                                                name="email"
                                                label="Электронная почта"
                                                control={control}
                                                defaultValue={props.data.email}/>
                                    <Controller as={<TextField className='mb-3'/>}
                                                name="fullname"
                                                label="ФИО"
                                                control={control}
                                                defaultValue={props.data.fullname}/>
                                    <Controller as={<TextField className='mb-3'/>}
                                                name="phone"
                                                label="Телефон"
                                                control={control}
                                                defaultValue={props.data.phone}/>
                                    <Controller as={<TextField className='mb-3'/>}
                                                name="department"
                                                label="Департамент"
                                                control={control}
                                                defaultValue={props.data.department}/>
                                    <Controller as={<TextField disabled className='mb-3'/>}
                                                name="username"
                                                label="ID пользователя"
                                                control={control}
                                                defaultValue={props.data.username}/>
                                </FormControl>
                            </MDBRow>
                            : null
                        }
                        <MDBRow center className='my-3'>
                            <MDBBtn color="indigo" size="sm" type='submit'>Применить</MDBBtn>
                        </MDBRow>
                    </form>
                </MDBContainer>
            </React.Fragment>

        </div>
    );
}

export default AdminControlExecutorsEditPage;
