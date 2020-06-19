import React from "react";
import {
  MDBCol,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBTabContent,
  MDBTabPane,
} from "mdbreact";
import ParamsTable from "./ParamsTable/ParamsTable";
import ParamsChart from "./ParamsChart/ParamsChart";

class ParamData extends React.Component {
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
      <MDBCol lg="6" className="chart mt-10" style={{ marginBottom: "10px" }}>
        {/* <MDBCardHeader color="special-color p-1"> */}
        <MDBNav
          tabs
          className="nav-justified  mt-0  special-color  "
          color="blue-grey lighten-5"
        >
          <MDBNavItem>
            <MDBNavLink
              to="#"
              link
              active={this.state.activeItemJustified === "1"}
              onClick={this.toggleJustified("1")}
              role="tab"
            >
              <MDBIcon far icon="chart-bar" size="1x" /> График
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to="#"
              link
              active={this.state.activeItemJustified === "2"}
              onClick={this.toggleJustified("2")}
              role="tab"
            >
              <MDBIcon icon="table" size="1x" /> Таблица
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>

        <MDBTabContent
          className="card"
          activeItem={this.state.activeItemJustified}
        >
          <MDBTabPane tabId="1" role="tabpanel">
            <ParamsChart
              paramVals={this.props.paramVals}
              isFetchingParamData={this.props.isFetchingParamData}
              paramFrequencyId={this.props.paramFrequencyId}
              paramYearStart={this.props.paramYearStart}
              paramYearEnd={this.props.paramYearEnd}
            />
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <ParamsTable
              paramVals={this.props.paramVals}
              isFetchingParamData={this.props.isFetchingParamData}
              paramFrequencyId={this.props.paramFrequencyId}
              paramYearStart={this.props.paramYearStart}
              paramYearEnd={this.props.paramYearEnd}
            />
          </MDBTabPane>
        </MDBTabContent>
      </MDBCol>
    );
  }
}

export default ParamData;
