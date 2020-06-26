import React from "react";
import Preloader from "../../common/Preloader/Preloader";

const PropertyPage = (props) => {
    if(props.isFetching){
        return (
            <Preloader/>
        )
    }
    return(
        <div>
            <div>{props.property.house.title}</div>
        </div>
    )
}

export default PropertyPage;