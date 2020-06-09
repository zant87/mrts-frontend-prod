export const AirportTemplate = {
    title: '{NAME}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'NAME',
                    label: 'Название',
                },
                {
                    fieldName: 'CODE_ID',
                    label: 'Код ИКАО'
                },
                {
                    fieldName: 'CODE_ID_RUS',
                    label: ' Код ИКАО (рус)'
                },
                {
                    fieldName: 'SERTIFICATE',
                    label: 'Сертификат'
                },
                {
                    fieldName: 'OWNER',
                    label: 'Владелец'
                },
                {
                    fieldName: 'TYPE',
                    label: 'Тип'
                },
            ]
        }
    ]
};
