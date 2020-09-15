import React from "react";
import classes from "./PropertyClientPage.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropertyClientPage from "./PropertyClientPage";
import Preloader from "../../../common/Preloader/Preloader";
import {getPropertyOneClient} from "../../../redux/propertyClient-reducer";

class PropertyClientPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.goBack=this.goBack.bind(this)
    }
    componentDidMount() {
        let propertyId = this.props.match.params.propertyId;
        this.props.getPropertyOneClient(propertyId)
        /*debugger
        if(!this.props.property.is_watch){
            this.props.setToWatchedList(propertyId)
        }*/
    }

    /*componentWillUnmount() {
        this.props.setJkhInfo(null)
    }*/

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
            <PropertyClientPage goBack={this.goBack}
                                property={this.props.property}
                                isFetchingOnePage={this.props.isFetchingOnePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    property: state.propertyClient.property,
    isFetchingOnePage: state.propertyClient.isFetchingOnePage,
    jkhInfo: state.propertyClient.jkhInfo,
})

export default compose(
    connect(mapStateToProps,{getPropertyOneClient}),
    withRouter
)(PropertyClientPageContainer);