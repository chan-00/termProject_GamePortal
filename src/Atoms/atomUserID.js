import { atom } from "recoil";

const userID = atom({
    key: 'id',
    default: window.sessionStorage.id ? window.sessionStorage.id : ""
});

const isLoggedin = atom({
    key: 'isLoggedin',
    default: window.sessionStorage.id ? true : false
});

export { userID, isLoggedin };