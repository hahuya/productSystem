import make_request from "./utils";
import store from '../redux/store';
import {cleanUser} from "../redux/userInfo/userSlice";

export default class AuthAPI {
    static login(login_form) {
        return make_request('/api/auth/login', login_form)
    }

    static logout(){
        store.dispatch(cleanUser())
        return make_request('/api/auth/logout',)
    }

    static get_user(){
        return make_request('/api/auth/get_user', null, {'method': 'GET'})
    }
}