import React from "react";

import { authenticationService } from "../../_services";
import appAxios from "../../_services/appAxios";
import Axios from "axios";
import { MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, toast } from "mdbreact";
import moment from "moment";
import AgreementHistoryPage from "./IndicatorsAgreement/AgreementHistory";
import AgreementComment from "./IndicatorsAgreement/AgreementComment";
import TableContainerWithFilters from "../../Containers/TableContainerWithFilters";
import NumericFilter from "../../Common/Filters/NumericFilter";
import StringFilter from "../../Common/Filters/StringFilter";
import YesNoFilter from "../../Common/Filters/YesNoFilter";

export default class OperatorControlIndicatorsAgreementPage extends React.Component {

    state = {
        currentUser: null,
        currentUserOnly: false,
        initialized: false,
        icon: "check_circle_outline",
        showHistory: false,
        cancelModal: false,
        rowToCancel: {},
        filtersList: {
            id: {
                type: "integer",
                operator: "equals",
                value: null,
            },
            indicatorYear: {
                type: "integer",
                operator: "equals",
                value: null,
            },
            indicatorQuarter: {
                type: "text",
                operator: "contains",
                value: null,
            },
            indicatorName: {
                type: "text",
                operator: "contains",
                value: null,
            },
            nationalSymbolicName: {
                type: "text",
                operator: "contains",
                value: null,
            },
            agreeList: {
                type: "text",
                operator: "contains",
                value: null,
            },
            agreeUndone: {
                type: "text",
                operator: "contains",
                value: null,
            },
            approveList: {
                type: "text",
                operator: "contains",
                value: null,
            },
            indicatorValue: {
                type: "numeric",
                operator: "equals",
                value: null,
            },
            approve: {
                type: "boolean",
                operator: "equals",
                value: null,
            },
        },
    };
    tableRef = React.createRef();

    updateFilter = (e) => {
        console.log("Update Filter received =", e);
        let newFilter = this.state.filtersList;
        newFilter[e.id] = {value: e.value, operator: e.operator, type: e.type};
        console.log("New Filter =", newFilter);
        this.setState({filtersList: newFilter});
    };

    getUser = (id) => appAxios.get(`users?username.equals=${id}`).catch((err) => null);

    getIndicators = () => appAxios.get(`indicators`).catch((err) => null);

    async componentDidMount() {
        try {
            const [rUser, rIndicators] = await Axios.all([this.getUser(authenticationService.currentUserValue.id), this.getIndicators()]);

            console.log("%cUser =", "color: green", {...rUser.data[0]});

            this.setState({
                currentUser: authenticationService.currentUserValue,
                user: rUser.data[0],
                indicators: rIndicators.data,
                initialized: true,
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    toggleHistory = (rowData) => {
        this.setState({document: rowData.documentId, showHistory: !this.state.showHistory});
    };

    toggleHistoryModal = () => {
        this.setState({showHistory: !this.state.showHistory});
    };

    toggleCancel = () => {
        console.log("Toggle cancel clicked and state =", this.state);
        this.setState({
            cancelModal: !this.state.cancelModal,
        });
    };

    cancelAgreement = (rowData) => {
        this.setState({
            rowToCancel: rowData,
            cancelModal: !this.state.cancelModal,
        });
    };

    checkDone = (rowData) => {
        if (rowData.agreeIdDone === null) return false;
        return rowData.agreeIdDone.includes(this.state.user.username);
    };

    approveAgreement = (rowData) => {
        const date = moment().format("YYYY-MM-DD");
        let role = null;

        if (rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) {
            if (this.checkDone(rowData)) {
                toast.warning(`Уже согласовано`, {closeButton: false});
            } else {
                role = "AGREE";

                const data = {
                    agreementRole: role,
                    beginDate: date,
                    endDate: "2099-12-31",
                    executorId: this.state.user.id,
                    documentId: rowData.documentId,
                    stateId: 1
                };

                console.log("Data to POST into document-agreements =", data);

                appAxios({
                    url: `document-agreements`,
                    method: "POST",
                    data: data,
                }).then((response) => {
                    const message = response.headers["x-mrts-backend-params"];
                    toast.success(`Согласование успешно создано для ID ${message}`, {closeButton: false});
                    this.tableRef.current.onQueryChange();
                });
            }
        }

        if (rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username)) {
            if (rowData.approved === 1) {
                toast.warning(`Уже утверждено`, {closeButton: false});
            } else {
                role = "APPROVE";

                const data = {
                    agreementRole: role,
                    beginDate: date,
                    endDate: "2099-12-31",
                    executorId: this.state.user.id,
                    documentId: rowData.documentId,
                    stateId: 3
                };

                console.log("Data to POST into document-agreements =", data);

                appAxios({
                    url: `document-agreements`,
                    method: "POST",
                    data: data,
                }).then((response) => {
                    const message = response.headers["x-mrts-backend-params"];
                    toast.success(`Утверждение успешно создано для ID ${message}`, {closeButton: false});
                    this.tableRef.current.onQueryChange();
                });
            }
        }
    };

    checkAgreement = (rowData) => {
        return (
            (rowData.agreeIdList && rowData.agreeIdList.includes(this.state.user.username)) ||
            (rowData.approveIdList && rowData.approveIdList.includes(this.state.user.username))
        );
    };

    agreeDone = (rowData) => {
        return rowData.agreeIdDone && rowData.agreeIdDone.includes(this.state.user.username);
    };

    render() {

        const columns = [
            {
                field: "id",
                title: "#",
                filtering: false,
                filterComponent: (props) => {
                    return (
                        <NumericFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },

            {
                field: "indicatorYear",
                title: "Год",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <NumericFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },
            {
                field: "indicatorQuarter",
                title: "Квартал",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <StringFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },
            {
                field: "indicatorName",
                title: "Индикатор",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <StringFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },
            {
                field: "nationalSymbolicName",
                title: "Единица измерения",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <StringFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },
            {
                field: "agreeList",
                title: "Требуется согласование",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <StringFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },
            {
                field: "agreeUndone",
                title: "Не согласован",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <StringFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },
            {
                field: "approveList",
                title: "Требует утверждения",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <StringFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },

            {
                field: "indicatorValue",
                title: "Значение индикатора",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <NumericFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
            },
            {
                field: "check",
                title: "Согласован",
                sorting: false,
                render: (rowData) =>
                    this.agreeDone(rowData) ? (
                        <MDBIcon icon="thumbs-up" size="2x" className="green-text pr-3"/>
                    ) : (
                        <MDBIcon icon="thumbs-down" size="2x" className="red-text pr-3"/>
                    ),
                filtering: false,
            },
            {
                field: "approved",
                title: "Утвержден",
                filtering: true,
                filterComponent: (props) => {
                    return (
                        <YesNoFilter
                            id={props.columnDef.field}
                            columnId={props.columnDef.tableData.id}
                            filter={this.state.filtersList[props.columnDef.field]}
                            filterChanged={props.onFilterChanged}
                            changed={this.updateFilter}
                        />
                    );
                },
                render: (rowData) =>
                    rowData.approved === 1 ?
                        (<MDBIcon icon="thumbs-up" size="2x" className="green-text pr-3"/>) :
                        (<MDBIcon icon="thumbs-down" size="2x" className="red-text pr-3"/>)
            },
        ];

        const actions = [
            {
                icon: "check",
                tooltip: "Согласовать",
                onClick: (event, rowData) => {
                    this.approveAgreement(rowData);
                },
            },
            {
                icon: "history",
                tooltip: "История согласований",
                onClick: (event, rowData) => {
                    this.toggleHistory(rowData);
                },
            },
            {
                icon: "cancel",
                tooltip: "Отозвать согласование",
                onClick: (event, rowData) => {
                    this.cancelAgreement(rowData);
                },
            },
            {
                icon: this.state.icon,
                tooltip: "Свои согласования",
                onClick: (event, rowData) => {
                    let icon = "check_circle_outline";
                    if (!this.state.currentUserOnly) icon = "check_circle";
                    this.setState({currentUserOnly: !this.state.currentUserOnly, icon: icon});
                    this.tableRef.current.onQueryChange();
                },
                isFreeAction: true,
            },
        ];

        return (
            <React.Fragment>
                {this.state.initialized && (
                    <React.Fragment>
                        <TableContainerWithFilters
                            columns={columns}
                            tableRef={this.tableRef}
                            title={"Согласование индикаторов ТС"}
                            baseUrl={`views/indicator-agrees-by-user?filterByUser=${this.state.currentUserOnly}&username=${this.state.user.username}`}
                            actions={actions}
                            filtersList={this.state.filtersList}
                            modifiedBaseUrl={true}
                            loadAll={true}/>
                        <MDBModal isOpen={this.state.showHistory} toggle={this.toggleHistoryModal} backdrop={true}
                                  size="fluid">
                            <MDBModalHeader toggle={this.toggleHistoryModal}>История согласований</MDBModalHeader>
                            <MDBModalBody>
                                <AgreementHistoryPage document={this.state.document}
                                                      username={this.state.currentUser.id}/>
                            </MDBModalBody>
                        </MDBModal>
                        <MDBModal isOpen={this.state.cancelModal} toggle={this.toggleCancel} backdrop={true} size="lg">
                            <MDBModalHeader toggle={this.toggleCancel}>Отзыв согласования</MDBModalHeader>
                            <MDBModalBody>
                                <AgreementComment close={this.toggleCancel} data={this.state.rowToCancel}
                                                  user={this.state.user} tableRef={this.tableRef}/>
                            </MDBModalBody>
                        </MDBModal>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
