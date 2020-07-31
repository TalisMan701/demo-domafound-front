import React from "react";
import classes from "./ResetPassword.module.css"
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {Input, InputNumber} from "../../common/FormsControls/FormsControls";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";



const ResetPassword = (props) =>{

    const onSubmit = (formData) => {
        props.login(formData.number, formData.password);
    }

    if(props.isAuth){
        return <Redirect to={'/'}/>
    }

    return(
        <div className={classes.container}>
            <div className={classes.resetPasswordInner}>

            </div>
        </div>
    )
}

const mapStateToProps = (state)=>({

})

export default connect(mapStateToProps,{})(ResetPassword);