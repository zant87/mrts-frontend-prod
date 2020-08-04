import React from "react";
import { Router } from "react-router-dom";
import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { Footer } from "@/_components";
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
  MDBIcon,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdown,
  MDBDropdownToggle,
  MDBTooltip,
  MDBSideNav,
  MDBSideNavNav,
  MDBSideNavCat, MDBInput, MDBSideNavItem, MDBSideNavLink,
} from "mdbreact";
import {AppRoutes} from "@/Common/AppRoutes";
import config from 'config';
import {Layouts} from "../_helpers/layouts";

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
      isDevMode: config.isLocalDeployment,
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

    authenticationService.currentUserRole.subscribe((x) => {
          if (x.role === Role.Admin)
            this.setState({
              currentUserRole: x,
              isAdmin: x && x.role === Role.Admin,
              isAnalyst: x && x.role === Role.Analyst,
              isOperator: x && x.role === Role.Operator,
              layout: Layouts.adminStructure
            });
          if (x.role === Role.Operator)
            this.setState({
              currentUserRole: x,
              isAdmin: x && x.role === Role.Admin,
              isAnalyst: x && x.role === Role.Analyst,
              isOperator: x && x.role === Role.Operator,
              layout: Layouts.operatorPlan
            });
          if (x.role === Role.Analyst)
            this.setState({
              currentUserRole: x,
              isAdmin: x && x.role === Role.Admin,
              isAnalyst: x && x.role === Role.Analyst,
              isOperator: x && x.role === Role.Operator,
              layout: Layouts.analyst
            });
        }
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

  setLayout = (newLayout) => {

    this.setState({layout: newLayout, toggleStateA: !this.state.toggleStateA});
    console.log('New Layout is', newLayout);

  }

  render() {

    const mainStyle = {
      paddingTop: "5rem"
    };

    const specialCaseNavbarStyles = {
      WebkitBoxOrient: "horizontal",
      flexDirection: "row"
    };

    const {currentUser, fullname, isAdmin, isOperator, isAnalyst, collapseID, currentUserRole, isDevMode, layout} = this.state;

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
                {layout === Layouts.analyst && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/analyst/parameters'>
                          Показатели
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/analyst/indicators'>
                          Индикаторы
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/analyst/levels'>
                          Уровни достижения
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/analyst/dynamics'>
                          Динамика уровней достижения
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/analyst/report'>
                          Отчет перед Правительством
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/analyst/map'>
                          Карта мероприятий
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                    </MDBSideNavNav>
                )}
                {layout === Layouts.adminStructure && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/structure/indicators'>
                          Индикаторы по целям
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/structure/goals'>
                          Дерево целей и задач
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/structure/properties'>
                          Показатели шаблонов проектов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/structure/templates'>
                          Шаблоны карточки проектов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      {/*/admin/structure/templates-items*/}
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/structure/templates-items'>
                          Элементы карточки проектов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      {/*/admin/structure/projects-ext*/}
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/structure/projects-ext'>
                          Отчеты по проектам
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      {/*/admin/structure/formulas*/}
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/structure/formulas'>
                          Формулы расчета индикаторов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                    </MDBSideNavNav>
                )}
                {layout === Layouts.adminControl && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/control/executors'>
                          Реестр исполнителей
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavCat
                          name="Исполнители"
                          id="executors">
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/control/executorsByIndicator'>
                            По индикаторам
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/control/executorsByParameters'>
                            По показателям
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/control/executorsByActivities'>
                            По мероприятиям
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/control/executorsByProjects'>
                            По крупным инвестиционным проектам
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/control/executorsByResource'>
                            По ресурсному обеспечению
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                      </MDBSideNavCat>
                    </MDBSideNavNav>
                )}
                {layout === Layouts.adminLoading && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/loading/reports'>
                          Бланки отчетов исполнителей
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavCat
                          name="Загрузка из АС"
                          id="sync">
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/loading/fromEMISS'>
                            Синхронизация с ЕМИСС
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/loading/fromMDD'>
                            Синхронизация с ФЗ МДФ
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/loading/fromMSTK'>
                            Синхронизация с ФЗ МСТК
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/loading/fromGIBDD'>
                            Синхронизация с ГИБДД
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                      </MDBSideNavCat>
                      <MDBSideNavCat
                          name="Загрузка из файлов"
                          id="file">
                        <MDBSideNavItem>
                          <MDBSideNavLink to='/admin/loading/fromXLSX'>
                            Загрузка из XLSX
                          </MDBSideNavLink>
                        </MDBSideNavItem>
                      </MDBSideNavCat>
                    </MDBSideNavNav>
                )}
                {layout === Layouts.adminArchive && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/archive/parameters'>
                          Архив показателей
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/archive/indicators'>
                          Архив расчета индикаторов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/archive/activities'>
                          Архив выполнений мероприятий
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/admin/archive/projects'>
                          Архив выполнения крупных проектов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                    </MDBSideNavNav>
                )}
                {layout === Layouts.operatorPlan && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/plan/indicators'>
                          Индикаторы
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/plan/activities'>
                          Мероприятия по реализации
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/plan/projects'>
                          Крупные инвестиционные проекты
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/plan/resources'>
                          Ресурсное обеспечение
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                    </MDBSideNavNav>
                )}
                {layout === Layouts.operatorControl && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/control/indicators'>
                          Показателей
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/control/completion'>
                          Расчета индикаторов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/control/activities'>
                          Мероприятий по реализации
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/control/projects'>
                          Крупных инвестиционных проектов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/control/resources'>
                          Ресурсного обеспечения
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/control/indicatorsAgreement'>
                          Согласование индикаторов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                    </MDBSideNavNav>
                )}
                {layout === Layouts.operatorReport && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/report/fact'>
                          Фактические значения показателей
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/report/activities'>
                          Выполнение мероприятий
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/report/projects_master'>
                          Выполнение крупных проектов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      {/*<MDBSideNavItem>*/}
                      {/*  <MDBSideNavLink to='/operator/report/projects_detail'>*/}
                      {/*    Финансирование проектов*/}
                      {/*  </MDBSideNavLink>*/}
                      {/*</MDBSideNavItem>*/}
                      {/*<MDBSideNavItem>*/}
                      {/*  <MDBSideNavLink to='/operator/report/financing'>*/}
                      {/*    Бюджетное финансирование транспорта*/}
                      {/*  </MDBSideNavLink>*/}
                      {/*</MDBSideNavItem>*/}
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/report/appropriations'>
                          Бюджетные ассигнования
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      {/*<MDBSideNavItem>*/}
                      {/*  <MDBSideNavLink to='/operator/report/extrabudget'>*/}
                      {/*    Объемы внебюджетных средств*/}
                      {/*  </MDBSideNavLink>*/}
                      {/*</MDBSideNavItem>*/}
                      {/*<MDBSideNavItem>*/}
                      {/*  <MDBSideNavLink to='/operator/report/sources'>*/}
                      {/*    Источники финансирования*/}
                      {/*  </MDBSideNavLink>*/}
                      {/*</MDBSideNavItem>*/}
                    </MDBSideNavNav>
                )}
                {layout === Layouts.operatorCalculation && (
                    <MDBSideNavNav>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/calculation/intermediate'>
                          Промежуточных значений индикаторов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/calculation/values'>
                          Индикаторов за отчетный период
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                      <MDBSideNavItem>
                        <MDBSideNavLink to='/operator/calculation/levels'>
                          Уровней и динамики достижения индикаторов
                        </MDBSideNavLink>
                      </MDBSideNavItem>
                    </MDBSideNavNav>
                )}
              </MDBSideNav>
              <MDBNavbar double expand="md" fixed="top" scrolling color="special-color" dark>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <div onClick={this.handleToggleClickA}
                         key="sideNavToggleA"
                         className='mr-3'>
                      {/*<img src={MintransLogo} className='logo' alt='Герб'/>*/}
                      <MDBIcon icon="bars" size="2x" className='amber-text'/>
                    </div>
                  </MDBNavItem>
                  <MDBNavItem className="white-text" style={{paddingTop: 5}}>
                    <div className='d-none d-xl-inline'>Мониторинг реализации транспортной стратегии -</div>
                    {' '}
                    {isAnalyst && (<div className='d-none d-lg-inline'>АРМ Аналитика</div>)}
                    {isAdmin && (<div className='d-none d-lg-inline'>АРМ Администратора</div>)}
                    {isOperator && (<div className='d-none d-lg-inline'>АРМ Оператора</div>)}
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right style={specialCaseNavbarStyles}>
                  <MDBNavItem>
                    <MDBTooltip material placement="bottom" clickable>
                      <MDBNavLink to='#'>
                        <MDBIcon icon="user"/> {" "}
                        {/*<div className="d-none d-xl-inline">{fullname}</div>*/}
                      </MDBNavLink>
                      <span>
                        <em>Добро пожаловать,</em><br/><b>{fullname}</b>
                      </span>
                    </MDBTooltip>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBTooltip material placement="bottom" clickable>
                      <MDBNavLink to='#'>
                        <MDBIcon icon="headphones-alt"/> {" "}
                        {/*<div className="d-none d-xl-inline">Поддержка, +7 (495) 380-21-53</div>*/}
                      </MDBNavLink>
                      <span>
                        <em>Поддержка</em><br/><b>+7 (495) 380-21-53</b>
                      </span>
                    </MDBTooltip>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to='/'>
                      <MDBIcon icon="home"/> {" "}
                    </MDBNavLink>
                  </MDBNavItem>
                  {isAdmin && (
                      <React.Fragment>
                        <MDBNavItem>
                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.adminStructure)}>
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
                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.operatorControl)}>
                            Контроль
                          </a>
                        </MDBNavItem>
                        <MDBNavItem>
                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.operatorReport)}>
                            Отчет
                          </a>
                        </MDBNavItem>
                        <MDBNavItem>
                          <a className="nav-link" onClick={(e) => this.setLayout(Layouts.operatorCalculation)}>
                            Расчеты
                          </a>
                        </MDBNavItem>
                      </React.Fragment>
                  )}
                  {isDevMode && (
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
                  )}
                  {isDevMode && (
                      <MDBNavItem>
                        <a className="nav-link">
                          <MDBIcon icon="sign-out-alt" className="d-inline-inline mr-1"/>
                          <div className="d-none d-xl-inline">Выход</div>
                        </a>
                      </MDBNavItem>
                  )}
                  {!isDevMode && (
                      <MDBNavItem>
                        <a className="nav-link" href="https://mrts-test.asutk.ru/logout">
                          <MDBIcon icon="sign-out-alt" className="d-inline-inline mr-1"/>
                          <div className="d-none d-xl-inline">Выход</div>
                        </a>
                      </MDBNavItem>
                  )}
                </MDBNavbarNav>
              </MDBNavbar>
              <main style={mainStyle}>
                <MDBContainer fluid className="mt-1 mb-5">
                  <ToastContainer position="top-right"
                                  autoClose={3000}
                                  closeButton={false}
                                  newestOnTop={false}
                                  className='mr-4'
                                  rtl={false}/>
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
