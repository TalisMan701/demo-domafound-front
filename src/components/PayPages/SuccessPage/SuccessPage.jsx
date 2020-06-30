import React from "react";
import classes from "./SuccessPage.module.css"
import {payAPI} from "../../../api/api";
import Preloader from "../../../common/Preloader/Preloader";
import {connect} from "react-redux";

class SuccessPage extends React.Component {
    /*componentDidMount() {
        payAPI.successPay()
    }*/

    componentWillReceiveProps(nextProps){
        if(nextProps.isAuth != this.props.isAuth){
            payAPI.successPay();
            return nextProps;
        } else {
            return false
        }
    }

    render() {
        if(!this.props.isAuth){
            return <Preloader/>
        }
        return (
            <div>Оплата прошла Успешно</div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{})(SuccessPage);