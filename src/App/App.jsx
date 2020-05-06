import React from "react";
import {Router} from "react-router-dom";
import {history, Role} from "@/_helpers";
import {authenticationService} from "@/_services";
import {Footer} from "@/_components";
import MRTSLogo from "@/_assets/mrts-logo.png";
import {Provider} from "react-redux";
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
} from "mdbreact";
import {AppRoutes} from "@/Common/AppRoutes";

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
              <MDBRow className="mrts-nav">
                <MDBCol md="12">
                  {currentUser && (
                    <MDBNavbar
                      color="special-color"
                      dark
                      expand="md"
                      fixed="top"
                      scrolling>
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

              <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  closeButton={false}
                  newestOnTop={false}
                  rtl={false}>
              </ToastContainer>

              <AppRoutes />

              {currentUser && <Footer />}
            </MDBContainer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export { App };
