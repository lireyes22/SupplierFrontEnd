
import Cookies from 'js-cookie';

export default function clearAllCookies() {
    // Obtener todas las cookies
    const cookies = Cookies.get();

    // Eliminar todas las cookies
    Object.keys(cookies).forEach(cookie => {
        Cookies.remove(cookie);
    });

    sessionStorage.clear();
    localStorage.clear();
}