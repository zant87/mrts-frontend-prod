import React from 'react';
import { MDBContainer, MDBSpinner, MDBTabPane, MDBTabContent } from "mdbreact";
import appAxios from "../../_services/appAxios";
import ReportsNav from "./ReportsNav";
import PivotContainer from "./PivotContainer";
import TableContainer from "./TableContainer";
import pivotFields from "./pivot-fields/AppropiationsRec"

export default class OperatorReportAppropriationsTabsPage extends React.Component {

    state = {
        page: 0,
        count: 0,
        // data: [],
        pivotData: [],
        isLoading: false,
        isLoadingPivot: false,
        activeItem: "1"
    };

    toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({  activeItem: tab });
      }
    };

    componentDidMount() {
        //сохранять state через redux
        this.getPivotData();
    };

    getPivotData = () => {
        this.setState({ isLoadingPivot: true });
        appAxios.get(`/views/k-9-s-all`)
            .then(res => {
                const count = Number(res.headers['x-total-count']);
                const data = res.data;
                this.setState({pivotData: data, isLoadingPivot: false, count: count});
            });
    };

    render() {

        const TITLE = "Бюджетные ассигнования в рамках программ развития транспорта";
        const api = `k-9-s`;
        const columns = [
            {field: 'year', title: 'Отчетный год', editable: 'never'},
            {field: 'expenditureName', title: 'Направление расходов', editable: 'never'},
            {field: 'plan', title: 'Запланировано, млн. руб.'},
            {field: 'fact', title: 'Кассовое исполнение, млн. руб.'},
        ];

        const { pivotData, page, count, isLoading, isLoadingPivot } = this.state;

        return (
            <MDBContainer fluid>
                <ReportsNav activeItem={this.state.activeItem} onHandleToggle={this.toggle} />
                <MDBTabContent activeItem={this.state.activeItem} className="card" >
                  <MDBTabPane tabId="1" role="tabpanel">
                    <TableContainer columns={columns} 
                                    getApi={api} 
                                    updateApi={api} 
                                    isLoading={isLoading} 
                                    title={TITLE} />
                  </MDBTabPane>
                  <MDBTabPane tabId="2" role="tabpanel">
                     <PivotContainer pFields={pivotFields} pData={pivotData} isPLoading={isLoadingPivot} title={TITLE} />
                  </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        );
    }
}
