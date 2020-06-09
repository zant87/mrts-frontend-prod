export const RiversTemplate = {
    title: '{SHORT_NAME}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'FULL_NAME',
                    label: 'Полное наименование водного пути',
                },
                {
                    fieldName: 'UPPER_FLOW',
                    label: 'Верхняя граница по течению',
                },
                {
                    fieldName: 'LOWER_FLOW',
                    label: 'Нижняя граница по течению',
                },
                {
                    fieldName: 'VVP_LENGTH',
                    label: 'Протяженность, км',
                },
                {
                    fieldName: 'VVP_DEPTH',
                    label: 'Глубина, см',
                },
                {
                    fieldName: 'VVP_WIDTH',
                    label: 'Ширина, м',
                },
                {
                    fieldName: 'VVP_RADIUS',
                    label: 'Радиус, м',
                },
                {
                    fieldName: 'NAVIGATION_DURATION',
                    label: 'Продолжительность навигации, дней',
                },
                {
                    fieldName: 'OPEN_NAVIGATION',
                    label: 'Начало навигации',
                    type: 'date'
                },
                {
                    fieldName: 'CLOSE_NAVIGATION',
                    label: 'Конец навигации',
                    type: 'date'
                },
            ]
        }
    ]
};
