import {redirect} from "react-router-dom";
import { logout } from '../store/authSlice';
import store from '../store';



export default function logoutAction() {
    store.dispatch(logout())
    return redirect("/");
}