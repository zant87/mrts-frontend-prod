import React from 'react';
import {toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {ruLocalization} from "../../_components";
import MaterialTable from "material-table";

export default class AdminStructureIndicatorsWeightPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        data: [],
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        this.setState({isLoading: true});
        appAxios.get(`/indicators`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({data: data, isLoading: false, count: count});
            });
    };

    render() {

        const tableRef = React.createRef();
        const {data, page, count, isLoading} = this.state;

        const columns = [
            {field: 'id', title: '#', filtering: false, editable: 'never'},
            {field: 'name', title: 'Наименование', filtering: true, editable: 'never'},
            {field: 'shortName', title: 'Короткое наименование', filtering: true, editable: 'never'},
            {field: 'code', title: 'Код', filtering: true, editable: 'never'},
            {field: 'description', title: 'Описание', filtering: true, editable: 'never'},
            {field: 'actual', title: 'Актульность', type: 'boolean', filtering: true, editable: 'never'},
            {field: 'goalName', title: 'Цель', filtering: true, editable: 'never'},
            {field: 'transportTypeName', title: 'Тип транспорта', filtering: true, editable: 'never'},
            {field: 'indicatorWeight', title: 'Вес', filtering: true, type: 'numeric'},
        ];

        return (
            <React.Fragment>
                <MaterialTable
                    title="Веса индикаторов"
                    columns={columns}
                    tableRef={tableRef}
                    isLoading={isLoading}
                    localization={ruLocalization}
                    data={data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = dataUpdate.findIndex(item => item.id === oldData.id);
                                    dataUpdate[index] = newData;
                                    this.setState({data: dataUpdate});

                                    appAxios({
                                        url: `indicators`,
                                        method: 'PUT',
                                        data: newData
                                    }).then((response) => {
                                        const message = response.headers["x-mrts-backend-params"];
                                        toast.success(`Успешно обновлена запись с ID ${newData.id}`, {
                                            closeButton: false
                                        });
                                    });

                                    resolve();
                                }, 1000)
                            }),
                    }}
                    options={{
                        actionsColumnIndex: 999,
                        search: false,
                        pageSize: 20,
                        pageSizeOptions: [20, 50, 100],
                        filtering: true
                    }}
                />
            </React.Fragment>
        )
    }
}
