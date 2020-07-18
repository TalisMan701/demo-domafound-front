import React from "react";
import { YMaps, Map, Polygon } from "react-yandex-maps";

class YandexMapContainer extends React.Component{
    constructor(props) {
        super(props);

        this.polygon = React.createRef();
    }

    componentWillMount() {
        document.addEventListener("keydown", this.draw);
        document.addEventListener("keyup", this.stopDraw);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.draw);
        document.removeEventListener("keyup", this.stopDraw);
    }

    mapState = {
        center: [55.73, 37.9],
        zoom: 10
    };

    draw = (e) => {
        if(e.key === "Alt"){
            this.polygon.editor.startDrawing();
            this.polygon.editor.events.add("statechange", event => {
                /*console.log(event);*/
            });
        }
    };

    stopDraw = (e) => {
        if(e.key === "Alt"){
            this.polygon.editor.stopDrawing();
            console.log(this.polygon.geometry._coordPath._coordinates)
            this.polygon.editor.events.add("statechange", event => {
                /*console.log(event);*/
            });
        }
    };

    getGeometryPolygon = () =>{
        console.log(this.polygon.geometry._coordPath._coordinates)
    }

    render() {
        return(
            <div>
                <YMaps>
                    <Map
                        defaultState={this.mapState}
                        modules={["geoObject.addon.editor"]}
                    >
                        <Polygon
                            instanceRef={ref => {
                                this.polygon = ref;
                                /*this.draw(this.polygon)*/
                            }}
                            geometry={[]}
                            options={{
                                editorDrawingCursor: "crosshair",
                                editorMaxPoints: 20,

                                fillColor: "#00ff005c",
                                // Цвет обводки.
                                strokeColor: "#0000FF",
                                // Ширина обводки.
                                strokeWidth: 3
                            }}
                        />
                    </Map>
                </YMaps>
            </div>
        )
    }
}

export default YandexMapContainer;