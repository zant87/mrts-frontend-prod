import { Layouts } from "../_helpers/layouts";

export const sideNavLinks = [
  {
    link: "/analyst/parameters",
    text: "Показатели",
    layout: Layouts.analyst,
  },
  {
    link: "/analyst/indicators",
    text: "Индикаторы",
    layout: Layouts.analyst,
  },
  {
    link: "/analyst/levels",
    text: "Уровни достижения",
    layout: Layouts.analyst,
  },
  {
    link: "/analyst/dynamics",
    text: "Динамика уровней достижения",
    layout: Layouts.analyst,
  },
  {
    link: "/analyst/budgetlevels",
    text: "Ресурсное обеспечение и уровни достижения",
    layout: Layouts.analyst,
  },
  {
    link: "/analyst/report",
    text: "Отчет перед Правительством Российской Федерации",
    layout: Layouts.analyst,
  },
  {
    link: "/analyst/map",
    text: "Карта мероприятий",
    layout: Layouts.analyst,
  },

  {
    link: "/analyst/indschemevalues",
    text: "Схема индикаторов по целям",
    layout: Layouts.analyst,
  },
  {
    link: "/admin/structure/indicators",
    text: "Индикаторы по целям",
    layout: Layouts.adminStructure,
  },
  {
    link: "/admin/structure/goals",
    text: "Дерево целей и задач",
    layout: Layouts.adminStructure,
  },
  {
    link: "/admin/structure/properties",
    text: "Показатели шаблонов проектов",
    layout: Layouts.adminStructure,
  },
  {
    link: "/admin/structure/templates",
    text: "Шаблоны карточки проектов",
    layout: Layouts.adminStructure,
  },
  {
    link: "/admin/structure/templates-items",
    text: "Элементы карточки проектов",
    layout: Layouts.adminStructure,
  },
  // {
  //   link: "/admin/structure/projects-ext",
  //   text: "Отчеты по проектам",
  //   layout: Layouts.adminStructure,
  // },
  {
    link: "/admin/structure/formulas",
    text: "Формулы расчета индикаторов",
    layout: Layouts.adminStructure,
  },
  {
    link: "/admin/structure/weights",
    text: "Веса индикаторов",
    layout: Layouts.adminStructure,
  },
  {
    link: "/admin/structure/ts",
    text: "Версии ТС",
    layout: Layouts.adminStructure,
  },
  {
    link: "/admin/control/executors",
    text: "Реестр исполнителей",
    layout: Layouts.adminControl,
  },
  {
    link: "/admin/control/executorsByIndicator",
    text: "Исполнители по индикаторам",
    layout: Layouts.adminControl,
  },
  {
    link: "/admin/control/emiss",
    text: "Контактные данные ЕМИСС",
    layout: Layouts.adminControl,
  },
  {
    link: "/admin/loading/reportsList",
    text: "Бланки отчетов исполнителей",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/fromEMISS",
    text: "Синхронизация с ЕМИСС",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/fromMDD",
    text: "Синхронизация с ФЗ МДХ",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/fromMSTK",
    text: "Синхронизация с ФЗ МПИ",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/fromGIBDD",
    text: "Синхронизация с ГИБДД",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/fromXLSX",
    text: "Загрузка показателей",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/resourcesFromXLSX",
    text: "Загрузка ресурсного обеспечения",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/activitiesFromXLSX",
    text: "Загрузка мероприятий",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/formulas",
    text: "Загрузка формул",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/loading/copyProjects",
    text: "Обновить данные карточек инвестпроектов",
    layout: Layouts.adminLoading,
  },
  {
    link: "/admin/archive/parameters",
    text: "Архив показателей",
    layout: Layouts.adminArchive,
  },
  {
    link: "/admin/archive/indicators",
    text: "Архив расчета индикаторов",
    layout: Layouts.adminArchive,
  },
  {
    link: "/admin/archive/activities",
    text: "Архив мероприятий по реализации ТС",
    layout: Layouts.adminArchive,
  },
  {
    link: "/admin/archive/projects",
    text: "Архив крупных инвестпроектов",
    layout: Layouts.adminArchive,
  },
  {
    link: "/operator/plan/indicators",
    text: "Индикаторы",
    layout: Layouts.operatorPlan,
  },
  {
    link: "/operator/plan/activities",
    text: "Мероприятия по реализации",
    layout: Layouts.operatorPlan,
  },
  {
    link: "/operator/plan/projects",
    text: "Крупные инвестиционные проекты",
    layout: Layouts.operatorPlan,
  },
  {
    link: "/operator/plan/resources",
    text: "Ресурсное обеспечение",
    layout: Layouts.operatorPlan,
  },
  {
    link: "/operator/control/indicators",
    text: "Контроль показателей",
    layout: Layouts.operatorControl,
  },
  {
    link: "/operator/control/completion",
    text: "Контроль расчета индикаторов",
    layout: Layouts.operatorControl,
  },
  {
    link: "/operator/control/activities",
    text: "Контроль мероприятий по реализации",
    layout: Layouts.operatorControl,
  },
  {
    link: "/operator/control/projects",
    text: "Контроль крупных инвестиционных проектов",
    layout: Layouts.operatorControl,
  },
  {
    link: "/operator/control/resources",
    text: "Контроль ресурсного обеспечения",
    layout: Layouts.operatorControl,
  },
  {
    link: "/operator/control/indicatorsAgreement",
    text: "Согласование индикаторов",
    layout: Layouts.operatorControl,
  },
  {
    link: "/operator/control/deviations",
    text: "Анализ отклонений",
    layout: Layouts.operatorControl,
  },
  {
    link: "/operator/report/fact",
    text: "Фактические значения показателей за отчетный период",
    layout: Layouts.operatorReport,
  },
  {
    link: "/operator/report/activities",
    text: "Мероприятия по реализации ТС",
    layout: Layouts.operatorReport,
  },
  {
    link: "/operator/report/projects_master",
    text: "Крупные инвестпроекты",
    layout: Layouts.operatorReport,
  },
  {
    link: "/operator/report/appropriations",
    text: "Ресурсное обеспечение",
    layout: Layouts.operatorReport,
  },
  {
    link: "/operator/report/actualIndicators",
    text: "Индикаторы за отчетный период",
    layout: Layouts.operatorReport,
  },
  {
    link: "/operator/calculation/intermediate",
    text: "Расчет промежуточных значений индикаторов",
    layout: Layouts.operatorCalculation,
  },
  {
    link: "/operator/calculation/values",
    text: "Расчет индикаторов за отчетный период",
    layout: Layouts.operatorCalculation,
  },
  {
    link: "/operator/calculation/levels",
    text: "Расчет уровней и динамики достижения индикаторов",
    layout: Layouts.operatorCalculation,
  },
];
