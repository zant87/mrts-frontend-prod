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
import {MDBContainer, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import MapModal from "./MapModal";

class AnalystMapPage extends React.Component {

    state = {
        mapRef: React.createRef(),
        modal: false,
        base: null,
        action: '',
        start: 2018,
        end: 2018
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
                    container: this.state.mapRef.current,
                    map: map,
                    center: [37, 55],
                    zoom: '12',
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
                        listItemCreatedFunction: this.defineActions
                    });

                    layerList.on("trigger-action", (event) => this.triggerActions(event, base));

                    view.ui.add(layerList, "bottom-left");
                });
            });
    }

    triggerActions = (event, base) => {

        const id = event.action.id;

        if (id === "enter-date") {
            this.setState({modal: true, base: base, action: id});
        }
        if (id === "enter-period") {
            this.setState({modal: true, base: base, action: id});
        }
    }

    defineActions = (event) => {

        const item = event.item;

        if (item.title === "Мониторинг Реализации Транспортной Стратегии") {

            item.actionsSections = [
                [
                    {
                        title: "Выбор конкретной даты",
                        id: "enter-date"
                    },
                    {
                        title: "Выбор интервала дат",
                        id: "enter-period"
                    }
                ],
            ];
        }

    }

    componentWillUnmount() {
        if (this.view) {
            this.view.container = null;
        }
    }

    toggleModal = () => {
        this.setState({modal: false});
    }


    onChangeHandler = (event) => {
        this.setState({[event.target.name]: Number(event.target.value)});
    };

    doFilterLayers = (event) => {
        console.log('Фильтруем слои');
        console.log('State =', this.state);

        this.state.base.allSublayers.items.map((layer) => {

            switch (layer.title) {
                case 'Картографическая основа':
                    layer.visible = true;
                    break;
                case 'Страны':
                    layer.visible = true;
                    break;
                case 'Регионы':
                    layer.visible = true;
                    break;
                case 'Федеральные округа':
                    layer.visible = true;
                    break;
                case 'Границы':
                    layer.visible = true;
                    break;
                case 'Центры регионов':
                    layer.visible = true;
                    break;
                case 'Столица':
                    layer.visible = true;
                    break;
                default:
                    const title = layer.title;
                    const regex = /\d+/;
                    const match = regex.exec(title);
                    if (match) {
                        console.log(match);
                        const year = Number(match[0]);
                        if (this.state.action === 'enter-date') {
                            layer.visible = year === this.state.start;
                        } else {
                            layer.visible = year >= this.state.start && year <= this.state.end;
                        }
                    }
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="webmap mb-1" ref={this.state.mapRef}/>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={true}>
                        <MDBModalHeader toggle={this.toggleModal}>Настройка фильтров</MDBModalHeader>
                        <MDBModalBody>
                            <MapModal
                                start={this.state.start}
                                end={this.state.end}
                                action={this.state.action}
                                onChange={(event) => this.onChangeHandler(event)}
                                doFilterLayers={this.doFilterLayers}/>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default AnalystMapPage;
