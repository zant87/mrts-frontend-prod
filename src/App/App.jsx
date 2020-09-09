import React from "react";
import { Router } from "react-router-dom";
import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import MintransLogo from "@/_assets/logo-mintrans_.png";
import { loadMessages, locale } from "devextreme/localization";
import ruMessages from "devextreme/localization/messages/ru.json";
import { Provider } from "react-redux";
import store from "@/store";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  toast,
  ToastContainer,
  MDBIcon,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdown,
  MDBDropdownToggle,
  MDBTooltip,
  MDBSideNav,
} from "mdbreact";
import { AppRoutes } from "@/Common/AppRoutes";
import config from "config";
import { Layouts } from "../_helpers/layouts";
import SideNav from "../Common/SideNav";
import {Footer} from "../Common/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fullname: "",
      isAdmin: false,
      isOperator: false,
      isAnalyst: false,
      layout: {},
      collapseID: "",
      toggleStateA: false,
      isDevMode: config.isLocalDeployment,
      locale: "ru",
    };

    this.initMessages();
    locale(this.state.locale);
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
        this.setState({
            currentUser: x,
            fullname: x.fullname,
        })
    );

    authenticationService.currentUserRole.subscribe((x) => {
      if (x.role === Role.Admin)
        this.setState({
          currentUserRole: x,
          isAdmin: x && x.role === Role.Admin,
          isAnalyst: x && x.role === Role.Analyst,
          isOperator: x && x.role === Role.Operator,
          layout: Layouts.adminStructure,
        });
      if (x.role === Role.Operator)
        this.setState({
          currentUserRole: x,
          isAdmin: x && x.role === Role.Admin,
          isAnalyst: x && x.role === Role.Analyst,
          isOperator: x && x.role === Role.Operator,
          layout: Layouts.operatorPlan,
        });
      if (x.role === Role.Analyst)
        this.setState({
          currentUserRole: x,
          isAdmin: x && x.role === Role.Admin,
          isAnalyst: x && x.role === Role.Analyst,
          isOperator: x && x.role === Role.Operator,
          layout: Layouts.analyst,
        });
    });
  }

  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA,
    });
  };

  initMessages() {
    loadMessages(ruMessages);
  }

  setAdminRole = () => {
    authenticationService.setRole(Role.Admin);
  };

  setOperatorRole = () => {
    authenticationService.setRole(Role.Operator);
  };

  setAnalystRole = () => {
    authenticationService.setRole(Role.Analyst);
  };

  setLayout = (newLayout) => {
    this.setState({ layout: newLayout, toggleStateA: !this.state.toggleStateA });
    console.log("New Layout is", newLayout);
  };

  render() {

      const mainStyle = {
          paddingTop: "5rem",
      };

      const specialCaseNavbarStyles = {
          WebkitBoxOrient: "horizontal",
          flexDirection: "row",
      };

      const {currentUser, fullname, isAdmin, isOperator, isAnalyst, isDevMode, layout} = this.state;

      let exitLinks =
          <MDBNavItem>
              <a className="nav-link" href="https://mrts-test.asutk.ru/logout">
                  <MDBIcon icon="sign-out-alt" className="d-inline-inline mr-1"/>
                  <div className="d-none d-xl-inline">Выход</div>
              </a>
          </MDBNavItem>;

      if (isDevMode) {
          exitLinks =
              <React.Fragment>
                  <MDBNavItem>
                      <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                              <MDBIcon icon="user-check" className="d-inline-inline mr-1"/>
                              <div className="d-none d-xl-inline">Роли</div>
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="dropdown-default" right>
                              <MDBDropdownItem onClick={this.setAdminRole}>Администратор</MDBDropdownItem>
                              <MDBDropdownItem onClick={this.setAnalystRole}>Аналитик</MDBDropdownItem>
                              <MDBDropdownItem onClick={this.setOperatorRole}>Оператор</MDBDropdownItem>
                          </MDBDropdownMenu>
                      </MDBDropdown>
                  </MDBNavItem>
                  <MDBNavItem>
                      <a className="nav-link">
                          <MDBIcon icon="sign-out-alt" className="d-inline-inline mr-1"/>
                          <div className="d-none d-xl-inline">Выход</div>
                      </a>
                  </MDBNavItem>
              </React.Fragment>
      }

      return (
          <Provider store={store}>
              <Router history={history}>
                  <React.Fragment>
                      <MDBSideNav
                          logo={MintransLogo}
                          triggerOpening={this.state.toggleStateA}
                          color="special-color"
                          mask="light"
                          className="special-color"
                          href="#!"
                          hidden
                          >
                          <li>
                              <ul className="social">
                                  <li>
                                      <p className="custom-font">Информационно-аналитическая система регулирования на
                                          транспорте</p>
                                  </li>
                              </ul>
                          </li>
                          <SideNav layout={layout}/>
                      </MDBSideNav>
                      <MDBNavbar double expand="md" fixed="top" scrolling color="special-color" dark>
                          <MDBNavbarNav left>
                              <MDBNavItem>
                                  <div onClick={this.handleToggleClickA} key="sideNavToggleA" className="mr-3">
                                      {/*<img src={MintransLogo} className='logo' alt='Герб'/>*/}
                                      <MDBIcon icon="bars" size="2x" className="amber-text"/>
                                  </div>
                              </MDBNavItem>
                              <MDBNavItem className="white-text" style={{paddingTop: 5}}>
                                  <div className="d-none d-xl-inline">Мониторинг реализации транспортной стратегии -
                                  </div>
                                  {" "}
                                  {isAnalyst && <div className="d-none d-lg-inline">АРМ Аналитика</div>}
                                  {isAdmin && <div className="d-none d-lg-inline">АРМ Администратора</div>}
                                  {isOperator && <div className="d-none d-lg-inline">АРМ Оператора</div>}
                              </MDBNavItem>
                          </MDBNavbarNav>
                          <MDBNavbarNav right style={specialCaseNavbarStyles}>
                              <MDBNavItem>
                                  <MDBTooltip material placement="bottom" clickable>
                                      <MDBNavLink to="#">
                                          <MDBIcon
                                              icon="user"/> {/*<div className="d-none d-xl-inline">{fullname}</div>*/}
                                      </MDBNavLink>
                                      <span>
                      <em>Добро пожаловать,</em>
                      <br/>
                      <b>{fullname}</b>
                    </span>
                                  </MDBTooltip>
                              </MDBNavItem>
                              <MDBNavItem>
                                  <MDBTooltip material placement="bottom" clickable>
                                      <MDBNavLink to="#">
                                          <MDBIcon
                                              icon="headphones-alt"/> {/*<div className="d-none d-xl-inline">Поддержка, +7 (495) 380-21-53</div>*/}
                                      </MDBNavLink>
                                      <span>
                      <em>Поддержка</em>
                      <br/>
                      <b>+7 (495) 380-21-53</b>
                    </span>
                                  </MDBTooltip>
                              </MDBNavItem>
                              <MDBNavItem>
                                  <MDBNavLink to="/">
                                      <MDBIcon icon="home"/>{" "}
                                  </MDBNavLink>
                              </MDBNavItem>
                              {isAdmin && (
                                  <React.Fragment>
                                      <MDBNavItem>
                                          <a className="nav-link"
                                             onClick={(e) => this.setLayout(Layouts.adminStructure)}>
                                              Структура
                                          </a>
                                      </MDBNavItem>
                                      <MDBNavItem>
                                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.adminControl)}>
                                              Контроль
                                          </a>
                                      </MDBNavItem>
                                      <MDBNavItem>
                                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.adminLoading)}>
                                              Загрузка
                                          </a>
                                      </MDBNavItem>
                                      <MDBNavItem>
                                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.adminArchive)}>
                                              Архив
                                          </a>
                                      </MDBNavItem>
                                  </React.Fragment>
                              )}
                              {isOperator && (
                                  <React.Fragment>
                                      <MDBNavItem>
                                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.operatorPlan)}>
                                              План
                                          </a>
                                      </MDBNavItem>
                                      <MDBNavItem>
                                          <a className="nav-link"
                                             onClick={(e) => this.setLayout(Layouts.operatorControl)}>
                                              Контроль
                                          </a>
                                      </MDBNavItem>
                                      <MDBNavItem>
                                          <a className="nav-link"
                                             onClick={(e) => this.setLayout(Layouts.operatorReport)}>
                                              Отчет
                                          </a>
                                      </MDBNavItem>
                                      <MDBNavItem>
                                          <a className="nav-link"
                                             onClick={(e) => this.setLayout(Layouts.operatorCalculation)}>
                                              Расчеты
                                          </a>
                                      </MDBNavItem>
                                  </React.Fragment>
                              )}
                              {exitLinks}
                          </MDBNavbarNav>
                      </MDBNavbar>
                      <main style={mainStyle}>
                          <MDBContainer fluid className="mt-1 mb-5">
                              <ToastContainer position="top-right" autoClose={3000} closeButton={false}
                                              newestOnTop={false} className="mr-4" rtl={false}/>
                              <AppRoutes/>
                          </MDBContainer>
                      </main>
                      {currentUser && <Footer/>}
                  </React.Fragment>
              </Router>
          </Provider>
    );
  }
}

export { App };
