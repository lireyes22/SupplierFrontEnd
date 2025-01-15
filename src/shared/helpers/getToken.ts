import Cookies from 'js-cookie';
import useOauthGoogle from '@composables/useOauthGoogle';
import { auth } from '@/firebase';

export default async function getToken() {
    const user = auth.currentUser;
    if (user) {
        try {
            const token = await user.getIdToken(true);
            return token;
        } catch (error) {
            console.error('Error al obtener el token:', error);
            useOauthGoogle().signOutWithGoogle();
            window.location.reload();
            throw error;
        }
    } else {
        throw new Error('No user is currently signed in');
    }
}
