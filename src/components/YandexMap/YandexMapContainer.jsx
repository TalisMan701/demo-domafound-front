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

    cords_polygon = localStorage.getItem("polygon") !== null ? JSON.parse(localStorage.getItem("polygon"))[0] : [];

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
                                if(ref !== null){
                                    if(this.polygon.geometry._coordPath._coordinates.length !== 0){
                                        this.polygon.editor.startDrawing();
                                        this.polygon.editor.stopDrawing();
                                    }
                                }
                                /*this.draw(this.polygon)*/
                            }}
                            geometry={[this.cords_polygon,]}
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
                <button onClick={() => {
                    if(this.polygon.geometry._coordPath._coordinates[0].length > 3){
                        this.props.getPropertyWithMap(this.polygon.geometry._coordPath._coordinates)
                        localStorage.setItem("polygon", JSON.stringify(this.polygon.geometry._coordPath._coordinates));
                    }else{
                        localStorage.removeItem("polygon")
                        this.props.getPropertyWithMap([])
                    }
                    this.props.closeMap()
                }}>Применить</button>
            </>
        )
    }
}

export default YandexMapContainer;