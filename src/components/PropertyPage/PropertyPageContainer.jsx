import React from "react";
import classes from "./PropertyPage.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    getPropertyOne,
    removeToFavoriteListPropertyPage, setJkhInfo,
    setToFavoriteListPropertyPage
} from "../../redux/property-reducer";
import PropertyPage from "./PropertyPage";
import {setToWatchedList} from "../../redux/findProperty-reducer";
import Preloader from "../../common/Preloader/Preloader";

class PropertyPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.goBack=this.goBack.bind(this)
    }
    componentDidMount() {
        let propertyId = this.props.match.params.propertyId;
        this.props.getPropertyOne(propertyId)
        /*debugger
        if(!this.props.property.is_watch){
            this.props.setToWatchedList(propertyId)
        }*/
    }

    componentWillUnmount() {
        this.props.setJkhInfo(null)
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        if (this.props.isFetchingOnePage) {
            return (
                <Preloader/>
            )
        }

        return(
            <PropertyPage goBack={this.goBack}  property={this.props.property} isFetchingOnePage={this.props.isFetchingOnePage}
                           setToFavoriteList={this.props.setToFavoriteListPropertyPage} removeToFavoriteList={this.props.removeToFavoriteListPropertyPage}
                            jkhInfo={this.props.jkhInfo} jobWithClient={this.props.jobWithClient}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    property: state.property.property,
    isFetchingOnePage: state.property.isFetchingOnePage,
    jkhInfo: state.property.jkhInfo,
    jobWithClient: state.auth.jobWithClient,
})

export default compose(
    connect(mapStateToProps,{getPropertyOne, setToFavoriteListPropertyPage, removeToFavoriteListPropertyPage,
        setToWatchedList, setJkhInfo}),
    withRouter
)(PropertyPageContainer);