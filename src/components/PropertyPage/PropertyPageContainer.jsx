import React from "react";
import classes from "./PropertyPage.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getPropertyOne} from "../../redux/property-reducer";
import PropertyPage from "./PropertyPage";

class PropertyPageContainer extends React.Component {
    componentDidMount() {
        let propertyId = this.props.match.params.propertyId;
        this.props.getPropertyOne(propertyId)
    }

    render() {
        return(
            <PropertyPage  property={this.props.property} isFetching={this.props.isFetching}/>
        );
    }
}

const mapStateToProps = (state) => ({
    property: state.property.property,
    isFetching: state.property.isFetching
})

export default compose(
    connect(mapStateToProps,{getPropertyOne}),
    withRouter
)(PropertyPageContainer);