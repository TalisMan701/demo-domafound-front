import * as axios from "axios";

const instanceWithToken = () => axios.create({
    withCredentials: true,
    baseURL: "http://82.146.35.84/api/",
    headers: {
        "authorization": "Token "+localStorage.getItem("token")
    }
});

const instance = () => axios.create({
    withCredentials: true,
    baseURL: "http://82.146.35.84/api/",
});

export const authAPI = {
    me() {
        return instanceWithToken().get(`auth/me/`);
    },
    login(phone,password){
        return instance().post(`auth/login/`, {phone, password});
    },
    logout(){
        return instanceWithToken().post(`auth/logout/`);
    }
}

export const registrationAPI ={
    validatePhone(number){
        return instance().post(`auth/registration/validate_phone/`, {number})
    },
    validateOTP(code, number){
        return instance().post(`auth/registration/validate_otp/`, {code, number})
    },
    registration(email, number, password){
        return instance().post(`auth/registration/me/`, {email, number, password})
    }
}

export const findPropertyAPI ={
    getBase(){
        return instanceWithToken().get(`get_base/`)
    }
}