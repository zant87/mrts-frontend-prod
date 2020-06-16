import React, { Fragment } from "react";
import { PrivateRoute } from "@/_components";
import HomePage from "@/Common/HomePage";
import { Role } from "@/_helpers";
import AdminStructureNavigation from "@/Admin/Structure/Navigation";
import AdminGoalsPage from "@/Admin/Structure/Goals";
import AdminIndicatorsPage from "@/Admin/Structure/Indicators";
import AdminParametersPage from "@/Admin/Structure/Parameters";
import AdminControlNavigation from "@/Admin/Control/Navigation";
import AdminExecutorsPage from "@/Admin/Control/Executors";
import AdminExecutorsByIndicatorPage from "@/Admin/Control/ExecutorsByIndicators";
import AdminExecutorsByParametersPage from "@/Admin/Control/ExecutorsByParameters";
import AdminExecutorsByActivitiesPage from "@/Admin/Control/ExecutorsByActivities";
import AdminExecutorsByProjectsPage from "@/Admin/Control/ExecutorsByProjects";
import AdminExecutorsByResourcesPage from "@/Admin/Control/ExecutorsByResources";
import AdminLoadingNavigation from "@/Admin/Loading/Navigation";
import AdminArchiveNavigation from "@/Admin/Archive/Navigation";
import AdminArchiveParametersPage from "@/Admin/Archive/Parameters";
import AdminArchiveIndicatorsPage from "@/Admin/Archive/Indicators";
import AdminArchiveProjectsPage from "@/Admin/Archive/Projects";
import AdminArchiveActivitiesPage from "@/Admin/Archive/Activities";
import AnalystParametersPage from "@/Analyst/Parameters/ParametersContainer";
import AnalystIndicatorsPage from "@/Analyst/Indicators/IndicatorsContainer";
import AnalystLevelsPage from "@/Analyst/Levels/LevelsContainer";
import AnalystDynamicsPage from "@/Analyst/Dynamics/DynamicsContainer";
import AnalystMapPage from "@/Analyst/Map";
import OperatorPlanNavigation from "@/Operator/Plan/Navigation";
import OperatorPlanActivitiesPage from "@/Operator/Plan/Activities";
import OperatorPlanProjectsPage from "@/Operator/Plan/Projects";
import OperatorPlanIndicatorsPage from "@/Operator/Plan/Indicators";
import OperatorPlanResourcesPage from "@/Operator/Plan/Resources";
import OperatorControlNavigation from "@/Operator/Control/Navigation";
import OperatorControlIndicatorsPage from "@/Operator/Control/Indicators";
import OperatorControlCompletionPage from "@/Operator/Control/Completion";
import OperatorControlActivitiesPage from "@/Operator/Control/Activities";
import OperatorControlProjectsPage from "@/Operator/Control/Projects";
import OperatorControlResourcesPage from "@/Operator/Control/Resources";
import OperatorReportNavigation from "@/Operator/Report/Navigation";
import OperatorReportActivitiesPage from "@/Operator/Report/Activities";
import OperatorReportSourcesPage from "@/Operator/Report/Sources";
import OperatorPlanResourcesEditPage from "../Operator/Plan/ResourcesEdit";
import OperatorPlanIndicatorsEditPage from "../Operator/Plan/IndicatorsEdit";
import AnalystReportPage from "../Analyst/Reports/Report";
import OperatorReportFactEditPage from "../Operator/Report/FactEdit";
import AdminLoadingDocumentPage from "../Admin/Loading/Document";
import AdminLoadingReportsPage from "../Admin/Loading/Reports";
import AdminLoadingCSVPage from "../Admin/Loading/FromCSV";
import AdminLoadingFromXLSXPage from "../Admin/Loading/FromXLSX";
import AdminLoadingFromEMISSPage from "../Admin/Loading/FromEMISS";
import AdminLoadingFromMDDPage from "../Admin/Loading/FromMDD";
import AdminLoadingFromMSTKPage from "../Admin/Loading/FromMSTK";
import AdminLoadingFromSDMXPage from "../Admin/Loading/FromSDMX";
import OperatorReportActivitiesUpdatePage from "../Operator/Report/ActivitiesUpdate";
import OperatorReportProjectsMasterPage from "../Operator/Report/ProjectsMaster";
import OperatorReportProjectsDetailPage from "../Operator/Report/ProjectsDetail";
import OperatorReportProjectsMasterUpdatePage from "../Operator/Report/ProjectsMasterUpdate";
import OperatorReportProjectsDetailUpdatePage from "../Operator/Report/ProjectsDetailUpdate";
import OperatorReportFinancingUpdatePage from "../Operator/Report/FinancingUpdate";
import OperatorReportAppropriationsUpdatePage from "../Operator/Report/AppropriationsUpdate";
import OperatorReportExtraBudgetUpdatePage from "../Operator/Report/ExtraBudgetUpdate";
import OperatorCalculationIntermediatePage from "../Operator/Calculation/Intermediate";
import OperatorCalculationValuesPage from "../Operator/Calculation/Values";
import OperatorCalculationLevelsPage from "../Operator/Calculation/Levels";
import OperatorCalculationNavigation from "@/Operator/Calculation/Navigation";
import loadable from "react-loadable";
import SwaggerPage from "./Swagger";
import OperatorReportFactTabsPage from "../Operator/Report/FactTabs";
import OperatorReportFinancingTabsPage from "../Operator/Report/FinancingTabs";
import OperatorReportAppropriationsTabsPage from "../Operator/Report/AppropriationsTabs";
import OperatorReportExtraBudgetTabsPage from "../Operator/Report/ExtraBudgetTabs";
import AdminLoadingFromGIBDDPage from "../Admin/Loading/FromGIBDD";

const AsyncAdminStructureNavigation = loadable({
    loader: () => import("../Admin/Structure/Navigation"),
    loading: AdminStructureNavigation,
});

const AsyncAdminStructureGoalsPage = loadable({
    loader: () => import("../Admin/Structure/Goals"),
    loading: AdminGoalsPage,
});

const AsyncAdminStructureIndicatorsPage = loadable({
    loader: () => import("../Admin/Structure/Indicators"),
    loading: AdminIndicatorsPage,
});

const AsyncAdminStructureParametersPage = loadable({
    loader: () => import("../Admin/Structure/Parameters"),
    loading: AdminParametersPage,
});

const AsyncAdminControlNavigation = loadable({
    loader: () => import("../Admin/Control/Navigation"),
    loading: AdminControlNavigation,
});

const AsyncAdminControlExecutorsPage = loadable({
    loader: () => import("../Admin/Control/Executors"),
    loading: AdminExecutorsPage,
});

const AsyncAdminControlExecutorsByActivitiesPage = loadable({
    loader: () => import("../Admin/Control/ExecutorsByActivities"),
    loading: AdminExecutorsByActivitiesPage,
});

const AsyncAdminControlExecutorsByIndicatorPage = loadable({
    loader: () => import("../Admin/Control/ExecutorsByIndicators"),
    loading: AdminExecutorsByIndicatorPage,
});

const AsyncAdminControlExecutorsByParametersPage = loadable({
    loader: () => import("../Admin/Control/ExecutorsByParameters"),
    loading: AdminExecutorsByParametersPage,
});

const AsyncAdminControlExecutorsByProjectsPage = loadable({
    loader: () => import("../Admin/Control/ExecutorsByProjects"),
    loading: AdminExecutorsByProjectsPage,
});

const AsyncAdminControlExecutorsByResourcesPage = loadable({
    loader: () => import("../Admin/Control/ExecutorsByResources"),
    loading: AdminExecutorsByResourcesPage,
});

const AsyncAdminLoadingNavigation = loadable({
    loader: () => import("../Admin/Loading/Navigation"),
    loading: AdminLoadingNavigation,
});

const AsyncAdminLoadingFromEMISSPage = loadable({
    loader: () => import("../Admin/Loading/FromEMISS"),
    loading: AdminLoadingFromEMISSPage,
});

const AsyncAdminLoadingFromMDDPage = loadable({
    loader: () => import("../Admin/Loading/FromMDD"),
    loading: AdminLoadingFromMDDPage,
});

const AsyncAdminLoadingFromMSTKPage = loadable({
    loader: () => import("../Admin/Loading/FromMSTK"),
    loading: AdminLoadingFromMSTKPage,
});

const AsyncAdminLoadingFromSDMXPage = loadable({
    loader: () => import("../Admin/Loading/FromSDMX"),
    loading: AdminLoadingFromSDMXPage,
});

const AsyncAdminLoadingFromXLSXPage = loadable({
    loader: () => import("../Admin/Loading/FromXLSX"),
    loading: AdminLoadingFromXLSXPage,
});

const AsyncAdminLoadingCSVPage = loadable({
    loader: () => import("../Admin/Loading/FromCSV"),
    loading: AdminLoadingCSVPage,
});

const AsyncAdminLoadingReportsPage = loadable({
    loader: () => import("../Admin/Loading/Reports"),
    loading: AdminLoadingReportsPage,
});

const AsyncAdminLoadingDocumentPage = loadable({
    loader: () => import("../Admin/Loading/Document"),
    loading: AdminLoadingDocumentPage,
});

const AsyncAnalystReportPage = loadable({
    loader: () => import("../Analyst/Reports/Report"),
    loading: AnalystReportPage,
});

const AsyncOperatorCalculationNavigation = loadable({
    loader: () => import("../Operator/Calculation/Navigation"),
    loading: OperatorCalculationNavigation,
});

const AsyncOperatorCalculationIntermediatePage = loadable({
    loader: () => import("../Operator/Calculation/Intermediate"),
    loading: OperatorCalculationIntermediatePage,
});

const AsyncOperatorCalculationValuesPage = loadable({
    loader: () => import("../Operator/Calculation/Values"),
    loading: OperatorCalculationValuesPage,
});

const AsyncOperatorCalculationLevelsPage = loadable({
    loader: () => import("../Operator/Calculation/Levels"),
    loading: OperatorCalculationLevelsPage,
});

const AsyncOperatorPlanNavigation = loadable({
    loader: () => import("../Operator/Plan/Navigation"),
    loading: OperatorPlanNavigation,
});

const AsyncOperatorPlanActivitiesPage = loadable({
    loader: () => import("../Operator/Plan/Activities"),
    loading: OperatorPlanActivitiesPage,
});

const AsyncOperatorPlanProjectsPage = loadable({
    loader: () => import("../Operator/Plan/Projects"),
    loading: OperatorPlanProjectsPage,
});

const AsyncOperatorPlanIndicatorsPage = loadable({
    loader: () => import("../Operator/Plan/Indicators"),
    loading: OperatorPlanIndicatorsPage,
});

const AsyncOperatorPlanResourcesPage = loadable({
    loader: () => import("../Operator/Plan/Resources"),
    loading: OperatorPlanResourcesPage,
});

const AsyncOperatorPlanResourcesEditPage = loadable({
    loader: () => import("../Operator/Plan/ResourcesEdit"),
    loading: OperatorPlanResourcesEditPage,
});

const AsyncOperatorPlanIndicatorsEditPage = loadable({
    loader: () => import("../Operator/Plan/IndicatorsEdit"),
    loading: OperatorPlanIndicatorsEditPage,
});

export const AppRoutes = () => {
    return (
        <Fragment>
            {/* Администратор*/}
            {/*Structure - Настройка структуры*/}
            <PrivateRoute exact path="/admin/structure" roles={Role.Admin} component={AsyncAdminStructureNavigation} />
            <PrivateRoute exact path="/admin/structure/goals" roles={Role.Admin} component={AsyncAdminStructureGoalsPage} />
            <PrivateRoute exact path="/admin/structure/indicators" roles={Role.Admin} component={AsyncAdminStructureIndicatorsPage} />
            <PrivateRoute exact path="/admin/structure/params" roles={Role.Admin} component={AsyncAdminStructureParametersPage} />

            {/*Control - Настройка контроля*/}
            <PrivateRoute exact path="/admin/control" roles={Role.Admin} component={AsyncAdminControlNavigation} />
            <PrivateRoute exact path="/admin/control/executors" roles={Role.Admin} component={AsyncAdminControlExecutorsPage} />
            <PrivateRoute exact path="/admin/control/executorsByIndicator" roles={Role.Admin} component={AsyncAdminControlExecutorsByIndicatorPage}/>
            <PrivateRoute exact path="/admin/control/executorsByParameters" roles={Role.Admin} component={AsyncAdminControlExecutorsByParametersPage}/>
            <PrivateRoute exact path="/admin/control/executorsByActivities" roles={Role.Admin} component={AsyncAdminControlExecutorsByActivitiesPage}/>
            <PrivateRoute exact path="/admin/control/executorsByProjects" roles={Role.Admin} component={AsyncAdminControlExecutorsByProjectsPage}/>
            <PrivateRoute exact path="/admin/control/executorsByResource" roles={Role.Admin} component={AsyncAdminControlExecutorsByResourcesPage}/>

            {/*Loading - Загрузка из АС и файлов*/}
            <PrivateRoute exact path="/admin/loading" roles={Role.Admin} component={AsyncAdminLoadingNavigation} />
            <PrivateRoute exact path="/admin/loading/fromEMISS" roles={Role.Admin} component={AsyncAdminLoadingFromEMISSPage} />
            <PrivateRoute exact path="/admin/loading/fromMDD" roles={Role.Admin} component={AsyncAdminLoadingFromMDDPage} />
            <PrivateRoute exact path="/admin/loading/fromMSTK" roles={Role.Admin} component={AsyncAdminLoadingFromMSTKPage} />
            <PrivateRoute exact path="/admin/loading/fromSDMX" roles={Role.Admin} component={AsyncAdminLoadingFromSDMXPage} />
            <PrivateRoute exact path="/admin/loading/fromXLSX" roles={Role.Admin}
                          component={AsyncAdminLoadingFromXLSXPage}/>
            <PrivateRoute exact path="/admin/loading/fromGIBDD" roles={Role.Admin}
                          component={AdminLoadingFromGIBDDPage}/>
            <PrivateRoute exact path="/admin/loading/fromCSV" roles={Role.Admin} component={AsyncAdminLoadingCSVPage}/>
            <PrivateRoute exact path="/admin/loading/reports" roles={Role.Admin}
                          component={AsyncAdminLoadingReportsPage}/>
            <PrivateRoute exact path="/admin/loading/document" roles={Role.Admin} component={AdminLoadingDocumentPage}/>
            {/*AdminLoadingDocumentPage*/}

            {/*Archive - Архив */}
            <PrivateRoute exact path="/admin/archive" roles={Role.Admin} component={AdminArchiveNavigation} />
            <PrivateRoute exact path="/admin/archive/parameters" roles={Role.Admin} component={AdminArchiveParametersPage} />
            <PrivateRoute exact path="/admin/archive/indicators" roles={Role.Admin} component={AdminArchiveIndicatorsPage} />
            <PrivateRoute exact path="/admin/archive/activities" roles={Role.Admin} component={AdminArchiveActivitiesPage} />
            <PrivateRoute exact path="/admin/archive/projects" roles={Role.Admin} component={AdminArchiveProjectsPage} />

            {/* Аналитик */}
            {/* <PrivateRoute path="/analyst/indicators/:indId?" roles={Role.Analyst} render={props => <AnalystIndicatorsPage {...props} />} /> */}
            <PrivateRoute path="/analyst/parameters/:paramId?" roles={Role.Analyst} component={AnalystParametersPage} />
            <PrivateRoute path="/analyst/indicators/:indId?" roles={Role.Analyst} component={AnalystIndicatorsPage} />
            <PrivateRoute exact path="/analyst/levels" roles={Role.Analyst} component={AnalystLevelsPage} />
            <PrivateRoute exact path="/analyst/dynamics" roles={Role.Analyst} component={AnalystDynamicsPage} />
            <PrivateRoute exact path="/analyst/report" roles={Role.Analyst} component={AsyncAnalystReportPage} />
            <PrivateRoute exact path="/analyst/map" roles={Role.Analyst} component={AnalystMapPage} />

            {/* Оператор */}
            {/*Plan - Плановые показатели */}
            <PrivateRoute exact path="/operator/plan" roles={Role.Operator} component={AsyncOperatorPlanNavigation} />
            <PrivateRoute exact path="/operator/plan/activities" roles={Role.Operator} component={AsyncOperatorPlanActivitiesPage} />
            <PrivateRoute exact path="/operator/plan/projects" roles={Role.Operator} component={AsyncOperatorPlanProjectsPage} />
            <PrivateRoute exact path="/operator/plan/indicators" roles={Role.Operator} component={AsyncOperatorPlanIndicatorsPage} />
            <PrivateRoute exact path="/operator/plan/resources" roles={Role.Operator} component={AsyncOperatorPlanResourcesPage} />
            <PrivateRoute exact path="/operator/plan/resources/:id" roles={Role.Operator} component={AsyncOperatorPlanResourcesEditPage} />
            <PrivateRoute exact path="/operator/plan/indicators/:id" roles={Role.Operator} component={AsyncOperatorPlanIndicatorsEditPage} />

            {/*Control - Контроль */}
            <PrivateRoute exact path="/operator/control" roles={Role.Operator} component={OperatorControlNavigation}/>
            <PrivateRoute exact path="/operator/control/indicators" roles={Role.Operator}
                          component={OperatorControlIndicatorsPage}/>
            <PrivateRoute exact path="/operator/control/completion" roles={Role.Operator}
                          component={OperatorControlCompletionPage}/>
            <PrivateRoute exact path="/operator/control/activities" roles={Role.Operator}
                          component={OperatorControlActivitiesPage}/>
            <PrivateRoute exact path="/operator/control/projects" roles={Role.Operator}
                          component={OperatorControlProjectsPage}/>
            <PrivateRoute exact path="/operator/control/resources" roles={Role.Operator}
                          component={OperatorControlResourcesPage}/>

            {/*Report - Отчетные показатели */}
            <PrivateRoute exact path="/operator/report" roles={Role.Operator} component={OperatorReportNavigation}/>
            <PrivateRoute exact path="/operator/report/fact" roles={Role.Operator}
                          component={OperatorReportFactTabsPage}/>
            {/*<PrivateRoute exact path="/operator/report/fact" roles={Role.Operator} component={OperatorReportFactPage} />*/}
            <PrivateRoute exact path="/operator/report/fact/:id" roles={Role.Operator}
                          component={OperatorReportFactEditPage}/>

            <PrivateRoute exact path="/operator/report/activities" roles={Role.Operator}
                          component={OperatorReportActivitiesPage}/>
            <PrivateRoute exact path="/operator/report/activities/:id" roles={Role.Operator}
                          component={OperatorReportActivitiesUpdatePage}/>

            <PrivateRoute exact path="/operator/report/projects_master" roles={Role.Operator}
                          component={OperatorReportProjectsMasterPage}/>
            <PrivateRoute exact path="/operator/report/projects_master/:id" roles={Role.Operator}
                          component={OperatorReportProjectsMasterUpdatePage}/>

            <PrivateRoute exact path="/operator/report/projects_detail" roles={Role.Operator}
                          component={OperatorReportProjectsDetailPage}/>
            <PrivateRoute exact path="/operator/report/projects_detail/:id" roles={Role.Operator}
                          component={OperatorReportProjectsDetailUpdatePage}/>

            <PrivateRoute exact path="/operator/report/financing" roles={Role.Operator}
                          component={OperatorReportFinancingTabsPage}/>
            <PrivateRoute exact path="/operator/report/financing/:id" roles={Role.Operator}
                          component={OperatorReportFinancingUpdatePage}/>

            <PrivateRoute exact path="/operator/report/appropriations" roles={Role.Operator}
                          component={OperatorReportAppropriationsTabsPage}/>
            <PrivateRoute exact path="/operator/report/appropriations/:id" roles={Role.Operator}
                          component={OperatorReportAppropriationsUpdatePage}/>

            <PrivateRoute exact path="/operator/report/extraBudget" roles={Role.Operator}
                          component={OperatorReportExtraBudgetTabsPage}/>
            <PrivateRoute exact path="/operator/report/extraBudget/:id" roles={Role.Operator}
                          component={OperatorReportExtraBudgetUpdatePage}/>

            <PrivateRoute exact path="/operator/report/sources" roles={Role.Operator}
                          component={OperatorReportSourcesPage}/>

            {/*Calculation - Отчетные показатели */}
            <PrivateRoute exact path="/operator/calculation" roles={Role.Operator}
                          component={AsyncOperatorCalculationNavigation}/>
            <PrivateRoute exact path="/operator/calculation/intermediate" roles={Role.Operator}
                          component={AsyncOperatorCalculationIntermediatePage}/>
            <PrivateRoute exact path="/operator/calculation/values" roles={Role.Operator}
                          component={AsyncOperatorCalculationValuesPage}/>
            <PrivateRoute exact path="/operator/calculation/levels" roles={Role.Operator}
                          component={AsyncOperatorCalculationLevelsPage}/>

            {/*Общие страницы*/}
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute exact path="/operator" component={HomePage}/>
            <PrivateRoute exact path="/analyst" component={HomePage} />
            <PrivateRoute exact path="/admin" component={HomePage} />
            <PrivateRoute exact path="/swagger" component={SwaggerPage} />
        </Fragment>
    );
};
