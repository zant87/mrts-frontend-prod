import React from "react";
import { Router } from "react-router-dom";
import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { Footer } from "@/_components";
import MRTSLogo from "@/_assets/mrts-logo.png";
import MintransLogo from "@/_assets/logo-mintrans_.png";

import { loadMessages, locale } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';

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
  MDBIcon, MDBDropdownItem, MDBDropdownMenu, MDBDropdown, MDBDropdownToggle, MDBTooltip,
} from "mdbreact";
import {AppRoutes} from "@/Common/AppRoutes";
import config from 'config';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fullname: '',
      isAdmin: false,
      isOperator: false,
      isAnalyst: false,
      collapseID: "",
      isHeadershow: "block",
      marginTop: "160px",
      isUserShow: "block",
      isSupportShow: "block",
      isIconShow: "block",
      // isDevMode: (process.env.NODE_ENV !== "production")
      isDevMode: config.isLocalDeployment,
      locale: 'ru',
    };

    this.initMessages();
    locale(this.state.locale);
    
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    if (window.innerWidth < 1000) {
      this.setState({
        isUserShow: "none",
        isSupportShow: "none",
      });
    }
    if (window.innerWidth < 700) {
      //alert();
      this.setState({
        isIconShow: "none",
      });
    }
    if (window.innerWidth > 1000) {
      this.setState({
        isUserShow: "block",
        isSupportShow: "block",
        isIconShow: "block",
      });
    }    

    authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x,
        fullname: x.fullname
      })
    );

    authenticationService.currentUserRole.subscribe((x) =>
        this.setState({
          currentUserRole: x,
          isAdmin: x && x.role === Role.Admin,
          isAnalyst: x && x.role === Role.Analyst,
          isOperator: x && x.role === Role.Operator,
        })
    );

  }

  getLocale() {
    const locale = sessionStorage.getItem('locale');
    return locale != null ? locale : 'en';
  }

  setLocale(locale) {
    sessionStorage.setItem('locale', locale);
  }

  initMessages() {
    loadMessages(ruMessages);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScroll);
  }

  logout() {
    // authenticationService.logout();
    // history.push("/login");
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

  handleResize = () => {
    if (window.innerWidth < 1000) {
      this.setState({
        isUserShow: "none",
        isSupportShow: "none",
      });
    }
    if (window.innerWidth < 700) {
      //alert();
      this.setState({
        isIconShow: "none",
      });
    }
    if (window.innerWidth > 1000) {
      this.setState({
        isUserShow: "block",
        isSupportShow: "block",
        isIconShow: "block",
      });
    }
  };

  handleScroll = (e) => {
    if (window.scrollY > 10) {
      this.setState({
        isHeadershow: "none",
        marginTop: "90px",
      });
    } else {
      this.setState({
        isHeadershow: "block",
        marginTop: "160px",
      });
    }
  };

  setAdminRole = () => {
    authenticationService.setRole(Role.Admin);
  }

  setOperatorRole = () => {
    authenticationService.setRole(Role.Operator);
  }

  setAnalystRole = () => {
    authenticationService.setRole(Role.Analyst);
  }

  render() {
    const { currentUser, fullname, isAdmin, isOperator, isAnalyst, collapseID, currentUserRole, isDevMode } = this.state;

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
                        <img src={MintransLogo} style={{ width: "45px", marginRight: "10px" }} alt="" />
                        <strong className="white-text">МРТС РФ</strong>
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

                          {isDevMode && (
                          <MDBNavItem>
                            <MDBNavLink onClick={this.closeCollapse("navbarCollapse")} to="/swagger">
                              <strong>Swagger</strong>
                            </MDBNavLink>
                          </MDBNavItem>
                          )}

                          {isDevMode && (
                              <MDBNavItem>
                                <MDBDropdown>
                                  <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="user" className="mr-1"/>
                                  </MDBDropdownToggle>
                                  <MDBDropdownMenu className="dropdown-default" right>
                                    <MDBDropdownItem onClick={this.setAdminRole}>Администратор</MDBDropdownItem>
                                    <MDBDropdownItem onClick={this.setAnalystRole}>Аналитик</MDBDropdownItem>
                                    <MDBDropdownItem onClick={this.setOperatorRole}>Оператор</MDBDropdownItem>
                                  </MDBDropdownMenu>
                                </MDBDropdown>
                              </MDBNavItem>
                          )}

                          <MDBNavItem>
                            <MDBTooltip material placement="bottom" clickable>
                              <MDBNavLink to='#'>
                                <MDBIcon icon="headphones-alt" className="mr-1" />
                              </MDBNavLink>
                              <span>
                                <em>Техническая поддержка</em><br/><b>+7 (495) 380-21-53</b>
                              </span>
                            </MDBTooltip>
                          </MDBNavItem>

                          {isDevMode && (
                          <MDBNavItem>
                            <a className="nav-link" href="#">
                              <strong>Выход</strong>
                            </a>
                          </MDBNavItem>
                          )}

                          {!isDevMode && (
                              <MDBNavItem>
                                <a className="nav-link" href="https://mrts-test.asutk.ru/logout">
                                  <strong>Выход</strong>
                                </a>
                              </MDBNavItem>
                          )}

                        </MDBNavbarNav>
                      </MDBCollapse>
                    </MDBNavbar>
                  )}
                </MDBCol>
              </MDBRow>

              <ToastContainer position="top-right" autoClose={3000} closeButton={false} newestOnTop={false} rtl={false}></ToastContainer>

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
