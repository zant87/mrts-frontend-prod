import React from 'react';
import {useForm} from 'react-hook-form';
import {MDBBtn, MDBInput, toast} from "mdbreact";
import appAxios from "../../../_services/appAxios";
import moment from "moment";

const AgreementComment = (props) => {
    const {register, handleSubmit, errors} = useForm();

    console.log(props);
    console.log(errors);

    const onSubmit = formData => {

        // const newData = {...props.data, userComment: data.comment}
        // console.log('Submit data =', newData);

        const date = moment().format('YYYY-MM-DD');

        if (props.data.agreeIdList && props.data.agreeIdList.includes(props.user.username)) {

            console.log(`[GET] document-agreements?documentId.equals=${props.data.documentId}&executorId.equals=${props.user.id}&endDate.equals=2099-12-31`);

            appAxios({
                url: `document-agreements?documentId.equals=${props.data.documentId}&executorId.equals=${props.user.id}&endDate.equals=2099-12-31`,
                method: 'GET',
            }).then((response) => {

                if (response.data.length !== 0) {
                    const data = {...response.data[0], endDate: date, userComment: formData.comment};

                    console.log('Data to PUT into document-agreements =', data);

                    appAxios({
                        url: `document-agreements`,
                        method: 'PUT',
                        data: data
                    }).then((response) => {
                        toast.success(`Согласование успешно отозвано`, {closeButton: false});
                        props.tableRef.current.onQueryChange();
                    })

                } else {
                    toast.warning(`Согласование уже отозвано`, {closeButton: false});
                }
            })
        }

        if (props.data.approveIdList && props.data.approveIdList.includes(props.user.username)) {

            console.log(`[GET] document-agreements?documentId.equals=${props.data.documentId}&executorId.equals=${props.user.id}&endDate.equals=2099-12-31`);

            appAxios({
                url: `document-agreements?documentId.equals=${props.data.documentId}&executorId.equals=${props.user.id}&endDate.equals=2099-12-31`,
                method: 'GET',
            }).then((response) => {

                if (response.data.length !== 0) {
                    console.log('document-agreements GET response =', response.data);

                    const data = {...response.data[0], endDate: date, userComment: formData.comment};
                    console.log('Data to PUT into document-agreements =', data);

                    appAxios({
                        url: `document-agreements`,
                        method: 'PUT',
                        data: data
                    }).then((response) => {
                        toast.success(`Утверждение успешно отозвано`, {closeButton: false});
                        props.tableRef.current.onQueryChange();
                    })
                } else {
                    toast.warning(`Утверждение уже отозвано`, {closeButton: false});
                }
            })
        }

        props.close();

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea name="comment" className="form-control my-3" rows="5" ref={register({required: true})}/>
            <MDBBtn color="indigo" type="submit">Отозвать</MDBBtn>
            <MDBBtn color="danger" onClick={props.close}>Отмена</MDBBtn>
        </form>
    );
}

export default AgreementComment;
