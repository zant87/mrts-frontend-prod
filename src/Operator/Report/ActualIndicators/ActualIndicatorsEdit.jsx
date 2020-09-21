import React from "react";
import {
    MDBBtn,
    MDBContainer, MDBInput,
    MDBRow,
    toast
} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import {useForm, Controller} from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const OpeatorReportActualIndicatorsEditPage = props => {

    const {handleSubmit, errors, control} = useForm();

    const onSubmit = data => {
        if (props.action === 'edit') {

            const newData = {...props.data, indicatorValue: data.indicatorValue, username: props.username};
            console.log('Putting Data =', newData, props.action);

            appAxios({
                url: `/views/actual-indicator-ext`,
                method: "PUT",
                data: newData,
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
                    closeButton: false,
                });
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
                                <Controller as={<TextField disabled/>}
                                            name="id"
                                            label="#"
                                            control={control}
                                            defaultValue={props.data ? props.data.id : ''}/>
                                <Controller as={<MDBInput disabled className='mt-3'/>}
                                            name="indicatorName"
                                            label="Наименование"
                                            control={control}
                                            defaultValue={props.data ? props.data.indicatorName : ''}/>
                                <Controller as={<MDBInput disabled type="textarea" rows="2" className='mt-3'/>}
                                            name="scenarioName"
                                            label="Сценарий"
                                            control={control}
                                            defaultValue={props.data ? props.data.scenarioName : ''}/>
                                <Controller as={<MDBInput disabled className='mt-3'/>}
                                            name="transportTypeName"
                                            label="Вид транспорта"
                                            control={control}
                                            defaultValue={props.data ? props.data.transportTypeName : ''}/>
                                <Controller as={<MDBInput disabled className='mt-3'/>}
                                            name="okeiName"
                                            label="Единица измерений"
                                            control={control}
                                            defaultValue={props.data ? props.data.okeiName : ''}/>
                                <Controller rules={{pattern: /(^\d+$| )/i}}
                                            as={<TextField
                                                error={!!errors.indicatorValue}
                                                helperText={errors.indicatorValue ? 'Введите допустимое значение' : null}
                                                className='mt-3'/>}
                                            name="indicatorValue"
                                            label="Значение"
                                            control={control}
                                            defaultValue={props.data ? props.data.indicatorValue : ''}/>
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

export default OpeatorReportActualIndicatorsEditPage;
