import React from "react";
import classes from "./Login.module.css";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, resetPassword, setIsResetPassword, validateOTPLogin, validatePhoneLogin} from "../../redux/auth-reducer";
import {Input, InputNumber} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";

const LoginForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Номер телефона"} name={"number"} type={"phone"}
                        validate={[required]}
                        component={InputNumber}/>
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

const ValidatePhoneForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Номер телефона"} name={"number"} type={"phone"}
                       validate={[required]}
                       component={InputNumber}/>
            </div>
            { props.error &&
            <div className={classes.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className={classes.button}>Отправить</button>
            </div>
        </form>
    );
}

const ValidatePhoneReduxForm = reduxForm({form: 'validatePhoneLogin'})(ValidatePhoneForm);

const ValidateOTPForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Введите код"} name={"code"} type={"text"}
                       validate={[required]}
                       component={Input}/>
            </div>
            { props.error &&
            <div className={classes.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className={classes.button}>Отправить</button>
            </div>
        </form>
    );
}

const ValidateOTPReduxForm = reduxForm({form: 'validateOTPLogin'})(ValidateOTPForm);

const ResetPasswordForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Введите новый пароль"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Повторите новый пароль"} name={"passwordNew"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            { props.error &&
            <div className={classes.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className={classes.button}>Отправить</button>
            </div>
        </form>
    );
}

const ResetPasswordReduxForm = reduxForm({form: 'resetPassword'})(ResetPasswordForm);

const Login = (props) =>{

    const login = (formData) => {
        props.login(formData.number, formData.password);
    }

    const resetPassword = (formData) => {
        props.resetPassword(props.number, formData.password, formData.passwordNew)
    }

    const validatePhone = (formData) => {
        props.validatePhoneLogin(formData.number)
    }

    const validateOTP = (formData) => {
        props.validateOTPLogin(formData.code,props.number)
    }

    if(props.isAuth){
        return <Redirect to={'/'}/>
    }

    return (
        <div className={classes.container}>
            {!props.isResetPassword &&
                <div className={classes.loginInner}>
                    <h1 className={classes.title}>Авторизация</h1>
                    <LoginReduxForm onSubmit={login}/>
                    <div onClick={() => {
                        props.setIsResetPassword(true)
                    }} className={classes.resetPassword}>Забыли пароль?</div>
                </div>
            }
            {props.isResetPassword &&
                <div className={classes.resetPasswordInner}>
                    <h1 className={classes.title}>Смена пароля</h1>
                    {!props.validatePhone && !props.validateOTP &&
                        <ValidatePhoneReduxForm onSubmit={validatePhone}/>
                    }
                    {props.validatePhone && !props.validateOTP &&
                        <ValidateOTPReduxForm onSubmit={validateOTP}/>
                    }
                    {props.validatePhone && props.validateOTP &&
                        <ResetPasswordReduxForm onSubmit={resetPassword}/>
                    }
                    <div onClick={() => {
                        props.setIsResetPassword(false)
                    }} className={classes.resetPassword}>Авторизация</div>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth,
    isResetPassword: state.auth.isResetPassword,
    validatePhone: state.auth.validatePhone,
    validateOTP: state.auth.validateOTP,
    number: state.auth.number
})

export default connect(mapStateToProps,
    {login, setIsResetPassword, validatePhoneLogin,
        validateOTPLogin, resetPassword}
)(Login);