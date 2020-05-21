import React from "react";
import { Router } from "react-router-dom";
import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { Footer } from "@/_components";
import MRTSLogo from "@/_assets/mrts-logo.png";
import MintransLogo from "@/_assets/logo-mintrans.png";
import { Provider } from "react-redux";
import store from "@/store";
import {
  MDBCol,
  MDBCollapse,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  toast,
  ToastContainer,
  MDBRow,
  MDBIcon,
} from "mdbreact";
import { AppRoutes } from "@/Common/AppRoutes";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false,
      isOperator: false,
      isAnalyst: false,
      collapseID: "",
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin,
        isAnalyst: x && x.role === Role.Analyst,
        isOperator: x && x.role === Role.Operator,
      })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  closeCollapse = (collID) => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: "" });
  };

  render() {
    const { currentUser, isAdmin, isOperator, isAnalyst, collapseID } = this.state;
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <MDBContainer fluid className="app">
              <MDBRow
                style={{ height: "150px" }}
                //className="mrts-nav"
              >
                <MDBCol md="12" style={{ padding: "0px", position: "fixed", zIndex: "9999999" }}>
                  <MDBNavbar
                    color="white"
                    //dark
                    tag="div"
                    light
                    expand="md"
                    //fixed="top"
                    style={{ width: "100%", margin: "0", boxShadow: "none" }}
                    scrolling
                  >
                    <MDBNavbarBrand className="py-0 font-weight-bold">
                      <img src={MintransLogo} style={{ width: "200px", marginRight: "10px", float: "left" }} alt="" />
                      <div style={{ marginLeft: "20px", borderLeft: "1px solid #bfbfbf", float: "left", paddingLeft: "20px" }}>
                        <div>
                          <strong>
                            <span style={{ color: "#000", fontSize: "14px" }}>
                              ИНФОРМАЦИОННО-АНАЛИТИЧЕСКАЯ СИСТЕМА РЕГУЛИРОВАНИЯ НА ТРАНСПОРТЕ
                            </span>
                          </strong>
                        </div>
                        <div>
                          <span style={{ color: "#898989", fontSize: "12px" }}>
                            Мониторинг реализации транспортной стратегии Российской Федерации
                          </span>
                        </div>
                      </div>
                      <div style={{ marginLeft: "50px", float: "left", paddingLeft: "20px" }}>
                        <MDBIcon icon="headphones-alt" size="3x" style={{ color: "#117db0" }} />
                      </div>
                      <div style={{ marginLeft: "20px", float: "left", paddingLeft: "20px", color: "#117db0" }}>
                        <div>
                          <strong>
                            <span style={{ fontSize: "14px" }}>Техническая поддержка</span>
                          </strong>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px" }}>+7 (495) 380-21-53</span>
                        </div>
                      </div>
                    </MDBNavbarBrand>
                  </MDBNavbar>
                  {currentUser && (
                    <MDBNavbar
                      color="special-color"
                      //color="grey lighten-3"
                      dark
                      //light
                      expand="md"
                      //fixed="top"
                      scrolling
                      style={{
                        boxShadow: "none",

                        width: "100%",
                      }}
                    >
                      <MDBNavbarBrand className="py-0 font-weight-bold">
                        <img src={MRTSLogo} style={{ width: "30px", marginRight: "10px" }} alt="" />
                        <strong className="white-text">
                          МР<span style={{ color: "#f28d37" }}>ТС</span>
                        </strong>
                      </MDBNavbarBrand>
                      <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
                      <MDBCollapse id="navbarCollapse" isOpen={collapseID} navbar>
                        <MDBNavbarNav right>
                          <MDBNavItem>
                            <MDBNavLink exact to="/" onClick={this.closeCollapse("navbarCollapse")}>
                              <strong>Главная</strong>
                            </MDBNavLink>
                          </MDBNavItem>
                          {isAdmin && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/admin/structure">
                                <strong>Структура</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAdmin && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/admin/control">
                                <strong>Контроль</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAdmin && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/admin/loading">
                                <strong>Загрузка</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAdmin && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/admin/archive">
                                <strong>Архив</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAnalyst && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/analyst/parameters">
                                <strong>Показатели</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAnalyst && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/analyst/indicators">
                                <strong>Индикаторы</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAnalyst && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/analyst/levels">
                                <strong>Уровни достижения</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAnalyst && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/analyst/dynamics">
                                <strong>Динамика уровней достижения</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAnalyst && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/analyst/report">
                                <strong>Отчет перед правительством</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isAnalyst && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/analyst/map">
                                <strong>Карта мероприятий</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isOperator && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/operator/plan">
                                <strong>Плановые показатели</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isOperator && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/operator/control">
                                <strong>Контроль</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isOperator && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/operator/report">
                                <strong>Отчетные показатели</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          {isOperator && (
                            <MDBNavItem>
                              <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/operator/calculation">
                                <strong>Расчеты</strong>
                              </MDBNavLink>
                            </MDBNavItem>
                          )}
                          <MDBNavItem>
                            <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/swagger">
                              <strong>Swagger</strong>
                            </MDBNavLink>
                          </MDBNavItem>
                          <MDBNavItem>
                            <a className="nav-link" onClick={this.logout}>
                              <strong>Выход</strong>
                            </a>
                          </MDBNavItem>
                        </MDBNavbarNav>
                      </MDBCollapse>
                    </MDBNavbar>
                  )}
                </MDBCol>
              </MDBRow>

              <ToastContainer position="top-right" autoClose={3000} closeButton={false} newestOnTop={false} rtl={false}></ToastContainer>

              <AppRoutes style={{ marginTop: "250px" }} />

              {currentUser && <Footer />}
            </MDBContainer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export { App };
