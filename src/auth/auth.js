import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebase/app';

class AuthService {
    #authenticated = false;

    constructor() {
        this.#authenticated = false;
        this.auth = getAuth(firebaseApp);

        if (this.auth.currentUser) {
            this.#authenticated = true;
        }
    }

    getUser() {
        const auth = getAuth(firebaseApp);
        return auth.currentUser;
    }

    onAuthenticationChange(callback) {
        const auth = getAuth(firebaseApp);
        return onAuthStateChanged(auth, callback);
    }

    signUpWithEmailAndPassword({ email, password }) {
        const auth = getAuth(firebaseApp);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    signInWithEmailAndPassword({ email, password }) {
        const auth = getAuth(firebaseApp);
        return signInWithEmailAndPassword(auth, email, password);
    }

    signOut() {
        const auth = getAuth(firebaseApp);
        return auth.signOut();
    }

    isAuthenticated() {
        return this.#authenticated;
    }
}

export const authClient = new AuthService();
