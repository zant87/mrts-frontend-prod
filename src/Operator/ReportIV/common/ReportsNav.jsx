import React, { Component } from 'react';
import {MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from "mdbreact";

// const ReportsNav = (props) => {
export default class extends React.Component {
  render() {
        return (
            <MDBContainer fluid>
             <MDBNav className="nav-tabs mt-5 special-color" tabs color="blue-grey" >
                              <MDBNavItem>
                                <MDBNavLink link to="#" active={this.props.activeItem === "1"} onClick={this.props.onHandleToggle("1")} role="tab" >
                                  <MDBIcon icon="table" size="1x" />&nbsp;&nbsp;Корректировка
                                </MDBNavLink>
                              </MDBNavItem>
                              <MDBNavItem>
                                <MDBNavLink link to="#" active={this.props.activeItem === "2"} onClick={this.props.onHandleToggle("2")} role="tab" >
                                  <MDBIcon icon="tablet-alt" size="1x" />&nbsp;&nbsp;Просмотр
                                </MDBNavLink>
                              </MDBNavItem>
                            </MDBNav>
            </MDBContainer>
        );
  }
};

// export default ReportsNav;