import React from 'react';
import {loadModules} from 'esri-loader';
import config from 'config';
import {
    AirportTemplate,
    ProjectsTemplate,
    RailRoadsTemplate,
    RiverPortsTemplate,
    RiversTemplate,
    RoadsTemplate,
    SeaPortsTemplate
} from "./ArcgisConfig";

class AnalystMapPage extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        loadModules([
            'esri/Map', 'esri/views/MapView',
            'esri/layers/MapImageLayer', 'esri/widgets/LayerList',
            'esri/widgets/Legend',
        ], {css: true})
            .then(([ArcGISMap, MapView, MapImageLayer, LayerList, Legend]) => {

                const base = new MapImageLayer({
                    url: "https://agoracle.asutk.ru/arcgis/rest/services/TS_projects/MapServer",
                    title: 'Мониторинг Реализации Транспортной Стратегии',
                    sublayers:
                        [
                            {
                                id: 26, title: 'Картографическая основа', sublayers:
                                    [
                                        {id: 32, title: 'Страны', outFields: ["*"],},
                                        {id: 31, title: 'Регионы', outFields: ["*"],},
                                        {id: 30, title: 'Федеральные округа', outFields: ["*"],},
                                        {id: 29, title: 'Границы'},
                                        {id: 28, title: 'Центры регионов'},
                                        {id: 27, title: 'Столица'},
                                    ]
                            },
                            {
                                id: 23, title: 'Внутренний водный транспорт', visible: false, sublayers:
                                    [
                                        {id: 25, title: 'Водные пути', visible: true, popupTemplate: RiversTemplate},
                                        {
                                            id: 24,
                                            title: 'Речные порты',
                                            visible: true,
                                            popupTemplate: RiverPortsTemplate
                                        },
                                    ]
                            },
                            {
                                id: 18, title: 'Транспортная инфраструктура', visible: false, sublayers:
                                    [
                                        {
                                            id: 22,
                                            title: 'Железные дороги',
                                            visible: false,
                                            popupTemplate: RailRoadsTemplate
                                        },
                                        {
                                            id: 21,
                                            title: 'Автомобильные дороги',
                                            visible: false,
                                            popupTemplate: RoadsTemplate
                                        },
                                        {
                                            id: 20,
                                            title: 'Морские порты',
                                            visible: false,
                                            popupTemplate: SeaPortsTemplate
                                        },
                                        {id: 19, title: 'Аэропорты', visible: false, popupTemplate: AirportTemplate},
                                    ]
                            },
                            {
                                id: 7, title: 'Плановое состояние транспортного комплекса', sublayers:
                                    [
                                        {
                                            id: 17,
                                            title: 'Воздушный транспорт',
                                            visible: false,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 16,
                                            title: 'Морской транспорт',
                                            visible: false,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 15,
                                            title: 'Внутренний водный транспорт',
                                            visible: false,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 12, title: 'Дорожное хозяйство', visible: false, sublayers:
                                                [
                                                    {
                                                        id: 14,
                                                        title: 'Линейные объекты (Дорожное хозяйство)',
                                                        visible: true,
                                                        popupTemplate: ProjectsTemplate
                                                    },
                                                    {
                                                        id: 13,
                                                        title: 'Точечные объекты (Дорожное хозяйство)',
                                                        visible: true,
                                                        popupTemplate: ProjectsTemplate
                                                    },
                                                ]
                                        },
                                        {
                                            id: 9, title: 'Железнодорожный транспорт', visible: false, sublayers:
                                                [
                                                    {
                                                        id: 11,
                                                        title: 'Линейные объекты',
                                                        visible: true,
                                                        popupTemplate: ProjectsTemplate
                                                    },
                                                    {
                                                        id: 10,
                                                        title: 'Точечные объекты',
                                                        visible: true,
                                                        popupTemplate: ProjectsTemplate
                                                    },
                                                ]
                                        },
                                        {
                                            id: 8,
                                            title: 'Крупные комплексные проекты',
                                            visible: false,
                                            popupTemplate: ProjectsTemplate
                                        },
                                    ]
                            },
                            {
                                id: 0,
                                title: 'Выполнение мероприятий по транспортному комплексу на 2018 год',
                                sublayers:
                                    [
                                        {
                                            id: 6,
                                            title: 'Воздушный транспорт: на 2018 год, %',
                                            visible: true,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 5,
                                            title: 'Морской транспорт: на 2018 год, %',
                                            visible: true,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 4,
                                            title: 'Внутренний водный транспорт: на 2018 год, %',
                                            visible: true,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 3,
                                            title: 'Дорожное хозяйство: на 2018 год, %',
                                            visible: true,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 2,
                                            title: 'Железнодорожный транспорт: на 2018 год, %',
                                            visible: true,
                                            popupTemplate: ProjectsTemplate
                                        },
                                        {
                                            id: 1,
                                            title: 'Крупные комплексные проекты: на 2018 год, %',
                                            visible: true,
                                            popupTemplate: ProjectsTemplate
                                        },
                                    ]
                            }
                        ]
                });

                const map = new ArcGISMap({
                    layers: [
                        base
                    ],
                });

                const view = new MapView({
                    // container: "webmap",
                    container: this.mapRef.current,
                    map: map,
                    center: [37, 55],
                    zoom: 12,
                    navigation: {
                        mouseWheelZoomEnabled: false
                    }
                });

                view.when(() => {
                    const legend = new Legend({
                        view: view,
                    });
                    view.ui.add(legend, "bottom-right");
                });

                view.when(() => {
                    const layerList = new LayerList({
                        view: view,
                    });
                    view.ui.add(layerList, "bottom-left");
                });
            });
    }

    componentWillUnmount() {
        if (this.view) {
            this.view.container = null;
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="webmap mb-1" ref={this.mapRef}/>
            </React.Fragment>
        );
    }
}

export default AnalystMapPage;
