import React from 'react';
import {toast} from "mdbreact";
import appAxios from "../../_services/appAxios";
import {ruLocalization} from "../../_components";
import MaterialTable from "material-table";

export default class AdminControlExecutorsPage extends React.Component {

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
        appAxios.get(`/users`)
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
            {field: 'email', title: 'Электронная почта'},
            {field: 'fullname', title: 'ФИО'},
            {field: 'phone', title: 'Телефон'},
            {field: 'department', title: 'Департамент'},
            {field: 'username', title: 'ID пользователя'}
        ];

        return (
            <React.Fragment>
                <MaterialTable
                    title="Реестр исполнителей"
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
                                        url: `users`,
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
                                        url: `users`,
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


// const AdminExecutorsPage = () => {
//     return (
//         <MDBContainer>
//             <MDBRow className='mt-5'>
//                 <MDBBreadcrumb>
//                     <MDBBreadcrumbItem>Главная</MDBBreadcrumbItem>
//                     <MDBBreadcrumbItem>Контроль</MDBBreadcrumbItem>
//                     <MDBBreadcrumbItem active>Реестр исполнителей процессов</MDBBreadcrumbItem>
//                 </MDBBreadcrumb>
//             </MDBRow>
//             <MDBRow>
//                 <h1>Реестр исполнителей процессов</h1>
//             </MDBRow>
//         </MDBContainer>
//     );
// };
//
// export default AdminExecutorsPage;
