import React from 'react';
import {loadModules} from 'esri-loader';
import config from 'config';
import {ProjectsTemplate} from "./ArcgisConfig/PopupConfigs";

class AnalystMapPage extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/layers/MapImageLayer', 'esri/widgets/Legend', 'esri/widgets/LayerList'], {css: true})
            .then(([ArcGISMap, MapView, FeatureLayer, MapImageLayer, Legend, LayerList]) => {

                const titles = new MapImageLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer",
                    title: 'Картооснова',
                    sublayers:
                        [
                            {id: 32, title: 'Страны'}, {id: 31, title: 'Регионы РФ'},
                            {id: 30, title: 'Федеральные округа РФ'}, {id: 29, title: 'Границы РФ'},
                            {id: 28, title: 'Центры регионов РФ'}, {id: 27, title: 'Столица РФ'}
                        ]
                });

                const layer6 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/6",
                    title: 'Воздушный транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer5 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/5",
                    title: 'Морской транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer4 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/4",
                    title: 'Внутренний водный транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer3 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/3",
                    title: 'Дорожное хозяйство: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer2 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/2",
                    title: 'Железнодорожный транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer1 = new FeatureLayer({
                    url: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/1",
                    title: 'Крупные комплексные проекты: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const map = new ArcGISMap({
                    layers: [
                        titles, layer6, layer5, layer5, layer4, layer3, layer2, layer1
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

                    view.ui.add(layerList, "top-right");
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
