import React from 'react';
import {toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {ruLocalization} from "../../_components";
import MaterialTable from "material-table";

export default class AdminControlEmissPage extends React.Component {

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
        appAxios.get(`/emiss-forms`)
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
            {field: 'name', title: 'Наименование формы', filtering: true},
            {field: 'responsible', title: 'Отвественный', filtering: true},
            {field: 'email', title: 'Email', filtering: true},
            {field: 'phone', title: 'Телефон', filtering: true}
        ];

        return (
            <React.Fragment>
                <MaterialTable
                    title="Ответственные за подготовку данных Росстата"
                    columns={columns}
                    tableRef={tableRef}
                    isLoading={isLoading}
                    localization={ruLocalization}
                    data={data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataNew = [...data];
                                    appAxios({
                                        url: `emiss-forms`,
                                        method: 'POST',
                                        data: newData
                                    }).then((response) => {
                                        const message = response.headers["x-mrts-backend-params"];
                                        toast.success(`Успешно добавлена запись с ID ${message}`, {
                                            closeButton: false
                                        });
                                        newData.id = message;
                                        dataNew.push(newData);
                                        this.setState({data: dataNew});
                                    });

                                    resolve();
                                }, 1000)
                            }),

                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = dataUpdate.findIndex(item => item.id === oldData.id);
                                    dataUpdate[index] = newData;
                                    this.setState({data: dataUpdate});

                                    appAxios({
                                        url: `emiss-forms`,
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
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    const dataDelete = [...data];
                                    const index = dataDelete.findIndex(item => item.id === oldData.id);

                                    appAxios({
                                        url: `emiss-forms/${oldData.id}`,
                                        method: 'DELETE',
                                    }).then((response) => {
                                        const message = response.headers["x-mrts-backend-params"];
                                        toast.success(`Удалена запись с ID ${message}`, {
                                            closeButton: false
                                        });
                                    });

                                    dataDelete.splice(index, 1);

                                    this.setState({data: dataDelete});
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
