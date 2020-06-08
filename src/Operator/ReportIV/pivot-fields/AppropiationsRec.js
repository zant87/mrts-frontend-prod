const pivotFields = [{
                                  caption: '#',
                                  width: 120,
                                  dataField: 'id',
                                  visible: false
                                }, {
                                  caption: 'documentId',
                                  dataField: 'documentId',
                                  visible: false
                                }, {
                                  caption: 'Вид расходов',
                                  dataField: 'costTypeName',
                                  dataType: 'string',
                                  area: 'row',
                                  expanded: true
                                }, {
                                  caption: 'Направление расходов',
                                  dataField: 'directionName',
                                  dataType: 'string',
                                  width: 150,
                                  area: 'row',
                                  expanded: true
                                },{
                                  caption: 'Источник финансирования',
                                  dataField: 'fundingName',
                                  dataType: 'string',
                                  width: 150,
                                  area: 'row',
                                  expanded: true
                                }, {
                                  caption: 'year',
                                  dataField: 'Отчетный год',
                                  dataType: 'number',
                                  area: 'column',
                                  expanded: true
                                }, {
                                  caption: 'quarter',
                                  dataField: 'Отчетный квартал',
                                  dataType: 'number',
                                  area: 'column',
                                  expanded: true
                                }, {
                                  caption: 'Запланировано, млн. руб.',
                                  dataField: 'plan',
                                  dataType: 'number',
                                  summaryType: 'sum',
                                  format: "#,###,###,##0.##",
                                  area: 'data',
                                  expanded: true
                                },{
                                  caption: 'Кассовое исполнение, млн. руб.',
                                  dataField: 'fact',
                                  dataType: 'number',
                                  summaryType: 'sum', 
                                  format: "#,###,###,##0.##",               
                                  area: 'data',
                                  expanded: true
                                }];
export default pivotFields;
