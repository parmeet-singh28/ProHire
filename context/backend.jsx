
import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0R01m8cPCjRwf_xKqJwQUX_2Ri6QA5cg",
    authDomain: "jobportal-ba4a4.firebaseapp.com",
    projectId: "jobportal-ba4a4",
    storageBucket: "jobportal-ba4a4.appspot.com",
    messagingSenderId: "950734523842",
    appId: "1:950734523842:web:af8254a8fb542c4b0eda5b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const FirebaseContext = createContext(null);
const provider = new GoogleAuthProvider();
export const useFirebase = () => useContext(FirebaseContext);

export const ContextProvider = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [])

    const signInWithEmailAndPass = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        setUser(null);
        signOut(auth).then(() => {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error)
        });
    }
    const signinWithGoogle = async () => {
        return await signInWithPopup(auth, provider)
    }

    const signUpWithEmailAndPass = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }
    return (
        <FirebaseContext.Provider value={{user, signInWithEmailAndPass, signOutUser, signinWithGoogle, signUpWithEmailAndPass }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}