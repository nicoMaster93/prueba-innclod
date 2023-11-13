const db = class DB {
    /* Storage */
    createStorage = function (key, value) {
        // Crear un elemento en el almacenamiento de sesión
        sessionStorage.setItem(key, value);
        return true;
    }
    getStorage = function (key,json=false) {
        return (json) ? JSON.parse(sessionStorage.getItem(key)) : sessionStorage.getItem(key) ;
    }
    deleteStorage = function (key) {
        if(key !== undefined){
            sessionStorage.removeItem(key);
        }else{
            sessionStorage.clear();
        }
        return true;
    }
    /* Cookie */
    createCookie = function (key, value) {
        let expires = new Date();
        expires.setTime(expires.getTime() + 172800); // Estableces el tiempo de expiración, genius
        // cookie = key + "=" + value + ";expires=" + expires.toGMTString()+"; path=/;";
        cookie = key + "=" + value + ";max-age=" + 60*60*24*30 + "; path=/;";
        return document.cookie = cookie;
    }
    getCookie = function (key) {
        let keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            return keyValue[2];
        } else {
            return null;
        }
    }
    deleteCookie = function (key) {
        return document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}

export default db