import * as axios from "axios";

const instanceWithToken = () => axios.create({
    withCredentials: true,
    baseURL: "https://api-domafound.ru/api/",
    headers: {
        "authorization": "Token "+localStorage.getItem("token")
    }
});

const instance = () => axios.create({
    withCredentials: true,
    baseURL: "https://api-domafound.ru/api/",
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
    },
    resetPassword(number, password){
        return instance().post(`auth/reset/change_password/`, {number, password})
    },
    validatePhone(number){
        return instance().post(`auth/reset/find_phone/`, {number})
    },
    validateOTP(code, number) {
        return instance().post(`auth/reset/validate_otp/`, {code, number});
    },
    setCommission(percentage, surcharge){
        return instanceWithToken().post(`auth/set_commission/`, {percentage, surcharge})
    }
}

export const registrationAPI ={
    validatePhone(number){
        return instance().post(`auth/registration/validate_phone/`, {number})
    },
    validateOTP(code, number){
        return instance().post(`auth/registration/validate_otp/`, {code, number})
    },
    registration(email, number, password, ref_code){
        return instance().post(`auth/registration/me/`, {email, number, password, ref_code})
    }
}

export const findPropertyAPI ={
    getStreets(){
      return instanceWithToken().get(`base/get_list_streets/`)
    },
    reparseBase(){
        return instanceWithToken().get(`base/reparse/`)
    },
    getBase(pageSize, page, filters, polygon_cords, days_ago, is_fav){
        return instanceWithToken().post(`base/get_base/${pageSize}?page=${page}${filters}`,{
            page_size: pageSize,
            polygon_cords,
            days_ago,
            is_fav
        })
    },
    getHouse(id){
        return instanceWithToken().get(`base/get_house/${id}`)
    },
    getJKH(id){
        return instanceWithToken().get(`base/get_jkh/${id}`)
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
    getPhotos(house_id){
        return instanceWithToken().get(`base/get_archive/${house_id}`)
    }
}

export const propertyForClientAPI = {
    createPropertyForClient(id_set){
        return instanceWithToken().post(`base/create_user_set/`,{id_set})
    },
    getPropertyForClient(set_id){
        return instance().post(`base/get_user_set/`,{set_id})
    },
    getHouseClient(id){
        return instance().get(`base/get_house_client/${id}`)
    }
}


export const payAPI = {
    sendPriceAndDays(price,days){
        return instanceWithToken().post(`auth/payments/create/`,{price, days})
    },
    successPay(){
        return instanceWithToken().post(`auth/payments/success/`,{status: true})
    }
}