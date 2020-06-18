import React from "react";
import {Router} from "react-router-dom";
import {history, Role} from "@/_helpers";
import {authenticationService} from "@/_services";
import {Footer} from "@/_components";
import MintransLogo from "@/_assets/logo-mintrans_.png";
import {loadMessages, locale} from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';
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
  MDBIcon,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdown,
  MDBDropdownToggle,
  MDBTooltip,
  MDBSideNav,
  MDBSideNavNav,
  MDBSideNavCat, MDBInput, MDBSideNavItem,
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
      layout: {},
      collapseID: "",
      toggleStateA: false,
      locale: 'ru',
    };

    this.initMessages();
    locale(this.state.locale);

  }

  componentDidMount() {

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

  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA
    });
  };

  initMessages() {
    loadMessages(ruMessages);
  }

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

    const mainStyle = {
      paddingTop: "5rem"
    };

    const specialCaseNavbarStyles = {
      WebkitBoxOrient: "horizontal",
      flexDirection: "row"
    };

    const {currentUser, fullname, isAdmin, isOperator, isAnalyst, collapseID, currentUserRole, isDevMode} = this.state;

    return (
        <Provider store={store}>
          <Router history={history}>
            <React.Fragment>
              <MDBSideNav
                  logo={MintransLogo}
                  triggerOpening={this.state.toggleStateA}
                  color="special-color"
                  mask='light'
                  className='special-color'
                  hidden>
                <li>
                  <ul className="social">
                    <li>
                      <p className='custom-font'>
                        Информационно-Аналитическая Система Регулирования На Транспорте
                      </p>
                    </li>
                  </ul>
                </li>
                <MDBSideNavNav>
                  <MDBSideNavItem>Отчет перед правительством</MDBSideNavItem>
                  <MDBSideNavCat
                      iconRegular
                      name="Instruction"
                      id="instruction-cat"
                      icon="hand-pointer">
                    <MDBSideNavItem>For bloggers</MDBSideNavItem>
                    <MDBSideNavItem>For authors</MDBSideNavItem>
                  </MDBSideNavCat>
                  <MDBSideNavCat name="About" id="about-cat" icon="eye">
                    <MDBSideNavItem>Instruction</MDBSideNavItem>
                    <MDBSideNavItem>Monthly meetings</MDBSideNavItem>
                  </MDBSideNavCat>
                  <MDBSideNavCat
                      name="Contact me"
                      id="contact-me-cat"
                      icon="envelope"
                  >
                    <MDBSideNavItem>FAQ</MDBSideNavItem>
                    <MDBSideNavItem>Write a message</MDBSideNavItem>
                  </MDBSideNavCat>
                </MDBSideNavNav>
              </MDBSideNav>
              <MDBNavbar double expand="md" fixed="top" scrolling color="special-color" dark>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <div onClick={this.handleToggleClickA}
                         key="sideNavToggleA"
                         style={{
                           lineHeight: "32px",
                           marginRight: "1em",
                           verticalAlign: "middle"
                         }}>
                      <MDBIcon icon="bars" size="2x" className='amber-text'/>
                    </div>
                  </MDBNavItem>
                  <MDBNavItem className="white-text" style={{paddingTop: 5}}>
                    <div className='d-none d-xl-inline'>Мониторинг реализации транспортной стратегии -</div>
                    <div className='d-none d-md-inline'>АРМ Аналитика</div>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right style={specialCaseNavbarStyles}>
                  <MDBNavItem>
                    <MDBTooltip material placement="bottom" clickable>
                      <MDBNavLink to='#'>
                        <MDBIcon icon="user" className="mr-1"/>
                      </MDBNavLink>
                      <span>
                        <em>Добро пожаловать, </em><br/><b>%USERNAME%</b>
                      </span>
                    </MDBTooltip>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBTooltip material placement="bottom" clickable>
                      <MDBNavLink to='#'>
                        <MDBIcon icon="headphones-alt" className="mr-1"/>
                      </MDBNavLink>
                      <span>
                        <em>Техническая поддержка</em><br/><b>+7 (495) 380-21-53</b>
                      </span>
                    </MDBTooltip>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">
                      <MDBIcon icon="envelope" className="d-inline-inline"/>{" "}
                      <div className="d-none d-md-inline">Contact</div>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">
                      <MDBIcon far icon="comments" className="d-inline-inline"/>{" "}
                      <div className="d-none d-md-inline">Support</div>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">
                      <MDBIcon icon="с" className="d-inline-inline"/>{" "}
                      <div className="d-none d-md-inline">Account</div>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">Dropdown</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu right>
                        <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBNavbar>
              <main style={mainStyle}>
                <MDBContainer fluid className="mt-5">
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

// export { App };
