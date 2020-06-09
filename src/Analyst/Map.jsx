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
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/layers/MapImageLayer', 'esri/widgets/Legend', 'esri/widgets/LayerList'], {css: true})
            .then(([ArcGISMap, MapView, FeatureLayer, MapImageLayer, Legend, LayerList]) => {

                const base = new MapImageLayer({
                    url: "https://agoracle.asutk.ru/arcgis/rest/services/TS_projects/MapServer",
                    title: 'МРТС',
                    sublayers:
                        [
                            {id: 32, title: 'Страны'},
                            {id: 31, title: 'Регионы'},
                            {id: 30, title: 'Федеральные округа'},
                            {id: 29, title: 'Границы'},
                            {id: 28, title: 'Центры регионов'},
                            {id: 27, title: 'Столица'},
                            {id: 25, title: 'Водные пути', visible: false, popupTemplate: RiversTemplate},
                            {id: 24, title: 'Речные порты', visible: false, popupTemplate: RiverPortsTemplate},
                            {id: 22, title: 'Железные дороги', visible: false, popupTemplate: RailRoadsTemplate},
                            {id: 21, title: 'Автомобильные дороги', visible: false, popupTemplate: RoadsTemplate},
                            {id: 20, title: 'Морские порты', visible: false, popupTemplate: SeaPortsTemplate},
                            {id: 19, title: 'Аэропорты', visible: false, popupTemplate: AirportTemplate},
                            {id: 17, title: 'Воздушный транспорт', visible: false, popupTemplate: ProjectsTemplate},
                            {id: 16, title: 'Морской транспорт', visible: false, popupTemplate: ProjectsTemplate},
                            {
                                id: 15,
                                title: 'Внутренний водный транспорт',
                                visible: false,
                                popupTemplate: ProjectsTemplate
                            },
                            {
                                id: 14,
                                title: 'Линейные объекты (Дорожное хозяйство)',
                                visible: false,
                                popupTemplate: ProjectsTemplate
                            },
                            {
                                id: 13,
                                title: 'Точечные объекты (Дорожное хозяйство)',
                                visible: false,
                                popupTemplate: ProjectsTemplate
                            },
                            {
                                id: 11,
                                title: 'Линейные объекты (Железнодорожный транспорт)',
                                visible: false,
                                popupTemplate: ProjectsTemplate
                            },
                            {
                                id: 10,
                                title: 'Точечные объекты (Железнодорожный транспорт)',
                                visible: false,
                                popupTemplate: ProjectsTemplate
                            },
                            {
                                id: 8,
                                title: 'Крупные комплексные проекты',
                                visible: false,
                                popupTemplate: ProjectsTemplate
                            },
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
                });

                const map = new ArcGISMap({
                    layers: [
                        base
                    ],
                });

                const view = new MapView({
                    container: this.mapRef.current,
                    map: map,
                    center: [37, 55],
                    zoom: 12,
                });

                // const legend = new Legend({
                //     view: view,
                //     // layerInfos: [
                //     //     {
                //     //         // layer: [layer6, layer5, layer5, layer4, layer3, layer2, layer1],
                //     //         title: "МРТС"
                //     //     }
                //     // ]
                // });

                view.when(function () {
                    const layerList = new LayerList({
                        view: view,
                        listItemCreatedFunction: function (event) {
                            const item = event.item;
                            if (item.layer.type !== "group") {
                                item.panel = {
                                    content: "legend",
                                    open: true
                                };
                            }
                        }
                    });

                    view.ui.add(layerList, "bottom-right");
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
            <div className="webmap my-5" ref={this.mapRef}/>

        );
    }
}

export default AnalystMapPage;
