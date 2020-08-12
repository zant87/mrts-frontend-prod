import {Layouts} from "../_helpers/layouts";

export const sideNavLinks = [
    {
        link: '/analyst/parameters',
        text: 'Показатели',
        layout: Layouts.analyst
    },
    {
        link: '/analyst/indicator',
        text: 'Индикаторы',
        layout: Layouts.analyst
    },
    {
        link: '/analyst/levels',
        text: 'Уровни достижения',
        layout: Layouts.analyst
    },
    {
        link: '/analyst/dynamics',
        text: 'Динамика уровней достижения',
        layout: Layouts.analyst
    },
    {
        link: '/analyst/report',
        text: 'Отчет перед Правительством',
        layout: Layouts.analyst
    },
    {
        link: '/analyst/map',
        text: 'Карта мероприятий',
        layout: Layouts.analyst
    },
    {
        link: '/admin/structure/indicators',
        text: 'Индикаторы по целям',
        layout: Layouts.adminStructure
    },
    {
        link: '/admin/structure/goals',
        text: 'Дерево целей и задач',
        layout: Layouts.adminStructure
    },
    {
        link: '/admin/structure/properties',
        text: 'Показатели шаблонов проектов',
        layout: Layouts.adminStructure
    },
    {
        link: '/admin/structure/templates',
        text: 'Шаблоны карточки проектов',
        layout: Layouts.adminStructure
    },
    {
        link: '/admin/structure/templates-items',
        text: 'Элементы карточки проектов',
        layout: Layouts.adminStructure
    },
    {
        link: '/admin/structure/projects-ext',
        text: 'Отчеты по проектам',
        layout: Layouts.adminStructure
    },
    {
        link: '/admin/structure/formulas',
        text: 'Формулы расчета индикаторов',
        layout: Layouts.adminStructure
    },
    {
        link: '/admin/control/executors',
        text: 'Реестр исполнителей',
        layout: Layouts.adminControl
    },
    {
        link: '/admin/control/executorsByIndicator',
        text: 'Исполнители по индикаторам',
        layout: Layouts.adminControl
    },
    {
        link: '/admin/loading/reports',
        text: 'Бланки отчетов исполнителей',
        layout: Layouts.adminLoading
    },
    {
        link: '/admin/loading/fromEMISS',
        text: 'Синхронизация с ЕМИСС',
        layout: Layouts.adminLoading
    },
    {
        link: '/admin/loading/fromMDD',
        text: 'Синхронизация с ФЗ МДФ',
        layout: Layouts.adminLoading
    },
    {
        link: '/admin/loading/fromMSTK',
        text: 'Синхронизация с ФЗ МСТК',
        layout: Layouts.adminLoading
    },
    {
        link: '/admin/loading/fromGIBDD',
        text: 'Синхронизация с ГИБДД',
        layout: Layouts.adminLoading
    },
    {
        link: '/admin/loading/fromXLSX',
        text: 'Загрузка из XLSX',
        layout: Layouts.adminLoading
    },
    {
        link: '/admin/archive/parameters',
        text: 'Архив показателей',
        layout: Layouts.adminArchive
    },
    {
        link: '/admin/archive/indicators',
        text: 'Архив расчета индикаторов',
        layout: Layouts.adminArchive
    },
    {
        link: '/admin/archive/activities',
        text: 'Архив выполнений мероприятий',
        layout: Layouts.adminArchive
    },
    {
        link: '/admin/archive/projects',
        text: 'Архив выполнения крупных проектов',
        layout: Layouts.adminArchive
    },
    {
        link: '/operator/plan/indicators',
        text: 'Индикаторы',
        layout: Layouts.operatorPlan
    },
    {
        link: '/operator/plan/activities',
        text: 'Мероприятия по реализации',
        layout: Layouts.operatorPlan
    },
    {
        link: '/operator/plan/projects',
        text: 'Крупные инвестиционные проекты',
        layout: Layouts.operatorPlan
    },
    {
        link: '/operator/plan/resources',
        text: 'Ресурсное обеспечение',
        layout: Layouts.operatorPlan
    },
    {
        link: '/operator/control/indicators',
        text: 'Показателей',
        layout: Layouts.operatorControl
    },
    {
        link: '/operator/control/completion',
        text: 'Расчета индикаторов',
        layout: Layouts.operatorControl
    },
    {
        link: '/operator/control/activities',
        text: 'Мероприятий по реализации',
        layout: Layouts.operatorControl
    },
    {
        link: '/operator/control/projects',
        text: 'Крупных инвестиционных проектов',
        layout: Layouts.operatorControl
    },
    {
        link: '/operator/control/resources',
        text: 'Ресурсного обеспечения',
        layout: Layouts.operatorControl
    },
    {
        link: '/operator/control/indicatorsAgreement',
        text: 'Согласование индикаторов',
        layout: Layouts.operatorControl
    },
    {
        link: '/operator/control/deviations',
        text: 'Анализ отклонений',
        layout: Layouts.operatorControl
    },
    {
        link: '/operator/report/fact',
        text: 'Фактические значения показателей',
        layout: Layouts.operatorReport
    },
    {
        link: '/operator/report/activities',
        text: 'Выполнение мероприятий',
        layout: Layouts.operatorReport
    },
    {
        link: '/operator/report/projects_master',
        text: 'Выполнение крупных проектов',
        layout: Layouts.operatorReport
    },
    {
        link: '/operator/report/appropriations',
        text: 'Ресурсное обеспечение',
        layout: Layouts.operatorReport
    },
    {
        link: '/operator/calculation/intermediate',
        text: 'Промежуточных значений индикаторов',
        layout: Layouts.operatorCalculation
    },
    {
        link: '/operator/calculation/values',
        text: 'Индикаторов за отчетный период',
        layout: Layouts.operatorCalculation
    },
    {
        link: '/operator/calculation/levels',
        text: 'Уровней и динамики достижения индикаторов',
        layout: Layouts.operatorCalculation
    },
];
