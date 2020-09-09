import React from "react";
import { MDBCol, MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane } from "mdbreact";
import BudgetLevelsTable from "./BudgetLevelsTable/BudgetLevelsTable";
import BudgetLevelsChart from "./BudgetLevelsChart/BudgetLevelsChart";

class BudgetLevelsData extends React.Component {
  state = {
    activeItemJustified: "1",
  };

  toggleJustified = (tab) => (e) => {
    if (this.state.activeItemJustified !== tab) {
      this.setState({
        activeItemJustified: tab,
      });
    }
  };

  
  render() {
    return (
      <MDBCol lg="9" className="chart mt-10" style={{ marginBottom: "10px" }}>
        {/* <MDBCardHeader color="special-color p-1"> */}
        <MDBNav tabs className="nav-justified  mt-0  special-color  " color="blue-grey lighten-5">
          <MDBNavItem>
            <MDBNavLink to="#" link active={this.state.activeItemJustified === "1"} onClick={this.toggleJustified("1")} role="tab">
              <MDBIcon far icon="chart-bar" size="1x" /> График
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" link active={this.state.activeItemJustified === "2"} onClick={this.toggleJustified("2")} role="tab">
              <MDBIcon icon="table" size="1x" /> Таблица
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>

        <MDBTabContent className="card" activeItem={this.state.activeItemJustified}>
          <MDBTabPane tabId="1" role="tabpanel">
            <BudgetLevelsChart
              budLevVals={this.props.budLevVals}
              isFetchingBudLevData={this.props.isFetchingBudLevData}
              fundingId={this.props.fundingId}
              yearStart={this.props.yearStart}
              yearEnd={this.props.yearEnd}
            />
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <BudgetLevelsTable
              budLevVals={this.props.budLevVals}
              isFetchingBudLevData={this.props.isFetchingBudLevData}
              fundingId={this.props.fundingId}
              yearStart={this.props.yearStart}
              yearEnd={this.props.yearEnd}
            />
          </MDBTabPane>
        </MDBTabContent>
      </MDBCol>
    );
  }
}

export default BudgetLevelsData;
