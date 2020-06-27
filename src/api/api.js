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
    reparseBase(){
        return instanceWithToken().get(`base/reparse/`)
    },
    getBase(pageSize, page, filters){
        return instanceWithToken().get(`base/get_base/${pageSize}?page=${page}${filters}`)
    },
    getHouse(id){
        return instanceWithToken().get(`base/get_house/${id}`)
    },
    getIgnoreList(){
        return instanceWithToken().get(`base/get_ignore/`)
    },
    setToIgnoreList(house_id){
        return instanceWithToken().post(`base/ignore/`, {house_id})
    },
    removeToIgnoreList(house_id){
        return instanceWithToken().delete(`base/ignore/`,{ data: {house_id}})
    },
    getWatchList(){
        return instanceWithToken().get(`base/get_watch/`)
    },
    setToWatchList(house_id){
        return instanceWithToken().post(`base/watch/`, {house_id})
    },
    removeToWatchList(house_id){
        return instanceWithToken().delete(`base/watch/`, {house_id})
    },
    getFavoriteList(){
        return instanceWithToken().get(`base/get_fav/`)
    },
    setToFavoriteList(house_id){
        return instanceWithToken().post(`base/fav/`, {house_id})
    },
    removeToFavoriteList(house_id){
        return instanceWithToken().delete(`base/fav/`, { data: {house_id}})
    },
}