import React from 'react';
import {MDBCol, MDBContainer, MDBRow, toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import MaterialTable from "material-table";
import {ruLocalization} from "../../_components/MaterialTableLocalization";
import {history} from "@/_helpers";

export default class AdminStructureFormulasPage extends React.Component {

    state = {
        data: [],
        isLoading: true
    };

    getIndicators = () => appAxios.get(`indicators`).catch(err => null);

    async componentDidMount() {
        try {
            const [rIndicators] = await Axios.all([this.getIndicators()]);

            this.setState(
                {
                    data: rIndicators.data,
                    isLoading: false,

                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'transportTypeName', title: 'Строковое значение', editable: 'never'},
            {field: 'name', title: 'Наименование', editable: 'never'},
            // {field: 'formula', title: 'Формула', editable: 'never'},
        ];

        const {data, isLoading} = this.state;
        const tableRef = React.createRef();

        return (
            <MDBContainer fluid>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-2 mx-auto'>
                        <MaterialTable
                            title="Формулы расчета индикаторов"
                            columns={columns}
                            tableRef={tableRef}
                            data={data}
                            isLoading={isLoading}
                            tableLayout={'fixed'}
                            localization={ruLocalization}
                            options={{
                                search: true,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100],
                                actionsColumnIndex: 999,
                            }}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Редактировать',
                                    onClick: (event, rowData) => {
                                        console.log(`Посылаем в форму редактирования URL: ${history.location.pathname}/${rowData.id}`);
                                        history.push(`${history.location.pathname}/${rowData.id}`, rowData);
                                    }
                                }
                            ]}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
