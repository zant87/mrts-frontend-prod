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
            .then(([ArcGISMap, MapView, FeatureLayer, MapImageLayer, LayerList]) => {

                const titles = new MapImageLayer({
                    url: config.arcGisMapServerUrl,
                    title: 'Картооснова',
                    sublayers: [{id: 32}, {id: 31}, {id: 30}, {id: 29}, {id: 28}, {id: 27}]
                });

                const layer6 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "6",
                    title: 'Воздушный транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer5 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "5",
                    title: 'Морской транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer4 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "4",
                    title: 'Внутренний водный транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer3 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "3",
                    title: 'Дорожное хозяйство: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer2 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "2",
                    title: 'Железнодорожный транспорт: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });

                const layer1 = new FeatureLayer({
                    url: config.arcGisMapServerUrl + "1",
                    title: 'Крупные комплексные проекты: на 2018 год, %',
                    popupTemplate: ProjectsTemplate
                });


                const map = new ArcGISMap({
                    layers: [
                        titles,
                        layer6, layer5, layer5, layer4, layer3, layer2, layer1,
                    ],
                });

                const view = new MapView({
                    container: this.mapRef.current,
                    map: map,
                    center: [37, 55],
                    zoom: 12,
                });

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
