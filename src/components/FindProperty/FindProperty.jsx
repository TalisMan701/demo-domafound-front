import React from "react";
import classes from "./FindProperty.module.css";
import Property from "./Property/Property";
import {connect} from "react-redux";
import {getProperty} from "../../redux/findProperty-reducer";
import {Redirect} from "react-router-dom";

class FindProperty extends React.Component {

    componentDidMount() {
        this.props.getProperty();
    }


    render() {
        /*if(!this.props.isTariff){
            alert("Купите тариф, чтобы воспользоваться поиском недвижимости")
            return <Redirect to={'/tariffs'}/>
        }*/

        return (
            <div className={classes.findProperty}>
                <div className={classes.container}>
                    {this.props.property.map(p =>
                        <Property item={p}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    property: state.findProperty.property,
    isTariff: state.auth.isTariff
})

export default connect(mapStateToProps,{getProperty})(FindProperty);