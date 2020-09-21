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

const OpeatorPlanProjectsEditPage = props => {

    const {handleSubmit, errors, control} = useForm();

    const onSubmit = data => {

        if (props.action === 'add') {
            console.log('Posting Data =', data, props.action);
            appAxios({
                url: `projects`,
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
                url: `projects`,
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
                                            defaultValue={props.data ? props.data.id : ''}/>
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
                                            label="Обозначение проекта"
                                            control={control}
                                            defaultValue={props.data ? props.data.projectCode : ''}/>
                                <Controller as={<MDBInput type="textarea" rows="2" className='my-3'/>}
                                            name="name"
                                            label="Проект"
                                            control={control}
                                            defaultValue={props.data ? props.data.projectName : ''}/>
                                <Controller
                                    control={control}
                                    rules={{required: true}}
                                    name="scenarioId"
                                    as={<TextField
                                        id="scenarioId"
                                        select
                                        label="Редакция ТС">
                                        {props.scenariosList.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>}
                                    defaultValue={props.data ? props.data.scenarioId : ''}/>
                                <Controller as={<MDBInput type="textarea" rows="2" className='my-3'/>}
                                            name="workStage"
                                            label="Стадия работ"
                                            control={control}
                                            defaultValue={props.data ? props.data.workStage : ''}/>
                                <Controller as={<MDBInput type="textarea" rows="2" className='my-3'/>}
                                            name="geolink"
                                            label="Географическая привязка"
                                            control={control}
                                            defaultValue={props.data ? props.data.geolink : ''}/>
                                <Controller rules={{pattern: /(?<=^| )\d+(\.\d+)?(?=$| )/i}}
                                            as={<TextField
                                                error={!!errors.cost}
                                                helperText={errors.cost ? 'Введите допустимое значение' : null}
                                                className='mb-3'/>}
                                            name="cost"
                                            label="Общие затраты млрд. руб"
                                            control={control}
                                            defaultValue={props.data ? props.data.cost : ''}/>
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

export default OpeatorPlanProjectsEditPage;
