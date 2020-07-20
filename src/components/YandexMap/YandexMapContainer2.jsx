import React from "react";
import { YMaps, Map, Polygon } from "react-yandex-maps";

const mapState = {
    center: [57.153033, 65.534328],
    zoom: 10
};

function YandexMapContainer2() {
    return (
        <YMaps>
            <Map
                defaultState={mapState}
                modules={["geoObject.addon.editor", "layout.ImageWithContent"]}
                width="100%"
                height="100%"
            >
            </Map>
        </YMaps>
    );
}

export default YandexMapContainer2;