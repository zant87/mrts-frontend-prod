export const ProjectsTemplate = {
    title: '{NAME}',
    actions: [
        {
            id: "show-form",
            title: "Детализация"
        }
    ],
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'NAME',
                    label: 'Название проекта'
                },
                {
                    fieldName: 'CODE',
                    label: 'Код проекта'
                },
                {
                    fieldName: 'PERCENT_READY',
                    label: 'Уровень технической готовности к 31.12.2018 г.',
                },
                {
                    fieldName: 'COST_PLAN',
                    label: 'Планируемый бюджет, млрд руб.'
                },
                {
                    fieldName: 'YEAR_START',
                    label: ' Год начала проекта'
                },
                {
                    fieldName: 'YEAR_FINISH',
                    label: 'Год завершения проекта'
                },
                {
                    fieldName: 'VARIANT',
                    label: 'Вариант Стратегии'
                },
                {
                    fieldName: 'TYPE_BUDGET',
                    label: 'Источник финансирования'
                },
                {
                    fieldName: 'PROJECT_TYPE',
                    label: 'Вид транспорта'
                },
                {
                    fieldName: 'WORK_STAGE',
                    label: 'Этапы'
                }
            ]
        }
    ]
};
