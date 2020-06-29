import React from "react";
import classes from "./PropertyPage.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    getPropertyOne,
    removeToFavoriteListPropertyPage,
    setToFavoriteListPropertyPage
} from "../../redux/property-reducer";
import PropertyPage from "./PropertyPage";

class PropertyPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.goBack=this.goBack.bind(this)
    }
    componentDidMount() {
        let propertyId = this.props.match.params.propertyId;
        this.props.getPropertyOne(propertyId)
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        return(
            <PropertyPage goBack={this.goBack}  property={this.props.property} isFetchingOnePage={this.props.isFetchingOnePage}
                           setToFavoriteList={this.props.setToFavoriteListPropertyPage} removeToFavoriteList={this.props.removeToFavoriteListPropertyPage}/>
        );
    }
}

const mapStateToProps = (state) => ({
    property: state.property.property,
    isFetchingOnePage: state.property.isFetchingOnePage
})

export default compose(
    connect(mapStateToProps,{getPropertyOne, setToFavoriteListPropertyPage, removeToFavoriteListPropertyPage}),
    withRouter
)(PropertyPageContainer);