import React from "react";
import { Router } from "react-router-dom";
import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { Footer } from "@/_components";
import MRTSLogo from "@/_assets/mrts-logo.png";
import MintransLogo from "@/_assets/logo-mintrans_.png";
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
  MDBIcon, MDBDropdownItem, MDBDropdownMenu, MDBDropdown, MDBDropdownToggle,
} from "mdbreact";
import { AppRoutes } from "@/Common/AppRoutes";
import cookie from 'react-cookies'

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
      isDevMode: (process.env.NODE_ENV !== "production")
    };

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

    // console.log('Данные о пользователе', currentUser);
    // console.log('Роль пользователя', currentUserRole);

    return (
      <Provider store={store}>
        <Router history={history}>
          <div id="test">
            <MDBContainer fluid className="app" onScroll={this.handleScroll}>
              <MDBRow
                style={{ height: this.state.marginTop }}

                //className="mrts-nav"
              >
                <MDBCol md="12" style={{ padding: "0px", position: "fixed", zIndex: "9999999" }}>
                  <MDBContainer fluid style={{ height: "90px", width: "100%", display: this.state.isHeadershow }}>
                    <MDBRow>
                      <MDBCol style={{ fontWeight: "bold", minWidth: "500px", marginTop: "15px" }}>
                        <img src={MintransLogo} style={{ width: "60px", marginRight: "20px", float: "left" }} alt="" />
                        <div style={{ marginLeft: "30px" }}>
                          <strong>
                            <span style={{ color: "#000", fontSize: "12px", letterSpacing: "0.5 pt" }}>
                              ИНФОРМАЦИОННО-АНАЛИТИЧЕСКАЯ СИСТЕМА РЕГУЛИРОВАНИЯ НА ТРАНСПОРТЕ
                            </span>
                          </strong>
                        </div>
                        <div>
                          {isAdmin && (
                              <span style={{ color: "#898989", fontSize: "12px" }}>
                                Мониторинг реализации транспортной стратегии Российской Федерации (АРМ Администратора)
                              </span>
                          )}
                          {isOperator && (
                              <span style={{ color: "#898989", fontSize: "12px" }}>
                                Мониторинг реализации транспортной стратегии Российской Федерации (АРМ Оператора)
                              </span>
                          )}
                          {isAnalyst && (
                              <span style={{ color: "#898989", fontSize: "12px" }}>
                                Мониторинг реализации транспортной стратегии Российской Федерации (АРМ Аналитика)
                              </span>
                          )}
                        </div>
                      </MDBCol>
                      <MDBCol style={{ marginTop: "15px" }}>
                        <MDBContainer style={{ display: this.state.isIconShow }}>
                          <MDBRow>
                            <MDBCol style={{ marginTop: "10px", fontSize: "14px" }}>
                              <div style={{ width: "40px", height: "100%", float: "left" }}>
                                <a onClick={this.logout}>
                                  <MDBIcon icon="user-alt" size="2x" style={{ color: "#117db0", float: "left" }} />
                                </a>
                              </div>
                              <div style={{ display: this.state.isUserShow }}>{fullname}</div>
                            </MDBCol>
                            <MDBCol>
                              <div style={{ float: "right", fontWeight: "bold", display: this.state.isSupportShow }}>
                                <strong>
                                  <span style={{ fontSize: "12px" }}>
                                    <a href="http://support.asutk.ru" style={{ color: "#117db0" }}>
                                      Техническая поддержка
                                    </a>
                                  </span>
                                </strong>
                                <br />
                                <span style={{ fontSize: "12px" }}>+7 (495) 380-21-53</span>
                              </div>
                              <div style={{ width: "40px", height: "100%", float: "right" }}>
                                <a href="http://support.asutk.ru" style={{ color: "#117db0" }}>
                                  <MDBIcon icon="headphones" size="2x" style={{ color: "#117db0", float: "left" }} />
                                </a>
                              </div>
                            </MDBCol>
                          </MDBRow>
                        </MDBContainer>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                  {/* <MDBNavbar
                    color="white"
                    //dark
                    tag="div"
                    light
                    expand="md"
                    //fixed="top"
                    style={{ width: "100%", margin: "0", boxShadow: "none", display: this.state.isHeadershow }}
                    scrolling
                  >
                    <MDBNavbarBrand className="py-0 font-weight-bold" style={{ width: "100%" }}>
                      <div style={{ marginLeft: "10px", float: "left", paddingLeft: "0px" }}>
                        <img src={MintransLogo} style={{ width: "60px", marginRight: "20px", float: "left" }} alt="" />
                        <div style={{ marginLeft: "30px" }}>
                          <strong>
                            <span style={{ color: "#000", fontSize: "12px", letterSpacing: "0.5 pt" }}>
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
                      
                      <div style={{ marginLeft: "10px", float: "right", paddingLeft: "0px", color: "#117db0" }}>
                       
                        <MDBIcon icon="user-alt" size="2x" style={{ color: "#117db0", float: "left" }} />{" "}
                        <div>Добрый день, Фамилия Имя</div>
                        <div>
                          <strong>
                            <span style={{ fontSize: "12px" }}>
                              <a href="http://support.asutk.ru" style={{ color: "#117db0" }}>
                                Техническая поддержка
                              </a>
                            </span>
                          </strong>
                          <br />
                          <span style={{ fontSize: "12px" }}>+7 (495) 380-21-53</span>
                        </div>
                      </div>
                    </MDBNavbarBrand>
                  </MDBNavbar> */}
                  {currentUser && (
                    <MDBNavbar
                      color="special-color"
                      //color="grey lighten-3"
                      dark
                      //light
                      expand="xl"
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
                                    <MDBIcon icon="user" className="mr-1" />
                                  </MDBDropdownToggle>
                                  <MDBDropdownMenu className="dropdown-default" right>
                                    <MDBDropdownItem onClick={this.setAdminRole}>Администратор</MDBDropdownItem>
                                    <MDBDropdownItem onClick={this.setAnalystRole}>Аналитик</MDBDropdownItem>
                                    <MDBDropdownItem onClick={this.setOperatorRole}>Оператор</MDBDropdownItem>
                                  </MDBDropdownMenu>
                                </MDBDropdown>
                              </MDBNavItem>
                          )}

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

              <AppRoutes style={{ marginTop: "100px", height: "100%" }} />

              {currentUser && <Footer />}
            </MDBContainer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export { App };
