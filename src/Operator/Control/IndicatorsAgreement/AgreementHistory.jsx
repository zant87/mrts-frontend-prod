import React from "react";
import appAxios from "../../../_services/appAxios";
import Axios from "axios";
import {ruLocalization} from "../../../_components";
import {toast} from "mdbreact";
import MaterialTable from "material-table";
import TableContainer from "../../../Containers/TableContainer";
import construct from "@babel/runtime/helpers/esm/construct";

export default class AgreementHistoryPage extends React.Component {

    constructor(props) {
        super(props);
        console.log('AgreementHistoryPage got props =', props);
    }

    render() {

        const columns = [
            {field: 'id', title: '#'},
            {field: 'fullname', title: 'Пользователь'},
            {field: 'beginDate', title: 'Дата начала действия согласования', type: 'date'},
            {field: 'endDate', title: 'Дата окончания действия согласования', type: 'date'},
            {field: 'userComment', title: 'Комментарий'},
            {field: 'state', title: 'Состояние'},
        ];

        const filtersList = {
            'beginDate': 'date',
            'endDate': 'date',
        };

        return (
            <TableContainer
                columns={columns}
                title={''}
                filtersList={filtersList}
                filterMinimalLength={1}
                baseUrl={`views/agreement-histories?idDoc.equals=${this.props.document}&user=${this.props.username}`}
                modifiedBaseUrl={true}
                loadAll={true}
            />
        );
    }
}
