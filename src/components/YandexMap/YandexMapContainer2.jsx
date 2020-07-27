import React from "react";
import { YMaps, Map, Polygon } from "react-yandex-maps";

const mapState = {
    center: [57.153033, 65.534328],
    zoom: 10
};

function YandexMapContainer2() {

    let cords_polygon = localStorage.getItem("polygon") !== null ? JSON.parse(localStorage.getItem("polygon"))[0] : [];

    return (
        <YMaps>
            <Map
                defaultState={mapState}
                modules={["geoObject.addon.editor", "layout.ImageWithContent"]}
                width="100%"
                height="100%"
            >
                <Polygon
                    geometry={[cords_polygon,]}
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
    );
}

export default YandexMapContainer2;