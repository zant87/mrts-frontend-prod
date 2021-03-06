import React from "react";
import {MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon} from
        "mdbreact";
import OperatorReportFactPage from "./Fact/FactTable";
import OperatorReportFactPivotPage from "./Fact/FactPivot";

class OperatorReportFactTabsPage extends React.Component {

    state = {
        activeItemJustified: "1"
    }

    toggleJustified = tab => e => {
        if (this.state.activeItemJustified !== tab) {
            this.setState({
                activeItemJustified: tab
            });
        }
    };

    render() {
        return (
            <MDBContainer fluid>
                <MDBRow between>
                    <MDBCol md={'12'} className='my-0 mx-auto'>
                        <MDBNav className="nav-tabs special-color my-3" tabs>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={this.state.activeItemJustified === "1"}
                                            onClick={this.toggleJustified("1")} role="tab">
                                    <MDBIcon icon="table" size="1x"/>&nbsp;&nbsp;Корректировка
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={this.state.activeItemJustified === "2"}
                                            onClick={this.toggleJustified("2")} role="tab">
                                    <MDBIcon icon="tablet-alt" size="1x"/>&nbsp;&nbsp;Просмотр
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol md={'12'} className='my-3 mx-auto'>
                        <MDBTabContent
                            className="card"
                            activeItem={this.state.activeItemJustified}>
                            <MDBTabPane tabId="1" role="tabpanel">
                                {this.state.activeItemJustified === "1" && (
                                    <OperatorReportFactPage/>
                                )}
                            </MDBTabPane>
                            <MDBTabPane tabId="2" role="tabpanel">
                                {this.state.activeItemJustified === "2" && (
                                    <OperatorReportFactPivotPage/>
                                )}
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default OperatorReportFactTabsPage;
