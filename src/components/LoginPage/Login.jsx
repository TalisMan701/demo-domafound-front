import React from "react";
import classes from "./Login.module.css";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";

const LoginForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Номер телефона"} name={"number"} type={"phone"}
                        validate={[required]}
                        component={Input}/>
            </div>
            <div>
                <Field placeholder={"Пароль"} name={"password"} type={"password"}
                        validate={[required]}
                        component={Input}/>
            </div>
            { props.error &&
            <div className={classes.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className={classes.button}>Вход</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) =>{

    const onSubmit = (formData) => {
        console.log("debuger ebanat");
        props.login(formData.number, formData.password);
    }

    if(props.isAuth){
        return <Redirect to={'/'}/>
    }

    return (
        <div className={classes.container}>
            <div className={classes.loginInner}>
                <h1 className={classes.title}>Авторизация</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login);