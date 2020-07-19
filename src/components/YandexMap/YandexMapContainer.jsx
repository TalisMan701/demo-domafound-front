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
        center: [57.153033, 65.534328],
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

    /*style = {
        width: '70%',
        height: '70%'
    };*/

    render() {
        return(
            <>
                <YMaps>
                    <Map
                        defaultState={this.mapState}
                        modules={["geoObject.addon.editor", "layout.ImageWithContent"]}
                        width="70%"
                        height="70%"
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
                <div>Чтобы выбрать область зажмите "Alt"</div>
                <button onClick={() => this.props.getPropertyWithMap(this.polygon.geometry._coordPath._coordinates)}>Применить</button>
            </>
        )
    }
}

export default YandexMapContainer;