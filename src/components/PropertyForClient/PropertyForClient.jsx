import React, {useEffect} from "react";
import classes from "./PropertyForClient.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getPropertyForClient} from "../../redux/propertyForClient-reducer";
import Preloader from "../../common/Preloader/Preloader";
import preloader from "../../common/Preloader/Preloader.svg";
import PropertyForClientOne from "./PropertyForClientOne";


const PropertyForClient = (props)=>{

    useEffect(()=>{
        let idLink = props.match.params.idLink;
        props.getPropertyForClient(idLink)
    },[])

    if(props.isFetchingProperty){
        return <Preloader/>
    }

    return(
        <div className={classes.propertyForClient}>
            <div className={classes.items}>
                <div className={classes.propertyInner}>
                    {props.property.length !== 0 &&
                    <div>
                        {props.property.map(p =>{
                            return <PropertyForClientOne
                                item={p}
                                percentage={props.percentage}
                                surcharge={props.surcharge}
                            />
                        })}
                    </div>
                    }
                    {props.isFetchingProperty &&
                        <div className={classes.preloaderInner}>
                            <img src={preloader} className={classes.preloader}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    property: state.propertyForClient.property,
    isFetchingProperty: state.propertyForClient.isFetchingProperty,
    percentage: state.propertyForClient.percentage,
    surcharge: state.propertyForClient.surcharge
})

export default compose(
    connect(mapStateToProps,{getPropertyForClient}),
    withRouter
)(PropertyForClient);