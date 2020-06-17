import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import classes from "./Registration.module.css";
import {
    endRegistration,
    registration,
    registrationValidateOTP,
    registrationValidatePhone, registrationValidatePhoneResend, setIsRegistred,
    setUserFinal
} from "../../redux/registration-reducer";
import {Redirect} from "react-router-dom";
import {compose} from "redux";

const RegistrationValidatePhoneForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Номер телефона"} name={"number"} type={"text"}
                        validate={[required]}
                        component={Input}/>
            </div>
            { props.error &&
            <div className={classes.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                { !props.validatePhone &&
                    <button className={classes.button}>Отправить</button>
                }
            </div>
        </form>
    );
};

const mstp = (state) => ({
    validatePhone: state.registration.validatePhone
});

const RegistrationValidatePhoneReduxForm = compose(
    connect(mstp),
    reduxForm({form: 'registrationValidatePhone'})
)(RegistrationValidatePhoneForm)

//const RegistrationValidatePhoneReduxForm = reduxForm({form: 'registrationValidatePhone'})(RegistrationValidatePhoneForm);

const RegistrationValidateOTPForm = (props) =>{

    const validatePhoneResend = () => {
        props.registrationValidatePhoneResend(props.number);
    }

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
            <div className={classes.resendOTP} onClick={validatePhoneResend}>Запросить код ещё раз</div>
        </form>
    );
};

const mstp2 = (state) => ({
    number: state.registration.number,
    validatePhone: state.registration.validatePhone
});

const RegistrationValidateOTPReduxForm = compose(
    connect(mstp2,{registrationValidatePhoneResend}),
    reduxForm({form: 'registrationValidateOTP'})
)(RegistrationValidateOTPForm)

const RegistrationForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Введите email"} name={"email"} type={"email"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Введите пароль"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <button className={classes.button} >Зарегистрироваться</button>
            </div>
        </form>
    );
};

const RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm);


const Registration = (props) =>{

    const validatePhone = (formData) => {
        props.registrationValidatePhone(formData.number);
    }

    const validateOTP = (formData) => {
        props.registrationValidateOTP(formData.code, props.number);
    }

    const registration = (formData) => {
        props.registration(formData.email, props.number, formData.password);
    }
    //ошибка в isRegistrated, после регистрации не обнулсяется и если выйти, то кидает на логин
    if(props.isRegistrated){
        setUserFinal();
        /*endRegistration();*/
        return <Redirect to="/login"/>
    }

    if(props.isAuth){
        return <Redirect to={'/'}/>
    }

    return (
        <div className={classes.container}>
            <div className={classes.registrationInner}>
                <h1 className={classes.title}>Регистрация</h1>
                {!props.validateOTP && <RegistrationValidatePhoneReduxForm onSubmit={validatePhone}/>}
                {!props.validateOTP && props.validatePhone && <RegistrationValidateOTPReduxForm onSubmit={validateOTP} />}
                {props.validateOTP && <RegistrationReduxForm onSubmit={registration}/>}
            </div>

        </div>
    );
}

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth,
    validatePhone: state.registration.validatePhone,
    validateOTP: state.registration.validateOTP,
    isRegistrated: state.registration.isRegistrated,
    number: state.registration.number
})

export default connect(mapStateToProps,{setUserFinal, /*endRegistration,*/ registrationValidatePhone, registrationValidateOTP, registration})(Registration);