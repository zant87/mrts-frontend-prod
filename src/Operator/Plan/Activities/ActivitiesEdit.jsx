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

const OpeatorPlanActivitiesEditPage = props => {

    const {handleSubmit, errors, control} = useForm();

    console.log('OpeatorPlanActivitiesEditPage props =', props);

    const onSubmit = data => {
        if (props.action === 'add') {
            // delete newData.id;
            console.log('Posting Data =', data, props.action);
            appAxios({
                url: `activities`,
                method: 'POST',
                data: data
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно добавлена запись с ID ${message}`, {
                    closeButton: false
                });
                props.tableRef.current.onQueryChange();
            });
        } else {
            console.log('Putting Data =', data, props.action);
            appAxios({
                url: `activities`,
                method: 'PUT',
                data: data
            }).then((response) => {
                const message = response.headers["x-mrts-backend-params"];
                toast.success(`Успешно добавлена запись с ID ${message}`, {
                    closeButton: false
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
                                <Controller as={<TextField disabled className='mb-3'/>}
                                            name="id"
                                            label="#"
                                            control={control}
                                            defaultValue={props.data ? props.data.activityId : ''}/>
                                <Controller
                                    control={control}
                                    rules={{required: true}}
                                    name="transportStrategyVersionId"
                                    as={<TextField
                                        id="transportStrategyVersionId"
                                        select
                                        label="Редакция ТС">
                                        {props.transportStrategiesList.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>}
                                    defaultValue={props.data ? props.data.transportStrategyVersionId : ''}/>
                                <Controller as={<MDBInput type="textarea" rows="2" className='my-3'/>}
                                            name="code"
                                            label="Обозначение мероприятия"
                                            control={control}
                                            defaultValue={props.data ? props.data.activityCode : ''}/>
                                <Controller as={<MDBInput type="textarea" rows="2" className='my-3'/>}
                                            name="description"
                                            label="Содержание мероприятия"
                                            control={control}
                                            defaultValue={props.data ? props.data.activityDescription : ''}/>
                                <Controller as={<MDBInput type="textarea" rows="2" className='my-3'/>}
                                            name="documentType"
                                            label="Вид документа"
                                            control={control}
                                            defaultValue={props.data ? props.data.documentType : ''}/>
                                <Controller rules={{pattern: /(^\d+$| )/i}}
                                            as={<TextField
                                                error={!!errors.beginYear}
                                                helperText={errors.beginYear ? 'Введите допустимое значение' : null}
                                                className='mb-3'/>}
                                            name="beginYear"
                                            label="Начало реализации"
                                            control={control}
                                            defaultValue={props.data ? props.data.yearBegin : ''}/>
                                <Controller rules={{pattern: /(^\d+$| )/i}}
                                            as={<TextField
                                                error={!!errors.endYear}
                                                helperText={errors.endYear ? 'Введите допустимое значение' : null}
                                                className='mb-3'/>}
                                            name="endYear"
                                            label="Конец реализации"
                                            control={control}
                                            defaultValue={props.data ? props.data.yearEnd : ''}/>
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

export default OpeatorPlanActivitiesEditPage;
