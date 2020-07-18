import React from "react";
import { YMaps, Map, Polygon } from "react-yandex-maps";

const mapState = {
    center: [55.73, 37.9],
    zoom: 10
};

const draw = ref => {
    debugger
    ref.editor.startDrawing();

    ref.editor.events.add("statechange", event => {
        console.log(event);
    });
};

function YandexMapContainer2() {
    return (
        <YMaps>
            <Map defaultState={mapState} modules={["geoObject.addon.editor"]}>
                <Polygon
                    instanceRef={ref => ref && draw(ref)}
                    geometry={[]}
                    options={{
                        editorDrawingCursor: "crosshair",
                        editorMaxPoints: 10,

                        fillColor: "#00FF00",
                        // Цвет обводки.
                        strokeColor: "#0000FF",
                        // Ширина обводки.
                        strokeWidth: 5
                    }}
                />
            </Map>
        </YMaps>
    );
}

export default YandexMapContainer2;